# Frontend Utilitários e Helpers

## Implementação de Funções Utilitárias

1. Utils Gerais
```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('pt-AO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
  }).format(value)
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
```

2. Validações
```typescript
// lib/validations.ts
export const validations = {
  email: (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return 'Email é obrigatório'
    if (!regex.test(value)) return 'Email inválido'
    return null
  },

  password: (value: string) => {
    if (!value) return 'Senha é obrigatória'
    if (value.length < 6) return 'Senha deve ter no mínimo 6 caracteres'
    return null
  },

  required: (value: any, field: string) => {
    if (!value) return `${field} é obrigatório`
    return null
  },

  minLength: (value: string, min: number, field: string) => {
    if (value.length < min) return `${field} deve ter no mínimo ${min} caracteres`
    return null
  },

  maxLength: (value: string, max: number, field: string) => {
    if (value.length > max) return `${field} deve ter no máximo ${max} caracteres`
    return null
  }
}
```

3. Storage Helper
```typescript
// lib/storage.ts
export const storage = {
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  get(key: string) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}
```

4. HTTP Client Helper
```typescript
// lib/http-client.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

interface RequestConfig extends AxiosRequestConfig {
  retry?: number
  retryDelay?: number
}

export const httpClient = {
  async request<T>(config: RequestConfig): Promise<T> {
    const { retry = 3, retryDelay = 1000, ...axiosConfig } = config

    for (let i = 0; i < retry; i++) {
      try {
        const response = await axios(axiosConfig)
        return response.data
      } catch (error) {
        if (i === retry - 1) throw error
        if (error instanceof AxiosError && error.response?.status === 429) {
          await new Promise(resolve => setTimeout(resolve, retryDelay))
          continue
        }
        throw error
      }
    }

    throw new Error('Request failed')
  },

  get<T>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'GET', url })
  },

  post<T>(url: string, data?: any, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'POST', url, data })
  },

  put<T>(url: string, data?: any, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  },

  delete<T>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }
}
```

5. Error Handler
```typescript
// lib/error-handler.ts
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

export const errorHandler = {
  handle(error: unknown) {
    if (error instanceof AxiosError) {
      const data = error.response?.data as ApiError | undefined

      if (data?.message) {
        toast.error(data.message)
      } else if (data?.errors) {
        Object.values(data.errors)
          .flat()
          .forEach(message => toast.error(message))
      } else {
        toast.error('Ocorreu um erro. Tente novamente.')
      }
    } else if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Ocorreu um erro inesperado.')
    }

    console.error('Error:', error)
  },

  formatValidationErrors(errors: Record<string, string[]>) {
    return Object.entries(errors).reduce((acc, [field, messages]) => {
      acc[field] = messages[0]
      return acc
    }, {} as Record<string, string>)
  }
}
```