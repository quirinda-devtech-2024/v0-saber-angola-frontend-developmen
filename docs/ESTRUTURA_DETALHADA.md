# Estrutura Detalhada de Arquivos - SaberAngola

## 1. Backend (Django)

### 1.1. Configuração Principal

#### /backend/config/
```
config/
├── __init__.py
├── asgi.py          # Configuração ASGI para deploy
├── settings/        # Configurações separadas por ambiente
│   ├── __init__.py
│   ├── base.py     # Configurações base compartilhadas
│   ├── local.py    # Configurações de desenvolvimento
│   ├── prod.py     # Configurações de produção
│   └── test.py     # Configurações de teste
├── urls.py         # URLs principais do projeto
└── wsgi.py         # Configuração WSGI para deploy
```

Justificativa: Separação de configurações por ambiente permite melhor gerenciamento e segurança.

### 1.2. Apps Principais

#### /backend/apps/users/
```
users/
├── __init__.py
├── admin.py           # Configuração do admin para usuários
├── apps.py           # Configuração do app
├── constants.py      # Constantes relacionadas a usuários
├── managers.py       # Custom user manager
├── models/
│   ├── __init__.py
│   ├── user.py      # Modelo base de usuário
│   └── profile.py   # Modelo de perfil estendido
├── serializers/
│   ├── __init__.py
│   ├── user.py      # Serialização de dados do usuário
│   └── profile.py   # Serialização de dados do perfil
├── services/
│   ├── __init__.py
│   ├── auth.py      # Lógica de autenticação
│   └── profile.py   # Lógica de perfil
├── tests/
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_serializers.py
│   └── test_views.py
├── urls.py
└── views/
    ├── __init__.py
    ├── auth.py      # Views de autenticação
    └── profile.py   # Views de perfil
```

Justificativa: Gerenciamento completo de usuários com separação clara de responsabilidades.

#### /backend/apps/documents/
```
documents/
├── __init__.py
├── admin.py
├── apps.py
├── constants.py      # Tipos de documentos, estados, etc.
├── models/
│   ├── __init__.py
│   ├── declaration.py    # Modelo para declarações
│   ├── contract.py      # Modelo para contratos
│   ├── invoice.py       # Modelo para faturas
│   ├── resume.py        # Modelo para CVs
│   └── template.py      # Modelo base para templates
├── serializers/
│   ├── __init__.py
│   ├── declaration.py
│   ├── contract.py
│   ├── invoice.py
│   ├── resume.py
│   └── template.py
├── services/
│   ├── __init__.py
│   ├── generator/
│   │   ├── __init__.py
│   │   ├── base.py      # Classe base de geração
│   │   ├── declaration.py
│   │   ├── contract.py
│   │   ├── invoice.py
│   │   └── resume.py
│   ├── parser/
│   │   ├── __init__.py
│   │   ├── docx.py      # Parser para Word
│   │   ├── pdf.py       # Parser para PDF
│   │   └── html.py      # Parser para HTML
│   └── validator/
│       ├── __init__.py
│       ├── declaration.py
│       ├── contract.py
│       ├── invoice.py
│       └── resume.py
├── tasks/
│   ├── __init__.py
│   ├── cleanup.py       # Limpeza de documentos antigos
│   └── generation.py    # Tarefas assíncronas
├── templates/
│   ├── declarations/
│   ├── contracts/
│   ├── invoices/
│   └── resumes/
├── tests/
│   ├── __init__.py
│   ├── factories.py
│   ├── test_models.py
│   ├── test_services.py
│   └── test_views.py
├── urls.py
└── views/
    ├── __init__.py
    ├── declaration.py
    ├── contract.py
    ├── invoice.py
    └── resume.py
```

Justificativa: Núcleo do sistema de geração de documentos, com separação clara por tipo.

#### /backend/apps/billing/
```
billing/
├── __init__.py
├── admin.py
├── apps.py
├── constants.py      # Constantes de preços e planos
├── models/
│   ├── __init__.py
│   ├── plan.py       # Modelo de planos
│   ├── subscription.py # Modelo de assinaturas
│   ├── transaction.py # Modelo de transações
│   └── invoice.py    # Modelo de faturas
├── serializers/
│   ├── __init__.py
│   ├── plan.py
│   ├── subscription.py
│   └── transaction.py
├── services/
│   ├── __init__.py
│   ├── calculator.py  # Cálculo de preços
│   ├── multicaixa.py  # Integração Multicaixa
│   └── processor.py   # Processamento de pagamentos
├── tasks/
│   ├── __init__.py
│   ├── invoicing.py   # Geração de faturas
│   └── renewal.py     # Renovação de assinaturas
├── tests/
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_services.py
│   └── test_views.py
├── urls.py
└── views/
    ├── __init__.py
    ├── plan.py
    ├── subscription.py
    └── webhook.py
```

Justificativa: Gestão completa de pagamentos e assinaturas.

#### /backend/apps/storage/
```
storage/
├── __init__.py
├── admin.py
├── apps.py
├── models/
│   ├── __init__.py
│   ├── file.py      # Modelo de arquivos
│   └── folder.py    # Modelo de pastas
├── services/
│   ├── __init__.py
│   ├── aws.py       # Integração com S3
│   ├── local.py     # Armazenamento local
│   └── cleanup.py   # Limpeza de arquivos
├── tasks/
│   ├── __init__.py
│   └── cleanup.py   # Limpeza periódica
└── utils/
    ├── __init__.py
    ├── compression.py
    └── validation.py
```

Justificativa: Gerenciamento de arquivos e integração com serviços de storage.

#### /backend/apps/audit/
```
audit/
├── __init__.py
├── admin.py
├── apps.py
├── models/
│   ├── __init__.py
│   ├── activity.py   # Registro de atividades
│   └── error.py      # Registro de erros
├── middleware/
│   ├── __init__.py
│   └── audit.py      # Middleware de auditoria
├── services/
│   ├── __init__.py
│   ├── logger.py     # Serviço de logging
│   └── reporter.py   # Geração de relatórios
└── utils/
    ├── __init__.py
    └── filters.py    # Filtros de auditoria
```

Justificativa: Monitoramento e auditoria de ações no sistema.

### 1.3. Utilitários e Ferramentas

#### /backend/core/
```
core/
├── __init__.py
├── exceptions/
│   ├── __init__.py
│   ├── auth.py
│   ├── billing.py
│   └── documents.py
├── middleware/
│   ├── __init__.py
│   ├── cors.py
│   ├── logging.py
│   └── timing.py
├── permissions/
│   ├── __init__.py
│   ├── billing.py
│   └── documents.py
└── utils/
    ├── __init__.py
    ├── decorators.py
    ├── generators.py
    ├── validators.py
    └── formatters.py
```

Justificativa: Código compartilhado entre apps.

#### /backend/api/
```
api/
├── __init__.py
├── v1/
│   ├── __init__.py
│   ├── urls.py
│   └── views/
│       ├── __init__.py
│       ├── documents.py
│       ├── users.py
│       └── billing.py
└── v2/
    ├── __init__.py
    ├── urls.py
    └── views/
```

Justificativa: Versionamento de API.

### 1.4. Testes e Qualidade

#### /backend/tests/
```
tests/
├── __init__.py
├── conftest.py
├── factories/
│   ├── __init__.py
│   ├── documents.py
│   ├── users.py
│   └── billing.py
├── integration/
│   ├── __init__.py
│   ├── test_billing.py
│   └── test_documents.py
└── utils/
    ├── __init__.py
    ├── assertions.py
    └── helpers.py
```

Justificativa: Testes organizados e reutilizáveis.

### 1.5. Scripts e Ferramentas

#### /backend/scripts/
```
scripts/
├── __init__.py
├── deployment/
│   ├── __init__.py
│   ├── backup.py
│   └── migrate.py
├── data/
│   ├── __init__.py
│   ├── generate_sample_data.py
│   └── cleanup_old_data.py
└── maintenance/
    ├── __init__.py
    └── system_check.py
```

Justificativa: Scripts utilitários para manutenção.

### 1.6. Documentação

#### /backend/docs/
```
docs/
├── api/
│   ├── v1/
│   └── v2/
├── architecture/
│   ├── decisions/
│   └── diagrams/
└── development/
    ├── setup.md
    └── guidelines.md
```

Justificativa: Documentação organizada e acessível.

## 2. Arquivos de Configuração

### 2.1. Ambiente e Dependências
```
backend/
├── .env.example
├── requirements/
│   ├── base.txt
│   ├── local.txt
│   ├── prod.txt
│   └── test.txt
├── setup.py
└── setup.cfg
```

### 2.2. Docker
```
backend/
├── Dockerfile
├── docker-compose.yml
└── docker/
    ├── nginx/
    │   └── nginx.conf
    └── scripts/
        ├── entrypoint.sh
        └── wait-for-it.sh
```

### 2.3. CI/CD
```
backend/
├── .github/
│   └── workflows/
│       ├── test.yml
│       └── deploy.yml
└── scripts/
    └── ci/
        ├── test.sh
        └── deploy.sh
```

## 3. Componentes Principais

### 3.1. Modelos (models.py)

#### User Model
```python
class User(AbstractUser):
    """
    Modelo personalizado de usuário.
    
    Estende o modelo base do Django para incluir campos específicos
    do SaberAngola.
    
    Campos:
    - phone: Número de telefone (validação específica Angola)
    - bi_number: Número do BI
    - account_type: Tipo de conta (individual/empresa)
    - subscription_status: Status da assinatura
    """
    phone = models.CharField(max_length=20)
    bi_number = models.CharField(max_length=20)
    account_type = models.CharField(max_length=20)
    subscription_status = models.CharField(max_length=20)
```

#### Document Models
```python
class BaseDocument(models.Model):
    """
    Modelo base para todos os documentos.
    
    Campos comuns a todos os tipos de documentos.
    """
    user = models.ForeignKey('users.User')
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20)
    
class Declaration(BaseDocument):
    """
    Modelo para declarações.
    
    Campos específicos para declarações.
    """
    type = models.CharField(max_length=50)
    content = models.JSONField()
    signature = models.ImageField()
    
class Contract(BaseDocument):
    """
    Modelo para contratos.
    
    Campos específicos para contratos.
    """
    type = models.CharField(max_length=50)
    parties = models.JSONField()
    clauses = models.JSONField()
    
class Invoice(BaseDocument):
    """
    Modelo para faturas.
    
    Campos específicos para faturas comerciais.
    """
    invoice_number = models.CharField(max_length=50)
    items = models.JSONField()
    total = models.DecimalField()
    
class Resume(BaseDocument):
    """
    Modelo para currículos.
    
    Campos específicos para CVs.
    """
    template = models.CharField(max_length=50)
    sections = models.JSONField()
    language = models.CharField(max_length=10)
```

### 3.2. Serviços (services.py)

#### Document Generation Service
```python
class DocumentGenerationService:
    """
    Serviço central para geração de documentos.
    
    Responsável por orquestrar o processo de geração,
    aplicando templates e formatação.
    """
    
    def generate(self, document_type, data):
        """Gera um documento baseado no tipo e dados."""
        pass
        
    def validate(self, document_type, data):
        """Valida os dados antes da geração."""
        pass
        
    def format(self, document, output_format):
        """Formata o documento para o formato desejado."""
        pass
```

#### Billing Service
```python
class BillingService:
    """
    Serviço de faturação e pagamentos.
    
    Gerencia cobranças, assinaturas e integrações
    com gateways de pagamento.
    """
    
    def process_payment(self, user, amount):
        """Processa um pagamento."""
        pass
        
    def create_subscription(self, user, plan):
        """Cria uma nova assinatura."""
        pass
        
    def calculate_price(self, document_type, user):
        """Calcula o preço baseado no tipo e plano."""
        pass
```

### 3.3. Views (views.py)

#### Document Views
```python
class DocumentGenerationView(APIView):
    """
    View para geração de documentos.
    
    Endpoints:
    - POST /api/v1/documents/generate/
    - GET /api/v1/documents/{id}/
    - GET /api/v1/documents/list/
    """
    
    def post(self, request):
        """Gera um novo documento."""
        pass
        
    def get(self, request, document_id):
        """Recupera um documento específico."""
        pass
```

#### Billing Views
```python
class SubscriptionView(APIView):
    """
    View para gerenciar assinaturas.
    
    Endpoints:
    - POST /api/v1/billing/subscribe/
    - GET /api/v1/billing/subscription/
    - PUT /api/v1/billing/subscription/
    """
    
    def post(self, request):
        """Cria uma nova assinatura."""
        pass
        
    def get(self, request):
        """Recupera detalhes da assinatura."""
        pass
```

### 3.4. Tasks (tasks.py)

```python
class DocumentCleanupTask:
    """
    Task periódica para limpeza de documentos.
    
    Remove documentos antigos e temporários.
    """
    
    def cleanup_old_documents(self):
        """Remove documentos expirados."""
        pass
        
    def cleanup_temp_files(self):
        """Remove arquivos temporários."""
        pass
```

## 4. Considerações de Implementação

### 4.1. Performance

- Uso de cache para templates frequentes
- Otimização de queries no banco de dados
- Processamento assíncrono de documentos grandes
- CDN para arquivos estáticos

### 4.2. Segurança

- Validação rigorosa de inputs
- Sanitização de dados
- Rate limiting
- Proteção contra CSRF
- Autenticação JWT
- Logs de auditoria

### 4.3. Escalabilidade

- Arquitetura modular
- Separação clara de responsabilidades
- Cache distribuído
- Filas de processamento
- Balanceamento de carga

### 4.4. Manutenibilidade

- Documentação clara
- Testes automatizados
- Padrões de código
- Revisão de código
- Monitoramento

## 5. Integrações

### 5.1. Serviços Externos

- AWS S3 para armazenamento
- Multicaixa Express para pagamentos
- SendGrid para emails
- Redis para cache
- PostgreSQL para banco de dados

### 5.2. APIs de Terceiros

- Validação de BI
- Verificação de endereço
- OCR para documentos
- Tradução automática
- Validação de faturas AGT

## 6. Monitoramento e Logs

### 6.1. Métricas

- Tempo de geração de documentos
- Taxa de sucesso/erro
- Uso de recursos
- Performance de queries
- Latência de API

### 6.2. Alertas

- Erros críticos
- Uso excessivo de recursos
- Falhas de pagamento
- Problemas de segurança
- Performance degradada