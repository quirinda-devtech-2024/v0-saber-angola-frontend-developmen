# 🔌 API_DESIGN.md — Endpoints do SaberAngola

## Base URL
\`\`\`
https://api.saberangola.com
\`\`\`

## Autenticação
Todos os endpoints (excepto `/auth/login`, `/auth/signup`) requerem:

\`\`\`
Authorization: Bearer {jwt_token}
\`\`\`

## Documentos

### POST /api/documentos/gerar
Inicia geração de um documento

**Request**:
\`\`\`json
{
  "modelo_id": "cv-profissional",
  "dados": {
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "+244923123456"
  }
}
\`\`\`

**Response**:
\`\`\`json
{
  "id": "task-123",
  "status": "processing",
  "created_at": "2025-11-01T10:00:00Z"
}
\`\`\`

### GET /api/documentos/{id}
Retorna status de um documento

**Response**:
\`\`\`json
{
  "id": "task-123",
  "status": "completed",
  "url": "https://r2.saberangola.com/docs/task-123.pdf",
  "created_at": "2025-11-01T10:00:00Z",
  "completed_at": "2025-11-01T10:05:30Z"
}
\`\`\`

## Pagamentos

### GET /api/planos
Lista planos disponíveis

**Response**:
\`\`\`json
{
  "planos": [
    {
      "id": "starter",
      "nome": "Starter",
      "preco": 5000,
      "moeda": "AOA",
      "documentos_mes": 5
    }
  ]
}
\`\`\`

### POST /api/pagamentos/criar
Cria intenção de pagamento

**Request**:
\`\`\`json
{
  "plano_id": "starter",
  "metodo": "stripe"
}
\`\`\`

## Upload

### POST /api/upload
Envia ficheiros para R2

**Form Data**:
\`\`\`
file: <binary>
\`\`\`

**Response**:
\`\`\`json
{
  "url": "https://r2.saberangola.com/uploads/file-123.pdf",
  "size": 2048576
}
\`\`\`

---

**Última atualização**: Novembro 2025
