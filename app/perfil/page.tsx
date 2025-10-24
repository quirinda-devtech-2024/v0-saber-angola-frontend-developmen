"use client"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  User,
  Calendar,
  Save,
  Download,
  Trophy,
  FileText,
  Bell,
  Globe,
  Camera,
  Settings,
  Activity,
  Award,
  Clock,
  CreditCard,
  Wallet,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Plus,
  Eye,
  Edit,
  Sparkles,
} from "lucide-react"

export default function PerfilPage() {
  const userData = {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "+244 900 000 000",
    location: "Luanda, Angola",
    bio: "Estudante de Engenharia apaixonado por tecnologia e educação.",
    memberSince: "2024-01-15",
    avatar: "/placeholder.svg?height=128&width=128",

    // Estatísticas principais
    stats: {
      balance: 7000, // Saldo em Kz
      documentsGenerated: 23,
      totalSpent: 45000, // Total gasto em Kz
      currentPlan: "Premium",
    },

    // Progresso e gamificação
    level: "Avançado",
    points: 2340,
    nextLevelPoints: 3000,
  }

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      limit: "1 geração/dia",
      features: ["Acesso básico a modelos simples", "Suporte por email", "Exportação em PDF"],
      popular: false,
    },
    {
      id: "essencial",
      name: "Essencial",
      price: 1000,
      limit: "10 documentos/mês",
      features: ["Modelos avançados", "Suporte prioritário", "Exportação Word + PDF", "Sem marca d'água"],
      popular: false,
    },
    {
      id: "profissional",
      name: "Profissional",
      price: 5000,
      limit: "50 documentos/mês",
      features: [
        "Todos os modelos",
        "Prioridade de geração",
        "Estatísticas avançadas",
        "Histórico completo",
        "Suporte 24/7",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: 25000,
      limit: "Ilimitado",
      features: [
        "Acesso total",
        "API de integração",
        "Modelos personalizados",
        "Gerente de conta dedicado",
        "Prioridade máxima",
      ],
      popular: false,
    },
  ]

  const paymentHistory = [
    { id: 1, date: "2025-10-12", amount: 25000, method: "Multicaixa Express", status: "Pago" },
    { id: 2, date: "2025-09-15", amount: 25000, method: "PayPal", status: "Pago" },
    { id: 3, date: "2025-08-10", amount: 5000, method: "Transferência Bancária", status: "Pago" },
    { id: 4, date: "2025-07-05", amount: 1000, method: "Multicaixa Express", status: "Pago" },
  ]

  const documentHistory = [
    {
      id: 1,
      type: "Monografia",
      title: "Análise de Sistemas de Informação",
      date: "2025-10-15",
      status: "Concluído",
      cost: 1000,
    },
    {
      id: 2,
      type: "Currículo",
      title: "CV Profissional - João Silva",
      date: "2025-10-12",
      status: "Concluído",
      cost: 500,
    },
    {
      id: 3,
      type: "Carta Formal",
      title: "Carta de Recomendação",
      date: "2025-10-08",
      status: "Concluído",
      cost: 300,
    },
    {
      id: 4,
      type: "Certificado",
      title: "Certificado de Participação",
      date: "2025-10-05",
      status: "Em processamento",
      cost: 200,
    },
    {
      id: 5,
      type: "Declaração",
      title: "Declaração de Rendimento",
      date: "2025-10-01",
      status: "Erro",
      cost: 0,
    },
  ]

  const paymentMethods = [
    { id: "multicaixa", name: "Multicaixa Express", icon: CreditCard, default: true },
    { id: "paypal", name: "PayPal", icon: Wallet, default: false },
    { id: "bank", name: "Transferência Bancária", icon: TrendingUp, default: false },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
      case "Concluído":
        return (
          <Badge className="bg-green-500/10 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      case "Em processamento":
        return (
          <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      case "Erro":
        return (
          <Badge className="bg-red-500/10 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-b">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Avatar e Info Básica */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="text-2xl font-bold">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-9 w-9 p-0 shadow-md">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{userData.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {userData.location}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Membro desde {new Date(userData.memberSince).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <Card className="bg-background/70 backdrop-blur-sm border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Saldo</p>
                        <p className="text-2xl font-bold text-primary">{userData.stats.balance.toLocaleString()} Kz</p>
                      </div>
                      <Wallet className="h-8 w-8 text-primary/40" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/70 backdrop-blur-sm border-secondary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Documentos</p>
                        <p className="text-2xl font-bold text-secondary">{userData.stats.documentsGenerated}</p>
                      </div>
                      <FileText className="h-8 w-8 text-secondary/40" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/70 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Plano</p>
                        <p className="text-xl font-bold">{userData.stats.currentPlan}</p>
                      </div>
                      <Sparkles className="h-8 w-8 text-yellow-500/40" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/70 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Gasto</p>
                        <p className="text-xl font-bold">{userData.stats.totalSpent.toLocaleString()} Kz</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500/40" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-6">
              <Button size="lg" className="shadow-lg" asChild>
                <a href="/modelos">
                  <Plus className="h-5 w-5 mr-2" />
                  Gerar Novo Documento
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container max-w-7xl mx-auto">
            <Tabs defaultValue="geral" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 max-w-3xl mx-auto h-auto p-1">
                <TabsTrigger value="geral" className="gap-2">
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Geral</span>
                </TabsTrigger>
                <TabsTrigger value="financeiro" className="gap-2">
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">Financeiro & Planos</span>
                </TabsTrigger>
                <TabsTrigger value="documentos" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Documentos</span>
                </TabsTrigger>
                <TabsTrigger value="configuracoes" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Configurações</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Progresso e Nível */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        Progresso e Pontuação
                      </CardTitle>
                      <CardDescription>
                        Nível atual: <strong>{userData.level}</strong> — {userData.points} pontos
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso para o próximo nível</span>
                          <span className="font-medium">
                            {Math.round((userData.points / userData.nextLevelPoints) * 100)}%
                          </span>
                        </div>
                        <Progress value={(userData.points / userData.nextLevelPoints) * 100} className="h-3" />
                        <p className="text-sm text-muted-foreground">
                          Faltam <strong>{userData.nextLevelPoints - userData.points}</strong> pontos para o próximo
                          nível
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button asChild>
                          <a href="/modelos">
                            <FileText className="h-4 w-4 mr-2" />
                            Gerar Documento
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href="#documentos">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Histórico
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resumo de Atividades */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-secondary" />
                        Resumo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { label: "Monografias", value: 8, color: "text-blue-600" },
                        { label: "Currículos", value: 5, color: "text-green-600" },
                        { label: "Certificados", value: 10, color: "text-purple-600" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className={`font-bold ${item.color}`}>{item.value}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Conquistas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      Conquistas Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "Primeiro Documento", icon: FileText, earned: true },
                        { title: "10 Documentos", icon: Trophy, earned: true },
                        { title: "Usuário Premium", icon: Sparkles, earned: true },
                      ].map((achievement) => (
                        <div
                          key={achievement.title}
                          className="p-4 rounded-lg border bg-primary/5 border-primary/20 flex items-center gap-3"
                        >
                          <div className="p-2 rounded-lg bg-primary/10">
                            <achievement.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{achievement.title}</p>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              Conquistado
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financeiro" className="space-y-6">
                {/* Plano Atual e Créditos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Plano Ativo */}
                  <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Plano Atual
                      </CardTitle>
                      <CardDescription>Seu plano ativo e benefícios</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-primary">Plano {userData.stats.currentPlan}</h3>
                          <p className="text-muted-foreground">25.000 Kz/mês</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Documentos ilimitados + priorização de geração
                          </p>
                        </div>
                        <Button variant="outline">Gerir Plano</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Créditos de Geração */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-secondary" />
                        Créditos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Saldo Atual</p>
                        <p className="text-3xl font-bold text-primary">{userData.stats.balance.toLocaleString()} Kz</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Custo por documento</span>
                          <span className="font-medium">1.000 Kz</span>
                        </div>
                        <Progress value={(userData.stats.balance / 10000) * 100} className="h-2" />
                      </div>
                      <Button size="sm" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Créditos
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Planos Disponíveis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Planos Disponíveis</CardTitle>
                    <CardDescription>Escolha o plano ideal para suas necessidades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {plans.map((plan) => (
                        <Card
                          key={plan.id}
                          className={`hover:shadow-lg transition-all ${plan.popular ? "border-primary shadow-md" : ""}`}
                        >
                          <CardHeader>
                            {plan.popular && <Badge className="w-fit mb-2">Mais Popular</Badge>}
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <CardDescription>
                              <span className="text-2xl font-bold text-foreground">
                                {plan.price === 0 ? "Grátis" : `${plan.price.toLocaleString()} Kz`}
                              </span>
                              {plan.price > 0 && <span className="text-sm">/mês</span>}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm font-medium">{plan.limit}</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button size="sm" className="w-full" variant={plan.popular ? "default" : "outline"}>
                              Escolher Plano
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Histórico de Pagamentos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Histórico de Pagamentos
                    </CardTitle>
                    <CardDescription>Suas transações recentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Método</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paymentHistory.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{new Date(payment.date).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell className="font-medium">{payment.amount.toLocaleString()} Kz</TableCell>
                            <TableCell className="text-muted-foreground">{payment.method}</TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Métodos de Pagamento */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Métodos de Pagamento
                    </CardTitle>
                    <CardDescription>Gerencie seus métodos de pagamento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {paymentMethods.map((method) => (
                        <Card key={method.id} className="hover:shadow-sm transition-shadow">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                              <method.icon className="h-5 w-5 text-primary" />
                              {method.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {method.default ? (
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                Método Principal
                              </Badge>
                            ) : (
                              <Button size="sm" variant="secondary" className="w-full">
                                Definir como principal
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Histórico de Documentos
                        </CardTitle>
                        <CardDescription>Todos os documentos gerados na plataforma</CardDescription>
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="monografia">Monografias</SelectItem>
                          <SelectItem value="cv">Currículos</SelectItem>
                          <SelectItem value="certificado">Certificados</SelectItem>
                          <SelectItem value="carta">Cartas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {documentHistory.map((doc) => (
                        <Card key={doc.id} className="hover:bg-muted/50 transition-colors">
                          <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{doc.title}</p>
                                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                                    <Badge variant="outline" className="text-xs">
                                      {doc.type}
                                    </Badge>
                                    <span>•</span>
                                    <span>{new Date(doc.date).toLocaleDateString("pt-BR")}</span>
                                    <span>•</span>
                                    <span>{doc.cost.toLocaleString()} Kz</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(doc.status)}
                                {doc.status === "Concluído" && (
                                  <>
                                    <Button size="sm" variant="outline">
                                      <Download className="h-4 w-4 mr-2" />
                                      Baixar
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="configuracoes" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Informações Pessoais */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Informações Pessoais
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome</Label>
                          <Input id="firstName" defaultValue={userData.name.split(" ")[0]} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input id="lastName" defaultValue={userData.name.split(" ").slice(1).join(" ")} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" defaultValue={userData.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input id="location" defaultValue={userData.location} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <Textarea
                          id="bio"
                          placeholder="Conte um pouco sobre você..."
                          defaultValue={userData.bio}
                          rows={3}
                        />
                      </div>
                      <Button className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Preferências */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bell className="h-5 w-5" />
                          Notificações
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-sm font-medium">Novas atualizações</div>
                            <div className="text-xs text-muted-foreground">
                              Receber notificações sobre novos recursos
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-sm font-medium">Novos modelos</div>
                            <div className="text-xs text-muted-foreground">Ser notificado sobre novos modelos</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-sm font-medium">Pagamentos</div>
                            <div className="text-xs text-muted-foreground">Alertas sobre pagamentos e faturas</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          Preferências
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Idioma</Label>
                          <Select defaultValue="pt">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pt">Português</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="theme">Tema</Label>
                          <Select defaultValue="system">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Claro</SelectItem>
                              <SelectItem value="dark">Escuro</SelectItem>
                              <SelectItem value="system">Sistema</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
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
