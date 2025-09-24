# Frontend Autenticação

## Implementação da Autenticação

1. Auth Store
```typescript
// stores/auth-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: any | null
  setToken: (token: string | null) => void
  setUser: (user: any | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

2. Auth Service
```typescript
// services/auth-service.ts
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData extends LoginData {
  name: string
}

export const authService = {
  async login(data: LoginData) {
    const response = await axios.post(`${API_URL}/auth/login`, data)
    return response.data
  },

  async register(data: RegisterData) {
    const response = await axios.post(`${API_URL}/auth/register`, data)
    return response.data
  },

  async me(token: string) {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
}
```

3. Auth Hook
```typescript
// hooks/use-auth.ts
import { useAuthStore } from '@/stores/auth-store'
import { authService } from '@/services/auth-service'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const { token, user, setToken, setUser, logout } = useAuthStore()

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await authService.login({ email, password })
      setToken(token)
      setUser(user)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const { token, user } = await authService.register({ name, email, password })
      setToken(token)
      setUser(user)
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return {
    token,
    user,
    login,
    register,
    logout: handleLogout,
    isAuthenticated: !!token,
  }
}
```

4. Auth Provider
```typescript
// providers/auth-provider.tsx
import { createContext, useContext, useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { authService } from '@/services/auth-service'

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setUser } = useAuthStore()

  useEffect(() => {
    if (token) {
      authService.me(token)
        .then(user => setUser(user))
        .catch(() => useAuthStore.getState().logout())
    }
  }, [token])

  return (
    <AuthContext.Provider value={useAuth()}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

5. Auth Middleware
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')

  if (!token && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (token && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```