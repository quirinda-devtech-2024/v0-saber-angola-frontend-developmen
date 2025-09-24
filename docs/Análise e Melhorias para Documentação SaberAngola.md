Análise e Melhorias para Documentação SaberAngola
Visão Geral
Após análise completa dos 17 arquivos de documentação, identifiquei oportunidades significativas de melhoria em estrutura, consistência, segurança e práticas modernas de desenvolvimento.
1. Melhorias Críticas de Segurança
1.1. Autenticação e JWT
Problemas identificados:

Configuração JWT muito permissiva (60min access token)
Falta de rotação automática de chaves
Headers de segurança incompletos

Melhorias propostas:

# settings.py - Configuração JWT aprimorada
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),  # Reduzido de 60 para 15
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),     # Reduzido de 1 para 7
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    
    'ALGORITHM': 'RS256',  # Mudança de HS256 para RS256
    'SIGNING_KEY': env('JWT_PRIVATE_KEY'),
    'VERIFYING_KEY': env('JWT_PUBLIC_KEY'),
    
    # Headers customizados para Angola
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'uuid',  # Usar UUID em vez de ID sequencial
    'USER_ID_CLAIM': 'sub',
    
    # Rate limiting para tokens
    'TOKEN_OBTAIN_SERIALIZER': 'apps.auth.serializers.CustomTokenObtainPairSerializer',
}

# Headers de segurança específicos para Angola
SECURE_CROSS_ORIGIN_OPENER_POLICY = 'same-origin'
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True

# CSP headers
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com")
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")
CSP_IMG_SRC = ("'self'", "data:", "https:")
CSP_CONNECT_SRC = ("'self'", "wss:", "https:")

1.2. Rate Limiting Granular

# throttling.py - Rate limiting por região/contexto
class AngolaIPRateThrottle(UserRateThrottle):
    scope = 'angola_ip'
    
    def get_rate(self):
        # Rate mais generoso para IPs angolanos
        if self.is_angola_ip(self.get_ident()):
            return '200/hour'
        return '50/hour'
    
    def is_angola_ip(self, ip):
        # Lista de ranges de IP de Angola
        angola_ranges = [
            '196.28.64.0/18',   # Angola Telecom
            '41.223.140.0/22',  # Unitel
        ]
        return any(ipaddress.ip_address(ip) in ipaddress.ip_network(range_) 
                  for range_ in angola_ranges)

# Rate limiting por endpoint crítico
class PaymentRateThrottle(BaseThrottle):
    def allow_request(self, request, view):
        if request.path.startswith('/api/payments/'):
            return self.check_payment_throttle(request)
        return True

2. Melhorias de Arquitetura
2.1. Padrão de Microserviços Preparado

# services/base.py - Service Layer Pattern
from abc import ABC, abstractmethod
from typing import TypeVar, Generic, List, Optional
from dataclasses import dataclass

T = TypeVar('T')

@dataclass
class ServiceResult(Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None
    status_code: int = 200

class BaseService(ABC, Generic[T]):
    @abstractmethod
    def create(self, data: dict) -> ServiceResult[T]:
        pass
    
    @abstractmethod
    def update(self, id: str, data: dict) -> ServiceResult[T]:
        pass
    
    @abstractmethod
    def delete(self, id: str) -> ServiceResult[bool]:
        pass

# documents/services.py - Implementação específica
class DocumentService(BaseService[Document]):
    def __init__(self, user: User):
        self.user = user
        self.s3_service = S3Service()
        self.notification_service = NotificationService()
    
    async def create(self, data: dict) -> ServiceResult[Document]:
        try:
            # Validação de quota
            if not await self._check_user_quota():
                return ServiceResult(
                    success=False, 
                    error="Quota excedida",
                    status_code=429
                )
            
            # Criação assíncrona
            document = await self._create_document_async(data)
            
            # Notificação
            await self.notification_service.notify_document_created(
                self.user, document
            )
            
            return ServiceResult(success=True, data=document)
            
        except ValidationError as e:
            return ServiceResult(
                success=False, 
                error=str(e),
                status_code=400
            )

2.2. Sistema de Events/Domain Events


# core/events.py - Sistema de eventos
from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List
import asyncio
from abc import ABC, abstractmethod

class EventType(Enum):
    DOCUMENT_CREATED = "document.created"
    PAYMENT_COMPLETED = "payment.completed"
    USER_UPGRADED = "user.upgraded"
    QUOTA_EXCEEDED = "quota.exceeded"

@dataclass
class DomainEvent:
    event_type: EventType
    aggregate_id: str
    data: Dict[str, Any]
    timestamp: datetime
    user_id: str
    correlation_id: str

class EventHandler(ABC):
    @abstractmethod
    async def handle(self, event: DomainEvent) -> None:
        pass

class EventBus:
    def __init__(self):
        self._handlers: Dict[EventType, List[EventHandler]] = {}
    
    def subscribe(self, event_type: EventType, handler: EventHandler):
        if event_type not in self._handlers:
            self._handlers[event_type] = []
        self._handlers[event_type].append(handler)
    
    async def publish(self, event: DomainEvent):
        handlers = self._handlers.get(event.event_type, [])
        tasks = [handler.handle(event) for handler in handlers]
        await asyncio.gather(*tasks, return_exceptions=True)

# Exemplo de handler
class DocumentCreatedHandler(EventHandler):
    async def handle(self, event: DomainEvent):
        # Enviar email
        # Atualizar analytics
        # Processar assincrono
        pass

3. Melhorias de Performance
3.1. Cache Inteligente Multi-Layer

# cache/strategies.py
import redis
from django.core.cache import cache
from functools import wraps
import pickle
import hashlib

class CacheStrategy:
    def __init__(self, timeout=300, version=1):
        self.timeout = timeout
        self.version = version
        self.redis_client = redis.Redis(
            host='redis', 
            port=6379, 
            decode_responses=False
        )
    
    def cache_key(self, func_name, args, kwargs, user_id=None):
        """Gera chave única considerando contexto angolano"""
        key_data = f"{func_name}:{args}:{kwargs}:{user_id}"
        return f"saberangola:v{self.version}:{hashlib.md5(key_data.encode()).hexdigest()}"
    
    def get_or_set(self, key, func, *args, **kwargs):
        """Cache com fallback inteligente"""
        try:
            # L1: Memory cache (Django)
            result = cache.get(key)
            if result is not None:
                return result
            
            # L2: Redis cache
            result = self.redis_client.get(key)
            if result:
                result = pickle.loads(result)
                # Repovoar L1
                cache.set(key, result, self.timeout // 4)
                return result
            
            # L3: Database/computation
            result = func(*args, **kwargs)
            
            # Armazenar em ambos os layers
            cache.set(key, result, self.timeout)
            self.redis_client.setex(key, self.timeout * 2, pickle.dumps(result))
            
            return result
            
        except Exception as e:
            logger.error(f"Cache error: {e}")
            return func(*args, **kwargs)

# Decorator para cache automático
def smart_cache(timeout=300, vary_on_user=True):
    def decorator(func):
        strategy = CacheStrategy(timeout)
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            request = kwargs.get('request') or (args[0] if args else None)
            user_id = getattr(request, 'user', {}).get('id') if vary_on_user else None
            
            key = strategy.cache_key(func.__name__, args, kwargs, user_id)
            return strategy.get_or_set(key, func, *args, **kwargs)
        
        return wrapper
    return decorator

3.2. Database Optimization

# models/optimized.py - Models otimizados
from django.contrib.postgres.indexes import GinIndex, BTreeIndex
from django.contrib.postgres.fields import JSONField

class OptimizedDocument(models.Model):
    # UUID para melhor distribuição
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    
    # Campos indexados estrategicamente
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    title = models.CharField(max_length=255, db_index=True)
    type = models.CharField(max_length=20, choices=DOCUMENT_TYPES, db_index=True)
    status = models.CharField(max_length=20, default='draft', db_index=True)
    
    # Campos específicos Angola
    language = models.CharField(max_length=10, default='pt-AO', db_index=True)
    province = models.CharField(max_length=50, blank=True, db_index=True)
    
    # Metadados estruturados
    metadata = JSONField(default=dict)
    
    # Timestamps otimizados
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        # Índices compostos para queries frequentes
        indexes = [
            BTreeIndex(fields=['user', 'created_at']),
            BTreeIndex(fields=['type', 'status']),
            BTreeIndex(fields=['province', 'language']),
            GinIndex(fields=['metadata']),  # Para busca em JSON
        ]
        
        # Particionamento temporal (preparação)
        db_table = 'documents_optimized'
        
        # Constraints para integridade
        constraints = [
            models.CheckConstraint(
                check=models.Q(title__length__gte=3),
                name='title_min_length'
            ),
        ]

4. Melhorias de Observabilidade
4.1. Monitoring Avançado

# monitoring/metrics.py
from prometheus_client import Counter, Histogram, Gauge, Info
import time
from functools import wraps

# Métricas específicas para contexto angolano
angola_metrics = {
    'documents_by_province': Counter(
        'documents_created_by_province_total',
        'Documents created by Angolan province',
        ['province', 'type']
    ),
    
    'payment_methods_angola': Counter(
        'payments_by_method_total',
        'Payments by method in Angola',
        ['method', 'amount_range', 'province']
    ),
    
    'api_latency_angola': Histogram(
        'api_response_time_angola_seconds',
        'API response time from Angola',
        ['endpoint', 'method', 'status_code'],
        buckets=[0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0]
    ),
    
    'active_users_angola': Gauge(
        'active_users_angola_current',
        'Currently active users in Angola',
        ['subscription_type']
    )
}

class AngolaBusiness Metrics:
    @staticmethod
    def track_document_creation(province, doc_type):
        angola_metrics['documents_by_province'].labels(
            province=province,
            type=doc_type
        ).inc()
    
    @staticmethod  
    def track_payment(method, amount, province):
        amount_range = 'low' if amount < 5000 else 'medium' if amount < 20000 else 'high'
        angola_metrics['payment_methods_angola'].labels(
            method=method,
            amount_range=amount_range,
            province=province
        ).inc()

# Decorator para tracking automático
def track_business_metrics(metric_type='generic'):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            
            try:
                result = func(*args, **kwargs)
                
                # Extrair contexto da requisição
                if hasattr(args[0], 'user'):
                    user = args[0].user
                    province = getattr(user.profile, 'province', 'unknown')
                    
                    if metric_type == 'document_creation':
                        AngolaBusinessMetrics.track_document_creation(
                            province, kwargs.get('doc_type', 'unknown')
                        )
                
                return result
                
            finally:
                duration = time.time() - start_time
                angola_metrics['api_latency_angola'].labels(
                    endpoint=func.__name__,
                    method='POST',
                    status_code=200
                ).observe(duration)
        
        return wrapper
    return decorator

4.2. Structured Logging Avançado

# logging/structured.py
import structlog
import logging
from pythonjsonlogger import jsonlogger

# Configuração de logging estruturado
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

class AngolaLoggerMixin:
    """Mixin para adicionar contexto angolano aos logs"""
    
    def get_log_context(self, request=None):
        context = {
            'service': 'saberangola',
            'environment': settings.ENVIRONMENT,
            'version': settings.VERSION,
        }
        
        if request:
            context.update({
                'user_id': getattr(request.user, 'id', None),
                'ip_address': self.get_client_ip(request),
                'user_agent': request.META.get('HTTP_USER_AGENT'),
                'province': getattr(request.user.profile, 'province', None) if hasattr(request.user, 'profile') else None,
                'request_id': request.META.get('HTTP_X_REQUEST_ID'),
            })
        
        return context
    
    def log_business_event(self, event_type, data, request=None):
        logger = structlog.get_logger()
        context = self.get_log_context(request)
        
        logger.info(
            "business_event",
            event_type=event_type,
            business_data=data,
            **context
        )

5. Melhorias de UX/DX (User/Developer Experience)
5.1. API Response Standardization

# api/responses.py
from rest_framework.response import Response
from rest_framework import status
from typing import Optional, Dict, Any, List
from dataclasses import dataclass, asdict

@dataclass
class APIResponse:
    success: bool
    data: Optional[Any] = None
    message: Optional[str] = None
    errors: Optional[Dict[str, List[str]]] = None
    meta: Optional[Dict[str, Any]] = None
    
    def to_dict(self):
        result = {'success': self.success}
        
        if self.data is not None:
            result['data'] = self.data
            
        if self.message:
            result['message'] = self.message
            
        if self.errors:
            result['errors'] = self.errors
            
        if self.meta:
            result['meta'] = self.meta
            
        return result

class StandardResponseMixin:
    def success_response(self, data=None, message=None, status_code=200, meta=None):
        response_data = APIResponse(
            success=True,
            data=data,
            message=message,
            meta=meta
        )
        return Response(response_data.to_dict(), status=status_code)
    
    def error_response(self, message=None, errors=None, status_code=400, data=None):
        response_data = APIResponse(
            success=False,
            message=message or "Ocorreu um erro",
            errors=errors,
            data=data
        )
        return Response(response_data.to_dict(), status=status_code)
    
    def validation_error_response(self, serializer_errors):
        """Formata erros de validação de forma consistente"""
        formatted_errors = {}
        for field, errors in serializer_errors.items():
            if isinstance(errors, list):
                formatted_errors[field] = [str(error) for error in errors]
            else:
                formatted_errors[field] = [str(errors)]
        
        return self.error_response(
            message="Dados inválidos fornecidos",
            errors=formatted_errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )

5.2. Frontend Integration Helpers

// types/api.ts - Tipos TypeScript para frontend
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

// hooks/useAPI.ts - Hook otimizado para Angola
import { useState, useCallback } from 'react';
import { APIResponse } from '@/types/api';

interface UseAPIOptions {
  showLoadingToast?: boolean;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

export function useAPI<T = any>(options: UseAPIOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    showLoadingToast = true,
    showSuccessToast = true,
    showErrorToast = true,
    retryAttempts = 3,
    retryDelay = 1000
  } = options;

  const call = useCallback(async (
    apiCall: () => Promise<APIResponse<T>>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    if (showLoadingToast) {
      toast.loading('Processando...', { id: 'api-loading' });
    }

    let attempts = 0;
    while (attempts < retryAttempts) {
      try {
        const response = await apiCall();
        
        if (response.success) {
          if (showLoadingToast) {
            toast.dismiss('api-loading');
          }
          
          if (showSuccessToast && response.message) {
            toast.success(response.message);
          }
          
          return response.data || null;
        } else {
          throw new Error(response.message || 'Erro desconhecido');
        }
        
      } catch (err) {
        attempts++;
        
        if (attempts >= retryAttempts) {
          const errorMessage = err instanceof Error ? err.message : 'Erro de conexão';
          setError(errorMessage);
          
          if (showLoadingToast) {
            toast.dismiss('api-loading');
          }
          
          if (showErrorToast) {
            toast.error(errorMessage);
          }
          
          return null;
        }
        
        // Delay antes de retry
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempts));
      }
    }
    
    setLoading(false);
    return null;
  }, [showLoadingToast, showSuccessToast, showErrorToast, retryAttempts, retryDelay]);

  return { call, loading, error };
}


6. Melhorias Específicas para Angola
6.1. Localização e Contexto Cultural

# localization/angola.py
from django.conf import settings
from typing import Dict, Any

class AngolaLocalization:
    PROVINCES = [
        'Luanda', 'Benguela', 'Huíla', 'Uíge', 'Cabinda', 
        'Cuando Cubango', 'Cunene', 'Huambo', 'Lunda Norte',
        'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Bié',
        'Bengo', 'Cuanza Norte', 'Cuanza Sul', 'Zaire'
    ]
    
    LANGUAGES = {
        'pt-AO': 'Português (Angola)',
        'umb': 'Umbundu', 
        'kmb': 'Kimbundu',
        'kik': 'Kikongo'
    }
    
    CURRENCY_FORMATS = {
        'AOA': {
            'symbol': 'Kz',
            'decimal_places': 2,
            'format': '{amount} {symbol}'
        }
    }
    
    PHONE_PATTERNS = {
        'mobile': r'^\+244[0-9]{9}$',
        'landline': r'^\+244[0-9]{8}$'
    }
    
    @classmethod
    def format_currency(cls, amount: float, currency: str = 'AOA') -> str:
        config = cls.CURRENCY_FORMATS.get(currency, cls.CURRENCY_FORMATS['AOA'])
        formatted_amount = f"{amount:,.{config['decimal_places']}f}".replace(',', ' ')
        return config['format'].format(amount=formatted_amount, symbol=config['symbol'])
    
    @classmethod
    def validate_phone(cls, phone: str) -> bool:
        import re
        return any(re.match(pattern, phone) for pattern in cls.PHONE_PATTERNS.values())
    
    @classmethod
    def get_province_tax_rate(cls, province: str) -> float:
        """Retorna a taxa de imposto específica da província"""
        # Exemplo: taxas diferentes por província
        rates = {
            'Luanda': 0.14,
            'Benguela': 0.12,
            # ... outras províncias
        }
        return rates.get(province, 0.10)  # Default 10%

# Middleware para contexto angolano
class AngolaContextMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # Detectar província pelo IP ou perfil do usuário
        request.angola_context = self.get_angola_context(request)
        
        response = self.get_response(request)
        return response
    
    def get_angola_context(self, request):
        context = {
            'province': 'Luanda',  # Default
            'language': 'pt-AO',
            'currency': 'AOA',
            'timezone': 'Africa/Luanda'
        }
        
        if request.user.is_authenticated and hasattr(request.user, 'profile'):
            profile = request.user.profile
            context.update({
                'province': profile.province or 'Luanda',
                'language': profile.language or 'pt-AO'
            })
        
        return context

6.2. Payment Integration Específica


# payments/angola_gateways.py
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import httpx
import hmac
import hashlib
from decimal import Decimal

class AngolaPaymentGateway(ABC):
    @abstractmethod
    async def create_payment(self, amount: Decimal, reference: str, **kwargs) -> Dict[str, Any]:
        pass
    
    @abstractmethod
    async def verify_payment(self, payment_id: str) -> Dict[str, Any]:
        pass
    
    @abstractmethod
    def validate_webhook(self, payload: bytes, signature: str) -> bool:
        pass

class EMISGateway(AngolaPaymentGateway):
    def __init__(self, merchant_id: str, api_key: str, webhook_secret: str):
        self.merchant_id = merchant_id
        self.api_key = api_key
        self.webhook_secret = webhook_secret
        self.base_url = "https://api.emis.co.ao/v1"
    
    async def create_payment(self, amount: Decimal, reference: str, **kwargs) -> Dict[str, Any]:
        payload = {
            "merchant_id": self.merchant_id,
            "amount": str(amount),
            "currency": "AOA",
            "reference": reference,
            "callback_url": kwargs.get('callback_url'),
            "return_url": kwargs.get('return_url'),
            "customer": {
                "name": kwargs.get('customer_name'),
                "email": kwargs.get('customer_email'),
                "phone": kwargs.get('customer_phone')
            },
            "description": kwargs.get('description', 'Pagamento SaberAngola')
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/payments",
                json=payload,
                headers={"Authorization": f"Bearer {self.api_key}"}
            )
            return response.json()
    
    def validate_webhook(self, payload: bytes, signature: str) -> bool:
        expected = hmac.new(
            self.webhook_secret.encode(),
            payload,
            hashlib.sha256
        ).hexdigest()
        return hmac.compare_digest(expected, signature)

class UnitelMoneyGateway(AngolaPaymentGateway):
    """Implementação específica para Unitel Money"""
    
    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.base_url = "https://api.unitel.money/v1"
    
    async def create_payment(self, amount: Decimal, reference: str, **kwargs) -> Dict[str, Any]:
        # Obter token de acesso
        token = await self._get_access_token()
        
        payload = {
            "amount": float(amount),
            "currency": "AOA",
            "external_reference": reference,
            "callback_url": kwargs.get('callback_url'),
            "description": kwargs.get('description', 'SaberAngola Payment')
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/payments",
                json=payload,
                headers={"Authorization": f"Bearer {token}"}
            )
            return response.json()
    
    async def _get_access_token(self) -> str:
        # Implementar OAuth2 para Unitel Money
        pass

# Factory para gateways
class PaymentGatewayFactory:
    _gateways = {
        'emis': EMISGateway,
        'unitel': UnitelMoneyGateway,
        'africell': AfricellMoneyGateway,
    }
    
    @classmethod
    def create(cls, gateway_type: str, config: Dict[str, Any]) -> AngolaPaymentGateway:
        if gateway_type not in cls._gateways:
            raise ValueError(f"Gateway não suportado: {gateway_type}")
        
        gateway_class = cls._gateways[gateway_type]
        return gateway_class(**config)

7. Implementação de Testes Modernos
7.1. Testes com Contexto Angolano

# tests/factories.py
import factory
from factory import fuzzy
from faker import Faker
from faker.providers import BaseProvider

fake = Faker('pt_AO')  # Faker para Angola

class AngolaProvider(BaseProvider):
    """Provider personalizado para dados angolanos"""
    
    provinces = [
        'Luanda', 'Benguela', 'Huíla', 'Uíge', 'Cabinda',
        'Cuando Cubango', 'Cunene', 'Huambo', 'Lunda Norte'
    ]
    
    def angola_province(self):
        return self.random_element(self.provinces)
    
    def angola_phone(self):
        return f"+244{self.random_int(min=900000000, max=999999999)}"
    
    def angola_nif(self):
        """Número de
