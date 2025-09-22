"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye, Star, Filter, FileText, Mail, User, Award } from "lucide-react"

export default function ModelosPage() {
  const categories = [
    { id: "cartas", name: "Cartas Formais", icon: Mail, count: 12 },
    { id: "cvs", name: "CVs", icon: User, count: 8 },
    { id: "declaracoes", name: "Declarações", icon: FileText, count: 15 },
    { id: "certificados", name: "Certificados", icon: Award, count: 10 },
  ]

  const models = [
    {
      id: 1,
      title: "Carta de Pedido",
      description: "Modelo para cartas de pedido formais para universidades e instituições",
      category: "Cartas Formais",
      downloads: 1234,
      rating: 4.8,
      preview: "/formal-letter-template.jpg",
      tags: ["Pedido", "Formal", "Universidade"],
      featured: true,
    },
    {
      id: 2,
      title: "Carta de Recomendação",
      description: "Template para cartas de recomendação acadêmica e profissional",
      category: "Cartas Formais",
      downloads: 987,
      rating: 4.6,
      preview: "/recommendation-letter-template.jpg",
      tags: ["Recomendação", "Acadêmica", "Profissional"],
      featured: true,
    },
    {
      id: 3,
      title: "Carta de Motivação",
      description: "Modelo para cartas de motivação para candidaturas universitárias",
      category: "Cartas Formais",
      downloads: 756,
      rating: 4.7,
      preview: "/motivation-letter-template.jpg",
      tags: ["Motivação", "Candidatura", "Universidade"],
      featured: true,
    },
    {
      id: 4,
      title: "CV Estudante",
      description: "Currículo otimizado para estudantes universitários",
      category: "CVs",
      downloads: 654,
      rating: 4.9,
      preview: "/student-cv-template.jpg",
      tags: ["Estudante", "Universidade", "Primeiro Emprego"],
      featured: true,
    },
    {
      id: 5,
      title: "CV Profissional",
      description: "Currículo para profissionais com experiência",
      category: "CVs",
      downloads: 543,
      rating: 4.5,
      preview: "/professional-cv-template.jpg",
      tags: ["Profissional", "Experiência", "Carreira"],
      featured: false,
    },
    {
      id: 6,
      title: "Declaração de Matrícula",
      description: "Modelo para declarações de matrícula universitária",
      category: "Declarações",
      downloads: 432,
      rating: 4.8,
      preview: "/enrollment-declaration-template.jpg",
      tags: ["Matrícula", "Universidade", "Oficial"],
      featured: false,
    },
    {
      id: 7,
      title: "Declaração de Conclusão",
      description: "Template para declarações de conclusão de curso",
      category: "Declarações",
      downloads: 389,
      rating: 4.7,
      preview: "/completion-declaration-template.jpg",
      tags: ["Conclusão", "Curso", "Certificação"],
      featured: false,
    },
    {
      id: 8,
      title: "Certificado de Participação",
      description: "Modelo para certificados de participação em eventos",
      category: "Certificados",
      downloads: 321,
      rating: 4.6,
      preview: "/participation-certificate-template.jpg",
      tags: ["Participação", "Evento", "Certificação"],
      featured: false,
    },
  ]

  const featuredModels = models.filter((model) => model.featured)

  const handleSelectModel = (modelId: number) => {
    // Redirect to Studio with selected model
    window.location.href = `/studio?model=${modelId}`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Biblioteca de Modelos</h1>
                <p className="text-lg text-muted-foreground">
                  Modelos prontos para cartas formais, CVs, declarações e certificados acadêmicos
                </p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Pesquisar modelos..." className="pl-10 h-12" />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="cartas">Cartas Formais</SelectItem>
                    <SelectItem value="cvs">CVs</SelectItem>
                    <SelectItem value="declaracoes">Declarações</SelectItem>
                    <SelectItem value="certificados">Certificados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Categorias</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center pb-2">
                    <category.icon className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.count} modelos</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Models Content */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <Tabs defaultValue="featured" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="featured">Em Destaque</TabsTrigger>
                <TabsTrigger value="all">Todos os Modelos</TabsTrigger>
              </TabsList>

              <TabsContent value="featured" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredModels.map((model) => (
                    <Card key={model.id} className="hover:shadow-lg transition-shadow group">
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={model.preview || "/placeholder.svg"}
                          alt={model.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{model.title}</CardTitle>
                            <CardDescription>{model.description}</CardDescription>
                          </div>
                          <Badge className="bg-primary/10 text-primary">Destaque</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {model.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{model.downloads}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{model.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => handleSelectModel(model.id)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Usar Modelo
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="all" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {models.map((model) => (
                    <Card key={model.id} className="hover:shadow-lg transition-shadow group">
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={model.preview || "/placeholder.svg"}
                          alt={model.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{model.title}</CardTitle>
                            <CardDescription>{model.description}</CardDescription>
                          </div>
                          {model.featured && <Badge className="bg-primary/10 text-primary">Destaque</Badge>}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {model.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{model.downloads}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{model.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => handleSelectModel(model.id)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Usar Modelo
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
