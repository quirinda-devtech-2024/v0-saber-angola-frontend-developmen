# Frontend API e Serviços

## Implementação dos Serviços de API

1. API Client Base
```typescript
// lib/api-client.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
```

2. Documentos Service
```typescript
// services/documents-service.ts
import { apiClient } from '@/lib/api-client'

export interface Document {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export const documentsService = {
  async list() {
    const response = await apiClient.get<Document[]>('/documents')
    return response.data
  },

  async get(id: string) {
    const response = await apiClient.get<Document>(`/documents/${id}`)
    return response.data
  },

  async create(data: Partial<Document>) {
    const response = await apiClient.post<Document>('/documents', data)
    return response.data
  },

  async update(id: string, data: Partial<Document>) {
    const response = await apiClient.put<Document>(`/documents/${id}`, data)
    return response.data
  },

  async delete(id: string) {
    await apiClient.delete(`/documents/${id}`)
  }
}
```

3. Upload Service
```typescript
// services/upload-service.ts
import { apiClient } from '@/lib/api-client'

export interface UploadResponse {
  url: string
  key: string
}

export const uploadService = {
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post<UploadResponse>('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async deleteFile(key: string) {
    await apiClient.delete(`/uploads/${key}`)
  },

  getFileUrl(key: string) {
    return `${process.env.NEXT_PUBLIC_S3_URL}/${key}`
  }
}
```

4. Pagamentos Service
```typescript
// services/payments-service.ts
import { apiClient } from '@/lib/api-client'

export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export const paymentsService = {
  async createPayment(amount: number) {
    const response = await apiClient.post<Payment>('/payments', { amount })
    return response.data
  },

  async getPayment(id: string) {
    const response = await apiClient.get<Payment>(`/payments/${id}`)
    return response.data
  },

  async listPayments() {
    const response = await apiClient.get<Payment[]>('/payments')
    return response.data
  },

  async checkStatus(id: string) {
    const response = await apiClient.get<Payment>(`/payments/${id}/status`)
    return response.data
  }
}
```

5. Notificações Service
```typescript
// services/notifications-service.ts
import { apiClient } from '@/lib/api-client'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

export const notificationsService = {
  async list() {
    const response = await apiClient.get<Notification[]>('/notifications')
    return response.data
  },

  async markAsRead(id: string) {
    await apiClient.put(`/notifications/${id}/read`)
  },

  async markAllAsRead() {
    await apiClient.put('/notifications/read-all')
  },

  async delete(id: string) {
    await apiClient.delete(`/notifications/${id}`)
  }
}
```