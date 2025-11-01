"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    // Ouvir mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      setError(null)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao registrar"
      setError(message)
      throw err
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao fazer login"
      setError(message)
      throw err
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      await supabase.auth.signOut()
      setUser(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao fazer logout"
      setError(message)
      throw err
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao redefinir senha"
      setError(message)
      throw err
    }
  }

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}
