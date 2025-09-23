# Autenticação e Segurança - SaberAngola

## Índice

1. [Visão Geral](#1-visão-geral)
2. [JWT (JSON Web Tokens)](#2-jwt-json-web-tokens)
3. [Autenticação de Usuários](#3-autenticação-de-usuários)
4. [Autorização e Permissões](#4-autorização-e-permissões)
5. [Proteções de Segurança](#5-proteções-de-segurança)
6. [Implementação no Frontend](#6-implementação-no-frontend)
7. [Implementação no Backend](#7-implementação-no-backend)
8. [Boas Práticas](#8-boas-práticas)
9. [Configurações](#9-configurações)
10. [Monitoramento e Logs](#10-monitoramento-e-logs)

---

## 1. Visão Geral

### 1.1. Arquitetura de Segurança

```plaintext
[Cliente] → HTTPS → [Load Balancer] → [API Gateway]
                                          ↓
                    [Rate Limiting] ← [Backend API] → [JWT Validation]
                                          ↓
                                   [Permission Check]
```

### 1.2. Componentes Principais

- **SimpleJWT**: Autenticação baseada em tokens
- **django-cors-headers**: Proteção CORS
- **django-ratelimit**: Rate limiting
- **django-security**: Headers de segurança
- **bleach**: Sanitização de input
- **cryptography**: Funções criptográficas

---

## 2. JWT (JSON Web Tokens)

### 2.1. Estrutura do Token

```plaintext
header.payload.signature

Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "user_id": 123,
  "email": "user@example.com",
  "exp": 1632402189,
  "iat": 1632398589,
  "roles": ["user", "premium"]
}
```

### 2.2. Configuração JWT

```python
# settings.py
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': env('JWT_SECRET_KEY'),
    
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}
```

### 2.3. Token Blacklist

```python
# models.py
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken

class BlacklistedToken(models.Model):
    token = models.OneToOneField(OutstandingToken, on_delete=models.CASCADE)
    blacklisted_at = models.DateTimeField(auto_now_add=True)
```

---

## 3. Autenticação de Usuários

### 3.1. Registro

```python
# views.py
class RegisterView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Gerar tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            })
        return Response(serializer.errors, status=400)
```

### 3.2. Login

```python
# serializers.py
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(
            email=data['email'],
            password=data['password']
        )
        if not user:
            raise serializers.ValidationError('Credenciais inválidas')
        if not user.is_active:
            raise serializers.ValidationError('Conta desativada')
            
        return {'user': user}
```

### 3.3. Refresh Token

```python
# views.py
class TokenRefreshView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        try:
            refresh = RefreshToken(request.data['refresh'])
            return Response({
                'access': str(refresh.access_token)
            })
        except TokenError:
            return Response({'error': 'Token inválido'}, status=401)
```

---

## 4. Autorização e Permissões

### 4.1. Custom Permissions

```python
# permissions.py
class IsPremiumUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_premium

class IsDocumentOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class HasSubscription(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.subscription.is_active()
        )
```

### 4.2. Role-Based Access Control (RBAC)

```python
# models.py
class Role(models.Model):
    name = models.CharField(max_length=100)
    permissions = models.ManyToManyField(Permission)

class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(auto_now_add=True)
```

### 4.3. Decoradores de Permissão

```python
# decorators.py
def require_premium(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_premium:
            return JsonResponse({
                'error': 'Recurso premium necessário'
            }, status=403)
        return view_func(request, *args, **kwargs)
    return wrapper
```

---

## 5. Proteções de Segurança

### 5.1. CORS

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "https://saberangola.com",
    "https://app.saberangola.com",
]

CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### 5.2. Rate Limiting

```python
# middleware.py
class RateLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.r = redis.Redis()
        self.rate_limit = 100  # requisições
        self.period = 3600     # por hora

    def __call__(self, request):
        key = f"rate_limit:{request.META.get('REMOTE_ADDR')}"
        
        current = self.r.get(key)
        if current and int(current) > self.rate_limit:
            return JsonResponse({
                'error': 'Rate limit exceeded'
            }, status=429)
            
        pipe = self.r.pipeline()
        pipe.incr(key)
        pipe.expire(key, self.period)
        pipe.execute()
        
        return self.get_response(request)
```

### 5.3. Input Sanitization

```python
# utils.py
import bleach

def sanitize_html(text):
    allowed_tags = ['p', 'b', 'i', 'u', 'em', 'strong']
    allowed_attrs = {'a': ['href', 'title']}
    
    return bleach.clean(
        text,
        tags=allowed_tags,
        attributes=allowed_attrs,
        strip=True
    )

# serializers.py
class DocumentSerializer(serializers.ModelSerializer):
    content = serializers.CharField()
    
    def validate_content(self, value):
        return sanitize_html(value)
```

### 5.4. Security Headers

```python
# settings.py
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

---

## 6. Implementação no Frontend

### 6.1. Interceptor de Requisições

```typescript
// utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshToken();
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
```

### 6.2. Hook de Autenticação

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          const user = await api.get('/api/users/me/');
          setUser(user.data);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { data } = await api.post('/api/auth/login/', credentials);
    setTokens(data.tokens);
    setUser(data.user);
  };

  const logout = () => {
    removeTokens();
    setUser(null);
  };

  return { user, loading, login, logout };
}
```

### 6.3. Proteção de Rotas

```typescript
// components/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <>{children}</> : null;
}
```

---

## 7. Implementação no Backend

### 7.1. Custom Authentication Backend

```python
# auth/backends.py
class EmailAuthBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
```

### 7.2. Password Reset

```python
# views.py
class PasswordResetView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
            
            send_password_reset_email.delay(
                user.email,
                reset_url
            )
            
        return Response({'message': 'Email enviado se conta existir'})

class PasswordResetConfirmView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request, uid, token):
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
            
            if default_token_generator.check_token(user, token):
                user.set_password(request.data.get('password'))
                user.save()
                return Response({'message': 'Senha alterada com sucesso'})
                
        except (TypeError, ValueError, User.DoesNotExist):
            pass
            
        return Response(
            {'error': 'Link inválido'},
            status=400
        )
```

---

## 8. Boas Práticas

### 8.1. Armazenamento de Senhas

```python
# models.py
class User(AbstractBaseUser):
    def set_password(self, raw_password):
        self.password = make_password(
            raw_password,
            salt=settings.PASSWORD_SALT
        )
```

### 8.2. Validação de Senha

```python
# validators.py
class PasswordValidator:
    def validate(self, password, user=None):
        if len(password) < 8:
            raise ValidationError('Senha muito curta')
            
        if not any(char.isdigit() for char in password):
            raise ValidationError('Senha deve conter números')
            
        if not any(char.isupper() for char in password):
            raise ValidationError('Senha deve conter maiúsculas')
```

### 8.3. Proteção contra Ataques

```python
# middleware.py
class SecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Security Headers
        response['X-Frame-Options'] = 'DENY'
        response['X-Content-Type-Options'] = 'nosniff'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Feature-Policy'] = "geolocation 'none'"
        
        return response
```

---

## 9. Configurações

### 9.1. Django Settings

```python
# settings.py

# Senha e Criptografia
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
]

# Session
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'
SESSION_COOKIE_AGE = 1209600  # 2 semanas
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'

# CSRF
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_TRUSTED_ORIGINS = [
    'https://saberangola.com',
]

# Security
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

### 9.2. Nginx Configuration

```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    server_name api.saberangola.com;

    ssl_certificate /etc/letsencrypt/live/api.saberangola.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.saberangola.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Outras headers de segurança
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self';" always;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 10. Monitoramento e Logs

### 10.1. Logging de Segurança

```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'security': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/security.log',
            'formatter': 'verbose',
        },
        'auth': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/auth.log',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'security': {
            'handlers': ['security'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.security': {
            'handlers': ['security'],
            'level': 'INFO',
            'propagate': True,
        },
        'auth': {
            'handlers': ['auth'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

### 10.2. Monitoramento de Tentativas de Login

```python
# signals.py
from django.contrib.auth.signals import user_login_failed

@receiver(user_login_failed)
def log_failed_login(sender, credentials, request, **kwargs):
    logger.warning(
        'Failed login attempt for %s from IP %s',
        credentials.get('email'),
        request.META.get('REMOTE_ADDR')
    )
```

### 10.3. Alertas de Segurança

```python
# utils.py
def send_security_alert(user, event_type, details):
    logger.error(f"Security Event: {event_type} for user {user.email}")
    
    if event_type in ['password_reset', 'suspicious_login']:
        send_security_email.delay(
            user.email,
            event_type,
            details
        )
        
    if event_type == 'brute_force':
        notify_admin.delay(
            f"Brute force attempt detected for {user.email}"
        )
```

---

Este documento fornece uma visão abrangente da implementação de segurança no SaberAngola, cobrindo autenticação, autorização, proteções contra ataques comuns e boas práticas de segurança tanto no frontend quanto no backend.