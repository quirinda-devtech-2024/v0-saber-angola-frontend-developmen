# Arquitetura AWS - Sistema de Geração de Documentos SaberAngola

## 1. Visão Geral da Arquitetura

### 1.1. Objetivos de Performance
- 100 documentos por minuto
- 50 documentos a cada 30 segundos
- Latência máxima de 2 segundos por documento
- Disponibilidade de 99.99%
- Escalabilidade automática

### 1.2. Componentes Principais
```plaintext
┌─────────────────┐     ┌──────────────┐     ┌───────────────┐
│   Route 53      │────▶│   CloudFront │────▶│  Application  │
│   (DNS/SSL)     │     │    (CDN)     │     │ Load Balancer │
└─────────────────┘     └──────────────┘     └───────┬───────┘
                                                     │
                                                     ▼
┌─────────────────┐     ┌──────────────┐     ┌───────────────┐
│    Auto         │◀───▶│     ECS      │◀───▶│   Fargate     │
│    Scaling      │     │   Cluster    │     │  Containers   │
└─────────────────┘     └──────────────┘     └───────────────┘
                                                     │
                                                     ▼
┌─────────────────┐     ┌──────────────┐     ┌───────────────┐
│    ElastiCache  │◀───▶│    Aurora    │◀───▶│     S3        │
│    (Redis)      │     │  PostgreSQL  │     │  (Storage)    │
└─────────────────┘     └──────────────┘     └───────────────┘
```

## 2. Componentes Detalhados

### 2.1. DNS e CDN
```yaml
Route53:
  - Dominio: saberangola.ao
  - SSL: ACM Certificate
  - Health Checks: Enabled
  - Failover: Active-Active

CloudFront:
  - Origins:
    - ALB (aplicação)
    - S3 (assets estáticos)
  - Cache Behaviors:
    - Templates: 24h TTL
    - Assets: 7d TTL
    - API: No-cache
  - Edge Locations:
    - África do Sul
    - Europa (para redundância)
```

### 2.2. Load Balancing e Containers

#### Application Load Balancer
```yaml
ALB:
  - Scheme: internet-facing
  - Listeners:
    - HTTP: redirect to HTTPS
    - HTTPS: forward to target groups
  - Target Groups:
    - document-generation
    - api-services
  - Health Checks:
    - Path: /health
    - Interval: 30s
    - Timeout: 5s
    - Threshold: 2
```

#### ECS Fargate
```yaml
ECS_Cluster:
  - Name: saberangola-production
  - Capacity Providers: FARGATE
  - Services:
    - document-generation:
        MinTasks: 10
        MaxTasks: 50
        CPU: 2vCPU
        Memory: 4GB
    - api-services:
        MinTasks: 5
        MaxTasks: 20
        CPU: 1vCPU
        Memory: 2GB
```

### 2.3. Auto Scaling

#### Scaling Policies
```yaml
AutoScaling:
  - Target Tracking:
      - CPU Utilization: 70%
      - Memory Utilization: 80%
      - Request Count Per Target: 1000
  - Step Scaling:
      - Scale Out:
          - Add 2 tasks when CPU > 80%
          - Add 5 tasks when CPU > 90%
      - Scale In:
          - Remove 1 task when CPU < 40%
          - Cool down: 300s
```

### 2.4. Banco de Dados

#### Aurora PostgreSQL
```yaml
Aurora:
  - Class: db.r6g.xlarge
  - Multi-AZ: true
  - Replicas: 2
  - Storage:
      - Type: Aurora
      - AutoScaling: true
      - MaxStorage: 1TB
  - Backup:
      - Retention: 7 days
      - Snapshot: daily
```

#### ElastiCache (Redis)
```yaml
ElastiCache:
  - Engine: Redis 7.x
  - NodeType: cache.r6g.large
  - NumShards: 4
  - ReplicasPerShard: 1
  - MultiAZ: true
  - AutoFailover: enabled
```

### 2.5. Storage

#### S3 Configuration
```yaml
S3:
  - Buckets:
      - templates:
          - Versioning: enabled
          - Encryption: AES-256
          - Lifecycle:
              - Transition to IA: 30 days
      - generated-docs:
          - Versioning: enabled
          - Lifecycle:
              - Delete: 7 days
      - assets:
          - CloudFront: enabled
          - Caching: aggressive
```

## 3. Processamento de Documentos

### 3.1. Fluxo de Geração
```plaintext
1. Request Recebido
   │
2. Load Balancer Distribution
   │
3. Container Processing
   ├─► Template Loading (S3)
   ├─► Data Processing
   ├─► Document Generation
   └─► Result Storage (S3)
```

### 3.2. Pipeline de Processamento
```yaml
DocumentPipeline:
  - Steps:
    1. ValidateRequest:
       - Schema validation
       - Permission check
       - Rate limiting
    
    2. LoadTemplate:
       - Cache check (Redis)
       - S3 fetch if needed
       - Template parsing
    
    3. GenerateDocument:
       - Data merging
       - Format processing
       - Quality checks
    
    4. SaveResult:
       - S3 storage
       - Cache update
       - Notification
```

## 4. Otimizações de Performance

### 4.1. Caching Strategy
```yaml
CacheLayers:
  L1_Redis:
    - Templates
    - User preferences
    - Session data
    - Rate limiting
    TTL: 1 hour

  L2_CloudFront:
    - Static assets
    - Common templates
    - Public resources
    TTL: 24 hours

  L3_Browser:
    - UI components
    - Images
    - Stylesheets
    TTL: 7 days
```

### 4.2. Queue Management
```yaml
SQS:
  DocumentQueue:
    - Type: FIFO
    - DelaySeconds: 0
    - MessageRetention: 4 hours
    - VisibilityTimeout: 5 minutes
    - MaxReceiveCount: 3
```

## 5. Monitoramento e Alertas

### 5.1. CloudWatch Metrics
```yaml
Metrics:
  - DocumentGeneration:
      - GenerationTime
      - SuccessRate
      - ErrorRate
      - QueueLength
  
  - Resources:
      - CPU Utilization
      - Memory Usage
      - Network I/O
      - Disk I/O

  - Custom:
      - TemplateLoadTime
      - ProcessingTime
      - StorageTime
```

### 5.2. Alerting
```yaml
Alerts:
  High:
    - Condition: ErrorRate > 5%
    - Action: SNS + PagerDuty
    
  Critical:
    - Condition: SuccessRate < 95%
    - Action: SNS + PagerDuty + Slack
    
  Warning:
    - Condition: ProcessingTime > 2s
    - Action: SNS
```

## 6. Segurança

### 6.1. Network Security
```yaml
VPC:
  - CIDR: 10.0.0.0/16
  - Subnets:
      Public:
        - ALB
        - NAT Gateway
      Private:
        - ECS Tasks
        - Aurora
        - ElastiCache

SecurityGroups:
  - ALB:
      Inbound: 
        - 443 from CloudFront
  - ECS:
      Inbound:
        - 8080 from ALB
  - Aurora:
      Inbound:
        - 5432 from ECS
  - Redis:
      Inbound:
        - 6379 from ECS
```

### 6.2. IAM Configuration
```yaml
IAM:
  - Roles:
      ECS:
        - S3 access
        - SQS access
        - CloudWatch logs
      
      Lambda:
        - S3 access
        - SES access
        
  - Policies:
      - Least privilege
      - Resource-based
      - Service roles
```

## 7. Custos Estimados

### 7.1. Recursos Base
```yaml
Monthly:
  Compute:
    - Fargate: $2,000
    - Aurora: $1,500
    - ElastiCache: $800
    
  Storage:
    - S3: $200
    - EBS: $100
    
  Network:
    - CloudFront: $300
    - Data Transfer: $400
    
  Others:
    - Route53: $50
    - ACM: $0
    - CloudWatch: $100

Total Estimated: $5,450/month
```

### 7.2. Escalabilidade de Custos
```yaml
Cost_per_1000_docs:
  - Compute: $2.00
  - Storage: $0.50
  - Network: $0.30
  Total: $2.80
```

## 8. Disaster Recovery

### 8.1. Backup Strategy
```yaml
Backups:
  Database:
    - Daily snapshots
    - Transaction logs
    - Cross-region replication
    
  Documents:
    - S3 versioning
    - Cross-region replication
    - Lifecycle policies
```

### 8.2. Recovery Plan
```yaml
RPO: 15 minutes
RTO: 1 hour

Procedures:
  1. Database failover
  2. DNS switchover
  3. Application scaling
  4. Cache warming
```

## 9. Manutenção e Updates

### 9.1. Deployment Strategy
```yaml
Deployment:
  - Blue/Green deployment
  - Canary testing
  - Rolling updates
  - Auto rollback
```

### 9.2. Maintenance Windows
```yaml
Maintenance:
  - Database: Sunday 02:00-04:00 UTC
  - Application: Rolling updates
  - Security patches: Immediate
```