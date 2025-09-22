import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, BookOpen, Play, FileText, HelpCircle, Lightbulb, ArrowRight, Clock, User, Star } from "lucide-react"

export default function GuiaPage() {
  const guideCategories = [
    {
      id: "getting-started",
      name: "Primeiros Passos",
      description: "Aprenda o básico para começar a usar a plataforma",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      guides: 12,
    },
    {
      id: "models-templates",
      name: "Modelos e Templates",
      description: "Como usar e personalizar nossos modelos",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      guides: 8,
    },
    {
      id: "studio-tools",
      name: "Ferramentas do Studio",
      description: "Guias completos para todas as ferramentas criativas",
      icon: Lightbulb,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      guides: 15,
    },
    {
      id: "tips-tricks",
      name: "Dicas e Truques",
      description: "Maximize sua produtividade com essas dicas",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      guides: 6,
    },
  ]

  const popularGuides = [
    {
      id: 1,
      title: "Como criar sua primeira apresentação",
      description: "Passo a passo para criar apresentações profissionais",
      category: "Primeiros Passos",
      duration: "10 min",
      type: "Vídeo",
      difficulty: "Iniciante",
      views: 2341,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Personalizando templates de documentos",
      description: "Aprenda a adaptar nossos templates às suas necessidades",
      category: "Modelos e Templates",
      duration: "15 min",
      type: "Tutorial",
      difficulty: "Intermediário",
      views: 1876,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Ferramentas avançadas do Studio",
      description: "Explore recursos avançados para projetos complexos",
      category: "Ferramentas do Studio",
      duration: "25 min",
      type: "Vídeo",
      difficulty: "Avançado",
      views: 1432,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Otimizando seu fluxo de trabalho",
      description: "Dicas para trabalhar de forma mais eficiente",
      category: "Dicas e Truques",
      duration: "8 min",
      type: "Artigo",
      difficulty: "Intermediário",
      views: 1123,
      rating: 4.6,
    },
  ]

  const faqs = [
    {
      question: "Como faço para baixar um modelo?",
      answer:
        "Para baixar um modelo, navegue até a página de Modelos, encontre o template desejado e clique no botão 'Baixar'. Você precisará estar logado em sua conta para fazer o download.",
    },
    {
      question: "Posso personalizar os templates baixados?",
      answer:
        "Sim! Todos os nossos templates são totalmente personalizáveis. Você pode usar as ferramentas do Studio ou qualquer software compatível para fazer as modificações necessárias.",
    },
    {
      question: "Como acesso as ferramentas do Studio?",
      answer:
        "Acesse a página do Studio através do menu principal. Lá você encontrará todas as ferramentas disponíveis, incluindo editores de documento, apresentação e design.",
    },
    {
      question: "Existe limite para downloads?",
      answer:
        "Usuários gratuitos têm limite de 5 downloads por mês. Usuários premium têm downloads ilimitados, além de acesso a templates exclusivos.",
    },
    {
      question: "Como posso contribuir com conteúdo?",
      answer:
        "Valorizamos contribuições da comunidade! Entre em contato conosco através do botão de contato para saber como você pode compartilhar seus templates e conhecimentos.",
    },
    {
      question: "Os templates são compatíveis com que softwares?",
      answer:
        "Nossos templates são criados para serem compatíveis com os principais softwares do mercado, incluindo Microsoft Office, Google Workspace, LibreOffice e outros.",
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
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Guia do Usuário</h1>
                <p className="text-lg text-muted-foreground">
                  Tudo que você precisa saber para aproveitar ao máximo o SaberAngola
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Pesquisar guias, tutoriais, FAQ..." className="pl-10 h-12 text-base" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Categorias de Guias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guideCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className={`p-4 rounded-lg ${category.bgColor} mx-auto mb-4 w-fit`}>
                      <category.icon
                        className={`h-8 w-8 ${category.color} group-hover:scale-110 transition-transform`}
                      />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="mb-4">
                      {category.guides} guias
                    </Badge>
                    <Button className="w-full">
                      Explorar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <Tabs defaultValue="popular" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="popular">Guias Populares</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="popular" className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Guias Mais Acessados</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {popularGuides.map((guide) => (
                      <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <CardTitle className="text-lg">{guide.title}</CardTitle>
                              <CardDescription>{guide.description}</CardDescription>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {guide.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {guide.difficulty}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    guide.type === "Vídeo"
                                      ? "border-red-200 text-red-700"
                                      : "border-blue-200 text-blue-700"
                                  }`}
                                >
                                  {guide.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{guide.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{guide.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{guide.rating}</span>
                              </div>
                            </div>
                            <Button className="w-full">
                              {guide.type === "Vídeo" ? (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  Assistir Guia
                                </>
                              ) : (
                                <>
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  Ler Guia
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">Perguntas Frequentes</h3>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="space-y-2">
                        {faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left hover:no-underline">
                              <span className="font-medium">{faq.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pt-2 pb-4">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold">Não encontrou o que procurava?</h4>
                          <p className="text-muted-foreground">
                            Nossa equipe de suporte está sempre pronta para ajudar
                          </p>
                        </div>
                        <Button size="lg">
                          <HelpCircle className="mr-2 h-5 w-5" />
                          Entrar em Contato
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
