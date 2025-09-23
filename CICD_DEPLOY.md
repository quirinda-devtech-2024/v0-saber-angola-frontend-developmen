# CI/CD e Deploy - SaberAngola

## Sumário

1. Visão Geral
2. Pipeline CI/CD
3. Ambientes
4. Configuração GitHub Actions
5. Docker e Containerização
6. Deploy AWS
7. Monitoramento
8. Rollback e Recuperação
9. Segurança
10. Boas Práticas

---

## 1. Visão Geral

### 1.1. Objetivos

- Automatização de build, testes e deploy
- Garantia de qualidade do código
- Deploy contínuo e confiável
- Monitoramento em tempo real
- Recuperação rápida de falhas

### 1.2. Fluxo Geral

```mermaid
graph LR
    A[Commit] --> B[CI Checks]
    B --> C[Testes]
    C --> D[Build]
    D --> E[Deploy Staging]
    E --> F[Testes E2E]
    F --> G[Deploy Prod]
```

---

## 2. Pipeline CI/CD

### 2.1. Continuous Integration

```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Run tests
      env:
        DATABASE_URL: postgresql://test:test@localhost:5432/test_db
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      run: |
        pytest --cov
        flake8
        black --check .

  frontend-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: |
        npm run test
        npm run lint
```

### 2.2. Continuous Deployment

```yaml
# .github/workflows/cd.yml
name: Continuous Deployment

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Build and push containers
      run: |
        docker build -t saberangola-backend:${{ github.sha }} backend/
        docker build -t saberangola-frontend:${{ github.sha }} frontend/
        aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${{ secrets.ECR_REGISTRY }}
        docker tag saberangola-backend:${{ github.sha }} ${{ secrets.ECR_REGISTRY }}/saberangola-backend:${{ github.sha }}
        docker tag saberangola-frontend:${{ github.sha }} ${{ secrets.ECR_REGISTRY }}/saberangola-frontend:${{ github.sha }}
        docker push ${{ secrets.ECR_REGISTRY }}/saberangola-backend:${{ github.sha }}
        docker push ${{ secrets.ECR_REGISTRY }}/saberangola-frontend:${{ github.sha }}
    
    - name: Deploy to ECS
      run: |
        aws ecs update-service --cluster saberangola-staging --service backend --force-new-deployment
        aws ecs update-service --cluster saberangola-staging --service frontend --force-new-deployment
```

---

## 3. Ambientes

### 3.1. Desenvolvimento

- Local: Docker Compose
- Branch: feature/*
- Banco: PostgreSQL local
- S3: LocalStack
- Redis: Container local

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: saberangola
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev123
    ports:
      - "5432:5432"
  
  redis:
    image: redis:6
    ports:
      - "6379:6379"
  
  localstack:
    image: localstack/localstack
    ports:
      - "4566:4566"
    environment:
      SERVICES: s3
      DEBUG: 1
```

### 3.2. Staging

- AWS ECS (Fargate)
- Branch: develop
- RDS PostgreSQL
- S3 Bucket staging
- ElastiCache Redis
- Route53 + ACM

### 3.3. Produção

- AWS ECS (Fargate)
- Branch: main
- Aurora PostgreSQL
- S3 Bucket produção
- ElastiCache Redis Cluster
- CloudFront + ACM
- Route53

---

## 4. Docker e Containerização

### 4.1. Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=saberangola.settings

EXPOSE 8000

CMD ["gunicorn", "saberangola.wsgi:application", "--bind", "0.0.0.0:8000"]
```

### 4.2. Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 5. Deploy AWS

### 5.1. Infraestrutura (Terraform)

```hcl
# main.tf
provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "saberangola-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  
  enable_nat_gateway = true
}

module "ecs" {
  source = "terraform-aws-modules/ecs/aws"
  
  cluster_name = "saberangola"
  
  cluster_configuration = {
    execute_command_configuration = {
      logging = "OVERRIDE"
      log_configuration = {
        cloud_watch_log_group_name = "/aws/ecs/saberangola"
      }
    }
  }
}
```

### 5.2. Task Definitions

```json
{
  "family": "saberangola-backend",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "${ECR_REGISTRY}/saberangola-backend:latest",
      "cpu": 256,
      "memory": 512,
      "essential": true,
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "DATABASE_URL",
          "value": "postgresql://user:pass@rds-host:5432/db"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/saberangola-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "backend"
        }
      }
    }
  ]
}
```

---

## 6. Monitoramento

### 6.1. CloudWatch Alarms

```yaml
Resources:
  HighCPUAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: HighCPUUtilization
      MetricName: CPUUtilization
      Namespace: AWS/ECS
      Statistic: Average
      Period: 300
      EvaluationPeriods: 2
      Threshold: 80
      AlarmActions:
        - !Ref AlarmTopic
      Dimensions:
        - Name: ClusterName
          Value: saberangola
```

### 6.2. Logs

```python
# backend/settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'json': {
            'class': 'pythonjsonlogger.jsonlogger.JsonFormatter',
            'format': '%(timestamp)s %(level)s %(name)s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'json'
        }
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO'
    }
}
```

---

## 7. Rollback e Recuperação

### 7.1. Estratégia de Rollback

1. Manter últimas 5 versões de imagens no ECR
2. Configurar deployment circuit breaker
3. Monitorar métricas de saúde
4. Automatizar rollback em falha

```yaml
# ECS Service
service:
  deployment_circuit_breaker:
    enable: true
    rollback: true
  deployment_configuration:
    maximum_percent: 200
    minimum_healthy_percent: 100
```

### 7.2. Script de Rollback

```bash
#!/bin/bash

function rollback() {
    PREV_VERSION=$(aws ecr describe-images \
        --repository-name saberangola-backend \
        --query 'imageDetails[?!contains(imageTags[],`latest`)].imageTags[0]' \
        --output text \
        --max-items 2 | tail -n1)
    
    aws ecs update-service \
        --cluster saberangola \
        --service backend \
        --task-definition saberangola-backend:${PREV_VERSION} \
        --force-new-deployment
}

# Monitor deployment
while true; do
    STATUS=$(aws ecs describe-services \
        --cluster saberangola \
        --services backend \
        --query 'services[0].deployments[0].status' \
        --output text)
    
    if [ "$STATUS" == "FAILED" ]; then
        echo "Deployment failed, initiating rollback..."
        rollback
        break
    fi
    
    sleep 10
done
```

---

## 8. Segurança

### 8.1. Secrets Management

```yaml
# .github/workflows/cd.yml
steps:
  - name: Configure AWS Credentials
    uses: aws-actions/configure-aws-credentials@v1
    with:
      role-to-assume: arn:aws:iam::123456789012:role/github-actions
      aws-region: us-east-1
  
  - name: Get Secrets
    run: |
      secrets=$(aws secretsmanager get-secret-value \
        --secret-id saberangola/production \
        --query SecretString \
        --output text)
      echo "::add-mask::$secrets"
      echo "SECRETS=$secrets" >> $GITHUB_ENV
```

### 8.2. Security Groups

```hcl
resource "aws_security_group" "ecs_tasks" {
  name        = "saberangola-ecs-tasks"
  description = "Allow inbound traffic for ECS tasks"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = 8000
    to_port         = 8000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

---

## 9. Boas Práticas

### 9.1. Versionamento

- Usar tags semânticas (v1.2.3)
- Nunca reutilizar tags
- Documentar mudanças em CHANGELOG.md
- Branches protegidas com code review

### 9.2. Testes

- Cobertura mínima de 80%
- Testes de integração automatizados
- Testes de carga periódicos
- Validação de segurança (SAST/DAST)

### 9.3. Monitoramento

- Alertas proativos
- Dashboards atualizados
- Logs centralizados
- Métricas de negócio

---

## 10. Checklist de Deploy

### 10.1. Pré-deploy

- [ ] Testes passando
- [ ] Cobertura de código mantida
- [ ] Changelog atualizado
- [ ] Dependências atualizadas
- [ ] Security scan realizado

### 10.2. Deploy

- [ ] Backup do banco de dados
- [ ] Migrations planejadas
- [ ] Configurações validadas
- [ ] Canário testado
- [ ] Métricas monitoradas

### 10.3. Pós-deploy

- [ ] Smoke tests executados
- [ ] Logs verificados
- [ ] Performance validada
- [ ] Usuários notificados
- [ ] Documentação atualizada

---

## Anexos

### A. Comandos Úteis

```bash
# Build e Push
docker build -t saberangola-backend .
docker push $ECR_REGISTRY/saberangola-backend:latest

# Deploy
aws ecs update-service --cluster saberangola --service backend --force-new-deployment

# Logs
aws logs get-log-events --log-group-name /ecs/saberangola-backend

# Rollback
aws ecs update-service --cluster saberangola --service backend --task-definition saberangola-backend:previous
```

### B. Variáveis de Ambiente

```env
# Produção
DATABASE_URL=postgresql://user:pass@rds-host:5432/db
REDIS_URL=redis://elasticache:6379/0
AWS_S3_BUCKET=saberangola-prod
SENTRY_DSN=https://xxx@sentry.io/123
```

### C. Métricas Importantes

1. **Application**
   - Response time (p95, p99)
   - Error rate
   - Active users
   - Concurrent sessions

2. **Infrastructure**
   - CPU/Memory usage
   - Network I/O
   - Disk usage
   - Queue length

3. **Business**
   - Conversões
   - Documentos gerados
   - Pagamentos processados
   - Usuários ativos

---

> Este documento serve como guia completo para CI/CD e Deploy do projeto SaberAngola, garantindo um processo de deployment seguro, automatizado e confiável.