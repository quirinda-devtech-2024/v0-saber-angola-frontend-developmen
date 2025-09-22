import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Star, Zap, Bug, Wrench, Sparkles, CheckCircle, AlertCircle, Info, Bell } from "lucide-react"

export default function AtualizacoesPage() {
  const updates = [
    {
      id: 1,
      version: "2.4.0",
      title: "Novo Editor de Apresentações",
      date: "2024-03-15",
      type: "feature",
      priority: "major",
      description:
        "Lançamos um editor de apresentações completamente renovado com novos recursos de design e colaboração em tempo real.",
      changes: [
        "Interface redesenhada com foco na usabilidade",
        "Novos templates de apresentação profissionais",
        "Colaboração em tempo real com outros usuários",
        "Exportação em múltiplos formatos (PDF, PPTX, HTML)",
        "Biblioteca expandida de ícones e imagens",
      ],
      status: "released",
    },
    {
      id: 2,
      version: "2.3.2",
      title: "Correções de Bugs e Melhorias",
      date: "2024-03-08",
      type: "bugfix",
      priority: "minor",
      description: "Correções importantes e melhorias de performance baseadas no feedback dos usuários.",
      changes: [
        "Corrigido problema de sincronização de projetos",
        "Melhorada velocidade de carregamento de templates",
        "Resolvido erro de exportação em alguns navegadores",
        "Otimizada performance do editor de documentos",
        "Corrigidos problemas de responsividade mobile",
      ],
      status: "released",
    },
    {
      id: 3,
      version: "2.3.1",
      title: "Novos Templates Acadêmicos",
      date: "2024-02-28",
      type: "content",
      priority: "minor",
      description: "Adicionamos uma nova coleção de templates específicos para trabalhos acadêmicos angolanos.",
      changes: [
        "15 novos templates para teses e dissertações",
        "Modelos específicos para universidades angolanas",
        "Templates para artigos científicos em português",
        "Guias de formatação ABNT atualizados",
        "Exemplos de referências bibliográficas locais",
      ],
      status: "released",
    },
    {
      id: 4,
      version: "2.4.1",
      title: "Melhorias no Studio",
      date: "2024-03-22",
      type: "improvement",
      priority: "minor",
      description: "Aprimoramentos nas ferramentas do Studio baseados no feedback da comunidade.",
      changes: [
        "Nova ferramenta de edição de imagens integrada",
        "Melhorado sistema de versionamento de projetos",
        "Adicionados atalhos de teclado personalizáveis",
        "Interface mais intuitiva para iniciantes",
        "Suporte aprimorado para arquivos grandes",
      ],
      status: "coming-soon",
    },
  ]

  const roadmap = [
    {
      quarter: "Q2 2024",
      items: [
        {
          title: "Editor de Vídeo Integrado",
          description: "Ferramenta completa para criação de vídeos educacionais",
          status: "in-development",
        },
        {
          title: "Colaboração Avançada",
          description: "Comentários, revisões e aprovações em tempo real",
          status: "planned",
        },
        {
          title: "App Mobile",
          description: "Aplicativo nativo para iOS e Android",
          status: "planned",
        },
      ],
    },
    {
      quarter: "Q3 2024",
      items: [
        {
          title: "IA para Geração de Conteúdo",
          description: "Assistente inteligente para criação de textos e designs",
          status: "research",
        },
        {
          title: "Integração com LMS",
          description: "Conectividade com principais sistemas de gestão de aprendizagem",
          status: "planned",
        },
      ],
    },
    {
      quarter: "Q4 2024",
      items: [
        {
          title: "Marketplace de Templates",
          description: "Plataforma para compartilhamento de templates da comunidade",
          status: "research",
        },
        {
          title: "Analytics Avançado",
          description: "Métricas detalhadas de uso e engajamento",
          status: "research",
        },
      ],
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Star className="h-4 w-4" />
      case "bugfix":
        return <Bug className="h-4 w-4" />
      case "improvement":
        return <Zap className="h-4 w-4" />
      case "content":
        return <Sparkles className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "bugfix":
        return "bg-red-50 text-red-700 border-red-200"
      case "improvement":
        return "bg-green-50 text-green-700 border-green-200"
      case "content":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "released":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "coming-soon":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "in-development":
        return <Wrench className="h-4 w-4 text-blue-600" />
      case "planned":
        return <Calendar className="h-4 w-4 text-gray-600" />
      case "research":
        return <Info className="h-4 w-4 text-purple-600" />
      default:
        return <Info className="h-4 w-4" />
    }
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
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Atualizações e Novidades</h1>
                <p className="text-lg text-muted-foreground">
                  Acompanhe as últimas melhorias, novos recursos e correções da plataforma
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Bell className="mr-2 h-5 w-5" />
                  Receber Notificações
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  <Calendar className="mr-2 h-5 w-5" />
                  Ver Roadmap
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <Tabs defaultValue="updates" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="updates">Atualizações</TabsTrigger>
                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              </TabsList>

              <TabsContent value="updates" className="space-y-8">
                <div className="space-y-6">
                  {updates.map((update) => (
                    <Card key={update.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-3">
                              <Badge className={`${getTypeColor(update.type)} border`}>
                                {getTypeIcon(update.type)}
                                <span className="ml-1 capitalize">{update.type}</span>
                              </Badge>
                              <Badge variant="outline">v{update.version}</Badge>
                              {getStatusIcon(update.status)}
                            </div>
                            <CardTitle className="text-xl">{update.title}</CardTitle>
                            <CardDescription className="text-base">{update.description}</CardDescription>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(update.date).toLocaleDateString("pt-BR")}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">O que há de novo:</h4>
                            <ul className="space-y-1">
                              {update.changes.map((change, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{change}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {update.status === "coming-soon" && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                              <div className="flex items-center space-x-2">
                                <AlertCircle className="h-5 w-5 text-orange-600" />
                                <span className="font-medium text-orange-800">Em Breve</span>
                              </div>
                              <p className="text-sm text-orange-700 mt-1">
                                Esta atualização será lançada em breve. Fique atento às notificações!
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="roadmap" className="space-y-8">
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold">Roadmap de Desenvolvimento</h3>
                    <p className="text-muted-foreground">Veja o que estamos planejando para os próximos meses</p>
                  </div>

                  {roadmap.map((period, periodIndex) => (
                    <div key={periodIndex} className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-lg px-4 py-2">
                          {period.quarter}
                        </Badge>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-4">
                        {period.items.map((item, itemIndex) => (
                          <Card key={itemIndex} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                                {getStatusIcon(item.status)}
                              </div>
                              <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  item.status === "in-development"
                                    ? "bg-blue-100 text-blue-800"
                                    : item.status === "planned"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {item.status === "in-development"
                                  ? "Em Desenvolvimento"
                                  : item.status === "planned"
                                    ? "Planejado"
                                    : "Pesquisa"}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold">Tem uma sugestão?</h4>
                          <p className="text-muted-foreground">
                            Sua opinião é importante para nós. Compartilhe suas ideias e ajude a moldar o futuro do
                            SaberAngola.
                          </p>
                        </div>
                        <Button size="lg">
                          <Sparkles className="mr-2 h-5 w-5" />
                          Enviar Sugestão
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
