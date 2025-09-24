# Estrutura do Módulo de Pagamentos – SaberAngola

apps/
└── payments/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py           # Plan, Subscription, Transaction
    ├── serializers.py
    ├── urls.py
    ├── views.py            # Checkout, Webhook, Status
    ├── services/
    │   ├── __init__.py
    │   ├── emis.py         # Integração EMIS
    │   ├── unitel.py       # Integração Unitel Money
    │   ├── africell.py     # Integração Africell Money
    │   ├── payment.py      # PaymentService (checkout, renovação)
    │   ├── webhook.py      # Processamento de callbacks
    │   └── notifications.py# Envio de emails, websockets
    ├── security/
    │   ├── __init__.py
    │   └── validators.py   # Validação de valores, assinaturas
    ├── logging/
    │   ├── __init__.py
    │   └── payments.py     # Logs estruturados
    ├── metrics/
    │   └── prometheus.py   # Métricas de pagamentos
    ├── tests/
    │   ├── __init__.py
    │   ├── test_models.py
    │   ├── test_checkout.py
    │   ├── test_webhooks.py
    │   └── test_gateways.py
    └── migrations/
        ├── 0001_initial.py
        └── ...


🗂️ Organização por Responsabilidade

models.py →

Plan (Free, 1000, 2500, 5000).

Subscription (estado: ativa, pendente, expirada).

Transaction (status: pendente, completada, falha).

services/ →

Integrações diretas com gateways (EMIS, Unitel Money, Africell Money).

payment.py centraliza checkout e renovação.

webhook.py processa notificações.

notifications.py envia confirmações (email, websocket).

security/ →

Validação de assinaturas de webhooks.

Proteção de dados sensíveis.

logging/ →

Logs estruturados de cada transação (sucesso/falha).

metrics/ →

Contadores Prometheus (tentativas, duração, sucesso/falha).

tests/ →

Unitários e integração (simulação de checkout, callbacks).