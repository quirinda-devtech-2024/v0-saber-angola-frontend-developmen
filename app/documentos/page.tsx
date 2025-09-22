import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye, BookOpen, FileText, Video, Headphones, Filter, Clock, User } from "lucide-react"

export default function DocumentosPage() {
  const documentTypes = [
    { id: "guias", name: "Guias", icon: BookOpen, count: 28 },
    { id: "manuais", name: "Manuais", icon: FileText, count: 35 },
    { id: "videos", name: "Vídeos", icon: Video, count: 42 },
    { id: "podcasts", name: "Podcasts", icon: Headphones, count: 18 },
  ]

  const documents = [
    {
      id: 1,
      title: "Guia Completo de Metodologia de Pesquisa",
      description: "Manual abrangente sobre métodos de pesquisa científica e acadêmica",
      type: "Guia",
      format: "PDF",
      pages: 156,
      author: "Dr. João Silva",
      publishDate: "2024-01-15",
      downloads: 2341,
      featured: true,
      tags: ["Metodologia", "Pesquisa", "Científico"],
    },
    {
      id: 2,
      title: "Manual de Normas ABNT 2024",
      description: "Guia atualizado com as últimas normas ABNT para trabalhos acadêmicos",
      type: "Manual",
      format: "PDF",
      pages: 89,
      author: "Profa. Maria Santos",
      publishDate: "2024-02-20",
      downloads: 1876,
      featured: true,
      tags: ["ABNT", "Normas", "Formatação"],
    },
    {
      id: 3,
      title: "Introdução à Estatística Aplicada",
      description: "Curso em vídeo sobre conceitos fundamentais de estatística",
      type: "Vídeo",
      format: "MP4",
      duration: "2h 45min",
      author: "Prof. Carlos Mendes",
      publishDate: "2024-01-30",
      downloads: 1654,
      featured: false,
      tags: ["Estatística", "Matemática", "Análise"],
    },
    {
      id: 4,
      title: "Podcast: Tendências em Educação",
      description: "Série de episódios sobre inovações no ensino superior",
      type: "Podcast",
      format: "MP3",
      duration: "45min",
      author: "Equipe SaberAngola",
      publishDate: "2024-02-10",
      downloads: 987,
      featured: true,
      tags: ["Educação", "Tendências", "Ensino"],
    },
    {
      id: 5,
      title: "Manual de Redação Acadêmica",
      description: "Técnicas e estratégias para escrita acadêmica eficaz",
      type: "Manual",
      format: "PDF",
      pages: 124,
      author: "Dra. Ana Costa",
      publishDate: "2024-01-05",
      downloads: 1432,
      featured: false,
      tags: ["Redação", "Escrita", "Acadêmico"],
    },
    {
      id: 6,
      title: "Guia de Ferramentas Digitais para Pesquisa",
      description: "Compilação de ferramentas úteis para pesquisadores",
      type: "Guia",
      format: "PDF",
      pages: 67,
      author: "Prof. Pedro Oliveira",
      publishDate: "2024-02-25",
      downloads: 1123,
      featured: true,
      tags: ["Ferramentas", "Digital", "Pesquisa"],
    },
  ]

  const featuredDocuments = documents.filter((doc) => doc.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Biblioteca de Documentos</h1>
                <p className="text-lg text-muted-foreground">
                  Acesse nossa coleção completa de recursos educacionais e materiais de referência
                </p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Pesquisar documentos..." className="pl-10 h-12" />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="guias">Guias</SelectItem>
                    <SelectItem value="manuais">Manuais</SelectItem>
                    <SelectItem value="videos">Vídeos</SelectItem>
                    <SelectItem value="podcasts">Podcasts</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <SelectValue placeholder="Formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os formatos</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="mp4">Vídeo</SelectItem>
                    <SelectItem value="mp3">Áudio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Document Types */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Tipos de Documentos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {documentTypes.map((type) => (
                <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center pb-2">
                    <type.icon className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription>{type.count} documentos</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Content */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <Tabs defaultValue="featured" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="featured">Em Destaque</TabsTrigger>
                <TabsTrigger value="all">Todos os Documentos</TabsTrigger>
              </TabsList>

              <TabsContent value="featured" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2">
                              <CardTitle className="text-lg">{doc.title}</CardTitle>
                              <Badge className="bg-primary/10 text-primary">Destaque</Badge>
                            </div>
                            <CardDescription>{doc.description}</CardDescription>
                            <div className="flex flex-wrap gap-1">
                              {doc.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>{doc.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(doc.publishDate).toLocaleDateString("pt-BR")}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4" />
                              <span>{doc.format}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Download className="h-4 w-4" />
                              <span>{doc.downloads} downloads</span>
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
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="all" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2">
                              <CardTitle className="text-lg">{doc.title}</CardTitle>
                              {doc.featured && <Badge className="bg-primary/10 text-primary">Destaque</Badge>}
                            </div>
                            <CardDescription>{doc.description}</CardDescription>
                            <div className="flex flex-wrap gap-1">
                              {doc.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>{doc.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(doc.publishDate).toLocaleDateString("pt-BR")}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4" />
                              <span>{doc.format}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Download className="h-4 w-4" />
                              <span>{doc.downloads} downloads</span>
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
