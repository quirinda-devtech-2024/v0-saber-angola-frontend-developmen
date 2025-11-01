"use client"

import { ProtectedRoute } from "@/lib/authGuard"
import { useAuth } from "@/hooks/useAuth"
import { useDocuments } from "@/hooks/useDocuments"
import { usePayment } from "@/hooks/usePayment"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const { documents } = useDocuments()
  const { plan } = usePayment()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button variant="outline" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Seu Plano</h3>
              <p className="text-2xl font-bold mt-2 capitalize">{plan?.planType || "Carregando..."}</p>
              <p className="text-xs text-muted-foreground mt-2">{plan?.remainingDocuments} documentos disponíveis</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Documentos Gerados</h3>
              <p className="text-2xl font-bold mt-2">{documents.length}</p>
              <Link href="/dashboard/documentos/historico" className="text-xs text-primary hover:underline mt-2 block">
                Ver histórico
              </Link>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Status da Assinatura</h3>
              <p
                className={`text-2xl font-bold mt-2 ${plan?.status === "active" ? "text-green-600" : "text-yellow-600"}`}
              >
                {plan?.status === "active" ? "Ativa" : "Pendente"}
              </p>
            </Card>
          </div>

          {/* Ações rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Criar Novo Documento</h2>
              <p className="text-muted-foreground mb-4">Comece gerando um novo documento acadêmico.</p>
              <Link href="/dashboard/documentos/novo">
                <Button>Novo Documento</Button>
              </Link>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Gerenciar Plano</h2>
              <p className="text-muted-foreground mb-4">Veja seus planos e faça upgrade se necessário.</p>
              <Link href="/dashboard/planos">
                <Button variant="outline">Gerenciar Plano</Button>
              </Link>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
