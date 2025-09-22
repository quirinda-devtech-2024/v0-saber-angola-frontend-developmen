import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, FileText, Palette, TrendingUp, Search, Clock, Users, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const recentActivities = [
    { title: "Novo modelo de relatório acadêmico", type: "Modelo", time: "2 horas atrás" },
    { title: "Guia de metodologia de pesquisa", type: "Documento", time: "5 horas atrás" },
    { title: "Template de apresentação corporativa", type: "Studio", time: "1 dia atrás" },
    { title: "Manual de boas práticas", type: "Documento", time: "2 dias atrás" },
  ]

  const popularContent = [
    { title: "Modelos de Teses e Dissertações", category: "Modelos", views: "2.3k", rating: 4.8 },
    { title: "Guia Completo de APA 7ª Edição", category: "Documentos", views: "1.8k", rating: 4.9 },
    { title: "Templates de Apresentação", category: "Studio", views: "1.5k", rating: 4.7 },
    { title: "Metodologia de Investigação", category: "Documentos", views: "1.2k", rating: 4.6 },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Welcome Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Bem-vindo de volta ao SaberAngola</h1>
                <p className="text-lg text-muted-foreground">
                  Continue sua jornada de aprendizagem e descubra novos recursos
                </p>
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
            <h2 className="text-2xl font-bold mb-8">Acesso Rápido</h2>
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
              {/* Recent Activities */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">Atividade Recente</h2>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium">{activity.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {activity.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
