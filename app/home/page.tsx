"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, FileText, Palette, TrendingUp, Search, Clock, Users, Star, Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Document {
  id: string
  title: string
  type: string
  created_at: string
  updated_at: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  plan: string
  documents_count: number
}

export default function HomePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile from /api/users/me/
        const profileResponse = await fetch("/api/users/me/")
        if (profileResponse.ok) {
          const profile = await profileResponse.json()
          setUserProfile(profile)
        }

        // Fetch recent documents from /api/documents/
        const documentsResponse = await fetch("/api/documents/?limit=5&order_by=-updated_at")
        if (documentsResponse.ok) {
          const documents = await documentsResponse.json()
          setRecentDocuments(documents.results || documents)
        }
      } catch (error) {
        // Error handling for user data fetch
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const createNewDocument = async (templateId?: string) => {
    try {
      const response = await fetch("/api/documents/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Novo Documento",
          template_id: templateId,
        }),
      })

      if (response.ok) {
        const newDoc = await response.json()
        window.location.href = `/studio?doc=${newDoc.id}`
      }
    } catch (error) {
      // Error handling for document creation
    }
  }

  const popularContent = [
    { title: "Modelos de Teses e Dissertações", category: "Modelos", views: "2.3k", rating: 4.8 },
    { title: "Guia Completo de APA 7ª Edição", category: "Documentos", views: "1.8k", rating: 4.9 },
    { title: "Templates de Apresentação", category: "Studio", views: "1.5k", rating: 4.7 },
    { title: "Metodologia de Investigação", category: "Documentos", views: "1.2k", rating: 4.6 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Carregando dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Welcome Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">
                  Bem-vindo de volta{userProfile?.name ? `, ${userProfile.name}` : ""}
                </h1>
                <p className="text-lg text-muted-foreground">
                  Continue sua jornada de aprendizagem e descubra novos recursos
                </p>
                {userProfile && (
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>
                      Plano: <Badge variant="outline">{userProfile.plan}</Badge>
                    </span>
                    <span>{userProfile.documents_count} documentos criados</span>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Pesquisar modelos, documentos, guias..." className="pl-10 h-12 text-base" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Acesso Rápido</h2>
              <Button onClick={() => createNewDocument()} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Novo Documento</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>Modelos</CardTitle>
                  <CardDescription>
                    Acesse templates prontos para seus projetos acadêmicos e profissionais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/modelos">Explorar Modelos</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <FileText className="h-12 w-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>
                    Biblioteca completa de recursos educacionais e materiais de referência
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="secondary">
                    <Link href="/documentos">Ver Documentos</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <Palette className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>Studio</CardTitle>
                  <CardDescription>Ambiente criativo para desenvolver e personalizar seus projetos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/studio">Abrir Studio</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Documents */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">Documentos Recentes</h2>
                </div>
                <div className="space-y-4">
                  {recentDocuments.length > 0 ? (
                    recentDocuments.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="font-medium">{doc.title}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="text-xs">
                                  {doc.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(doc.updated_at).toLocaleDateString("pt-AO")}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/studio?doc=${doc.id}`}>Abrir</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Nenhum documento criado ainda</p>
                        <Button onClick={() => createNewDocument()} className="mt-4">
                          Criar Primeiro Documento
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Popular Content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold">Conteúdo Popular</h2>
                </div>
                <div className="space-y-4">
                  {popularContent.map((content, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">{content.title}</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {content.category}
                              </Badge>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                <span>{content.views}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{content.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
