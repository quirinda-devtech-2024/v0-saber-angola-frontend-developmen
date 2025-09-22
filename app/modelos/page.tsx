import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye, Star, Filter, BookOpen, FileText, Presentation, Calculator } from "lucide-react"

export default function ModelosPage() {
  const categories = [
    { id: "academico", name: "Acadêmico", icon: BookOpen, count: 45 },
    { id: "profissional", name: "Profissional", icon: FileText, count: 32 },
    { id: "apresentacao", name: "Apresentação", icon: Presentation, count: 28 },
    { id: "financeiro", name: "Financeiro", icon: Calculator, count: 15 },
  ]

  const models = [
    {
      id: 1,
      title: "Modelo de Tese de Mestrado",
      description: "Template completo para teses de mestrado com formatação APA",
      category: "Acadêmico",
      downloads: 1234,
      rating: 4.8,
      preview: "/academic-thesis-template.jpg",
      tags: ["APA", "Mestrado", "Tese"],
      featured: true,
    },
    {
      id: 2,
      title: "Relatório de Projeto",
      description: "Modelo profissional para relatórios de projetos empresariais",
      category: "Profissional",
      downloads: 987,
      rating: 4.6,
      preview: "/business-project-report.jpg",
      tags: ["Relatório", "Projeto", "Empresarial"],
      featured: false,
    },
    {
      id: 3,
      title: "Apresentação Corporativa",
      description: "Template moderno para apresentações empresariais",
      category: "Apresentação",
      downloads: 756,
      rating: 4.7,
      preview: "/corporate-presentation-template.png",
      tags: ["PowerPoint", "Corporativo", "Moderno"],
      featured: true,
    },
    {
      id: 4,
      title: "Plano de Negócios",
      description: "Modelo completo para elaboração de planos de negócios",
      category: "Profissional",
      downloads: 654,
      rating: 4.9,
      preview: "/business-plan-template.png",
      tags: ["Negócios", "Plano", "Estratégia"],
      featured: false,
    },
    {
      id: 5,
      title: "Orçamento Pessoal",
      description: "Planilha para controle de finanças pessoais",
      category: "Financeiro",
      downloads: 543,
      rating: 4.5,
      preview: "/personal-budget-spreadsheet.jpg",
      tags: ["Excel", "Finanças", "Orçamento"],
      featured: false,
    },
    {
      id: 6,
      title: "Artigo Científico",
      description: "Template para artigos científicos com normas ABNT",
      category: "Acadêmico",
      downloads: 432,
      rating: 4.8,
      preview: "/scientific-article-template.jpg",
      tags: ["ABNT", "Artigo", "Científico"],
      featured: true,
    },
  ]

  const featuredModels = models.filter((model) => model.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Modelos e Templates</h1>
                <p className="text-lg text-muted-foreground">
                  Acelere seu trabalho com nossos modelos profissionais prontos para usar
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
                    <SelectItem value="academico">Acadêmico</SelectItem>
                    <SelectItem value="profissional">Profissional</SelectItem>
                    <SelectItem value="apresentacao">Apresentação</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
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
                          <Button size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Baixar
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
                          <Button size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Baixar
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
