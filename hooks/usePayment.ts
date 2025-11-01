"use client"

import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { api } from "@/lib/api"
import { supabase } from "@/lib/supabaseClient" // Declare the supabase variable

interface UserPlan {
  id: string
  planType: "free" | "monthly" | "pay_per_document"
  status: "active" | "expired" | "pending_payment"
  remainingDocuments: number
  expiresAt?: string
  nextBillingDate?: string
}

interface PaymentMethod {
  id: string
  type: string
  lastFour: string
}

export function usePayment() {
  const { user } = useAuth()
  const [plan, setPlan] = useState<UserPlan | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    fetchPlan()
    fetchPaymentMethods()
  }, [user])

  const fetchPlan = async () => {
    try {
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      if (!token) throw new Error("Não autenticado")

      const data = await api.get("plans/current", token)
      setPlan(transformPlan(data))
    } catch (err) {
      console.error("Erro ao carregar plano:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPaymentMethods = async () => {
    try {
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      if (!token) return

      const data = await api.get("payments/methods", token)
      setPaymentMethods(data)
    } catch (err) {
      console.error("Erro ao carregar métodos de pagamento:", err)
    }
  }

  const uploadProof = async (file: File) => {
    try {
      setError(null)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      if (!token) throw new Error("Não autenticado")

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/upload-proof`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) throw new Error("Falha ao enviar comprovativo")
      return response.json()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao enviar comprovativo"
      setError(message)
      throw err
    }
  }

  const transformPlan = (data: any): UserPlan => ({
    id: data.id,
    planType: data.plan_type,
    status: data.status,
    remainingDocuments: data.remaining_documents,
    expiresAt: data.expires_at,
    nextBillingDate: data.next_billing_date,
  })

  return {
    plan,
    paymentMethods,
    loading,
    error,
    fetchPlan,
    fetchPaymentMethods,
    uploadProof,
  }
}
