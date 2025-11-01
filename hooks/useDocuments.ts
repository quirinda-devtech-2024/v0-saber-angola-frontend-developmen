"use client"

import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { api } from "@/lib/api"
import { supabase } from "@/lib/supabaseClient"

interface Document {
  id: string
  title: string
  type: string
  status: "processing" | "ready" | "failed"
  createdAt: string
  downloadUrl?: string
  taskId?: string
}

export function useDocuments() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    fetchDocuments()

    // Subscribe to real-time updates
    const subscription = supabase
      .from("documents")
      .on("*", (payload) => {
        if (payload.new.user_id === user.id) {
          setDocuments((prev) => [...prev.filter((d) => d.id !== payload.new.id), transformDocument(payload.new)])
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      if (!token) throw new Error("Não autenticado")

      const data = await api.get("documents", token)
      setDocuments(data.map(transformDocument))
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar documentos"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const generateDocument = async (modelId: string, formData: any) => {
    try {
      setError(null)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      if (!token) throw new Error("Não autenticado")

      const response = await api.post("documents/generate", { modelId, formData }, token)

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao gerar documento"
      setError(message)
      throw err
    }
  }

  const checkDocumentStatus = async (taskId: string) => {
    try {
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      if (!token) throw new Error("Não autenticado")

      return await api.get(`documents/status/${taskId}`, token)
    } catch (err) {
      console.error("Erro ao verificar status:", err)
      throw err
    }
  }

  const transformDocument = (doc: any): Document => ({
    id: doc.id,
    title: doc.title,
    type: doc.document_type,
    status: doc.status,
    createdAt: doc.created_at,
    downloadUrl: doc.download_url,
    taskId: doc.task_id,
  })

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    generateDocument,
    checkDocumentStatus,
  }
}
