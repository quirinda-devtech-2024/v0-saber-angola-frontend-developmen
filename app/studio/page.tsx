import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Palette,
  FileText,
  ImageIcon,
  Video,
  Layout,
  Brush,
  Share2,
  Download,
  Plus,
  Clock,
  Folder,
  Star,
} from "lucide-react"

export default function StudioPage() {
  const tools = [
    {
      id: "document-editor",
      name: "Editor de Documentos",
      description: "Crie e edite documentos com formatação profissional",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      status: "available",
    },
    {
      id: "presentation-maker",
      name: "Criador de Apresentações",
      description: "Desenvolva apresentações impactantes e modernas",
      icon: Layout,
      color: "text-green-600",
      bgColor: "bg-green-50",
      status: "available",
    },
    {
      id: "image-editor",
      name: "Editor de Imagens",
      description: "Edite e otimize imagens para seus projetos",
      icon: ImageIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      status: "coming-soon",
    },
    {
      id: "video-editor",
      name: "Editor de Vídeo",
      description: "Crie vídeos educacionais e tutoriais",
      icon: Video,
      color: "text-red-600",
      bgColor: "bg-red-50",
      status: "coming-soon",
    },
    {
      id: "design-tools",
      name: "Ferramentas de Design",
      description: "Suite completa de ferramentas de design gráfico",
      icon: Brush,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      status: "beta",
    },
    {
      id: "template-customizer",
      name: "Personalizador de Templates",
      description: "Customize templates existentes com suas preferências",
      icon: Palette,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      status: "available",
    },
  ]

  const recentProjects = [
    {
      id: 1,
      name: "Relatório de Pesquisa Q1",
      type: "Documento",
      lastModified: "2 horas atrás",
      progress: 85,
      thumbnail: "/placeholder.svg?height=100&width=150&text=Documento",
    },
    {
      id: 2,
      name: "Apresentação Corporativa",
      type: "Apresentação",
      lastModified: "1 dia atrás",
      progress: 60,
      thumbnail: "/placeholder.svg?height=100&width=150&text=Slides",
    },
    {
      id: 3,
      name: "Infográfico Educacional",
      type: "Design",
      lastModified: "3 dias atrás",
      progress: 40,
      thumbnail: "/placeholder.svg?height=100&width=150&text=Design",
    },
  ]

  const templates = [
    {
      id: 1,
      name: "Relatório Acadêmico",
      category: "Documento",
      thumbnail: "/placeholder.svg?height=120&width=180&text=Template",
      featured: true,
    },
    {
      id: 2,
      name: "Pitch Deck Startup",
      category: "Apresentação",
      thumbnail: "/placeholder.svg?height=120&width=180&text=Pitch",
      featured: true,
    },
    {
      id: 3,
      name: "Poster Científico",
      category: "Design",
      thumbnail: "/placeholder.svg?height=120&width=180&text=Poster",
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Studio Criativo</h1>
                <p className="text-lg text-muted-foreground">
                  Ambiente completo para criar, editar e personalizar seus projetos educacionais
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Plus className="mr-2 h-5 w-5" />
                  Novo Projeto
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  <Folder className="mr-2 h-5 w-5" />
                  Meus Projetos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Ferramentas Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${tool.bgColor}`}>
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          {tool.status === "coming-soon" && <Badge variant="secondary">Em Breve</Badge>}
                          {tool.status === "beta" && <Badge className="bg-secondary/20 text-secondary">Beta</Badge>}
                        </div>
                        <CardDescription className="mt-1">{tool.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      disabled={tool.status === "coming-soon"}
                      variant={tool.status === "available" ? "default" : "secondary"}
                    >
                      {tool.status === "coming-soon" ? "Em Breve" : "Abrir Ferramenta"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects and Templates */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <Tabs defaultValue="recent" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="recent">Projetos Recentes</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Seus Projetos</h3>
                    <Button variant="outline">
                      <Folder className="mr-2 h-4 w-4" />
                      Ver Todos
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentProjects.map((project) => (
                      <Card key={project.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                          <img
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{project.name}</CardTitle>
                              <CardDescription className="flex items-center space-x-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {project.type}
                                </Badge>
                                <span className="text-xs flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {project.lastModified}
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progresso</span>
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                Continuar
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Templates Populares</h3>
                    <Button variant="outline" asChild>
                      <a href="/modelos">Ver Todos os Templates</a>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <Card key={template.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                          <img
                            src={template.thumbnail || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{template.name}</CardTitle>
                              <CardDescription className="flex items-center space-x-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {template.category}
                                </Badge>
                                {template.featured && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              Usar Template
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
