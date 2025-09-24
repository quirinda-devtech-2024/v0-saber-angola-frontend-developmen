# Infraestrutura Inicial de Baixo Custo - SaberAngola

## 1. Vercel (Frontend)

### 1.1. Plano Hobby (Gratuito)
Fonte: [Vercel Pricing](https://vercel.com/pricing)

```yaml
Recursos Incluídos:
  Deployment:
    - Quantidade: Ilimitada
    - SSL: Incluído
    - CI/CD: Automático
    - Domínios: Ilimitados .vercel.app

  Bandwidth:
    - 100 GB incluídos
    - Suficiente para ~50.000 acessos/mês

  Build:
    - Execuções: 100 por dia
    - Duração máxima: 6000 minutos/mês
    - Serverless Functions: Incluídas

  Regiões:
    - Global Edge Network
    - Auto CDN
    - Analytics básico

Limitações:
  - Sem domínio personalizado
  - Sem equipes
  - Sem suporte prioritário
  - Build time: max 5min por deploy

Custo Total Vercel: $0/mês
```

## 2. AWS (Backend)

### 2.1. AWS Free Tier
Fonte: [AWS Free Tier](https://aws.amazon.com/free/)

#### 2.1.1. EC2 (Servidor)
```yaml
t2.micro (Free Tier):
  - vCPU: 1
  - RAM: 1 GB
  - Storage: 30 GB
  - Horas: 750/mês (suficiente para 1 instância 24/7)
  
Limitações:
  - Performance modesta
  - Picos de CPU limitados
  - Ideal para MVP com tráfego inicial

Custo EC2: $0/mês (dentro do Free Tier)
```

#### 2.1.2. RDS (Banco de Dados)
```yaml
db.t3.micro (Free Tier):
  - vCPU: 1
  - RAM: 1 GB
  - Storage: 20 GB
  - Engine: PostgreSQL
  
Limitações:
  - Sem Multi-AZ
  - Backup diário
  - IOPS standard

Custo RDS: $0/mês (dentro do Free Tier)
```

#### 2.1.3. S3 (Storage)
```yaml
Free Tier:
  - Storage: 5 GB
  - Requisições PUT/COPY/POST/LIST: 2.000
  - Requisições GET: 20.000
  - Transferência de dados: 100 GB/mês

Estimativa Uso Inicial:
  - Templates: ~500 MB
  - Documentos gerados: ~2 GB
  - Assets: ~1 GB

Custo S3: $0/mês (dentro do Free Tier)
```

### 2.2. Custos Adicionais Necessários

#### 2.2.1. Route 53 (DNS)
```yaml
Custo Fixo:
  - Hosted Zone: $0.50/mês
  - Queries: $0.40 por milhão (primeiros 1B)

Estimativa Mensal Route 53: $0.50/mês
```

#### 2.2.2. Data Transfer
```yaml
Free Tier:
  - Entrada: Sempre gratuita
  - Saída: 100 GB/mês gratuitos

Estimativa inicial:
  - Dentro do Free Tier

Custo Transfer: $0/mês (dentro do Free Tier)
```

## 3. Otimizações de Custo

### 3.1. Estratégias de Economia
```yaml
Cache:
  - Uso intensivo de cache no browser
  - Cache de templates no servidor
  - Minimizar requisições

Assets:
  - Compressão de imagens
  - Lazy loading
  - CDN gratuito da Vercel

Banco de Dados:
  - Queries otimizadas
  - Índices eficientes
  - Connection pooling
```

### 3.2. Monitoramento de Custos
```yaml
AWS Budget:
  - Alert: $15
  - Threshold: 75%
  - Notificação: Email

Métricas:
  - Uso de recursos
  - Padrões de tráfego
  - Storage growth
```

## 4. Escalabilidade Inicial

### 4.1. Limites do Free Tier
```yaml
Vercel:
  Serverless Functions:
    - Execuções: 100 por dia
    - Timeout: 10s
    - Memory: 1024 MB

AWS EC2:
  - Requests/segundo: ~100
  - Concurrent users: ~50
  - CPU Credits: monitor daily

RDS:
  - Conexões: ~20
  - IOPS: ~100
  - Storage: 20 GB
```

### 4.2. Pontos de Upgrade
```yaml
Triggers para upgrade:
  - >80% CPU sustained
  - >70% RAM sustained
  - >1000 usuários ativos
  - >5GB S3 storage
  - Latência >2s
```

## 5. Custos Totais Mensais

### 5.1. Custos Fixos
```yaml
AWS:
  - Route 53: $0.50
  - EC2: $0 (Free Tier)
  - RDS: $0 (Free Tier)
  - S3: $0 (Free Tier)
  - Data Transfer: $0 (Free Tier)

Vercel:
  - Hosting: $0 (Hobby)
  - Functions: $0 (Hobby)
  - Analytics: $0 (Basic)

Total Fixo Mensal: $0.50
```

### 5.2. Custos Variáveis
```yaml
Estimativa para 1000 usuários/mês:
  - Data Transfer: $0 (dentro do Free Tier)
  - S3 Requests: $0 (dentro do Free Tier)
  - Route 53 Queries: ~$0.05

Total Variável Estimado: $0.05
```

### 5.3. Custo Total Mensal Estimado
```yaml
Fixo: $0.50
Variável: $0.05
Buffer (20%): $0.11

Total Mensal: $0.66
```

## 6. Limites e Considerações

### 6.1. Limitações Técnicas
```yaml
Performance:
  - CPU limitada
  - RAM limitada
  - IOPS básico
  - Sem redundância

Escalabilidade:
  - Sem auto-scaling
  - Sem load balancing
  - Backup manual
  - Single region
```

### 6.2. Recomendações
```yaml
Monitoramento:
  - CloudWatch básico
  - Logs de aplicação
  - Métricas de uso
  - Alertas de custo

Otimização:
  - Cache agressivo
  - Compressão
  - Minificação
  - Lazy loading
```

## 7. Plano de Contingência

### 7.1. Backup
```yaml
Dados:
  - Backup diário RDS
  - S3 versioning
  - Código fonte no GitHub
  - Documentos importantes replicados

Frequência:
  - Database: Diário
  - S3: Contínuo
  - Configs: Por mudança
```

### 7.2. Emergências
```yaml
Plano B:
  - Instância reserve pronta
  - Snapshot RDS recente
  - DNS failover manual
  - Procedimentos documentados
```

Este setup inicial permite:
- MVP completamente funcional
- Suporte a ~1000 usuários iniciais
- Geração de documentos básica
- Custo mensal < $1
- Upgrade fácil quando necessário