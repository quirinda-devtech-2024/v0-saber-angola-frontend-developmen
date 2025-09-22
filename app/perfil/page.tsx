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
import {
  User,
  Calendar,
  Save,
  Download,
  Trophy,
  BookOpen,
  FileText,
  Palette,
  Bell,
  Globe,
  Camera,
  Settings,
  Activity,
  Award,
  Clock,
} from "lucide-react"

export default function PerfilPage() {
  const userStats = {
    totalDownloads: 127,
    projectsCreated: 23,
    templatesUsed: 45,
    studyHours: 89,
    level: "Avançado",
    points: 2340,
    nextLevelPoints: 3000,
  }

  const recentActivity = [
    {
      id: 1,
      action: "Baixou template",
      item: "Modelo de Tese de Mestrado",
      time: "2 horas atrás",
      type: "download",
    },
    {
      id: 2,
      action: "Criou projeto",
      item: "Apresentação Corporativa",
      time: "1 dia atrás",
      type: "create",
    },
    {
      id: 3,
      action: "Completou guia",
      item: "Como usar o Studio",
      time: "3 dias atrás",
      type: "complete",
    },
    {
      id: 4,
      action: "Baixou documento",
      item: "Manual de Normas ABNT",
      time: "5 dias atrás",
      type: "download",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Primeiro Download",
      description: "Baixou seu primeiro template",
      icon: Download,
      earned: true,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Criador Ativo",
      description: "Criou 10 projetos no Studio",
      icon: Palette,
      earned: true,
      date: "2024-02-20",
    },
    {
      id: 3,
      title: "Estudante Dedicado",
      description: "Completou 50 horas de estudo",
      icon: BookOpen,
      earned: true,
      date: "2024-03-01",
    },
    {
      id: 4,
      title: "Explorador",
      description: "Visitou todas as seções da plataforma",
      icon: Globe,
      earned: false,
      date: null,
    },
    {
      id: 5,
      title: "Mestre dos Templates",
      description: "Usou 100 templates diferentes",
      icon: Trophy,
      earned: false,
      date: null,
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "download":
        return <Download className="h-4 w-4 text-blue-600" />
      case "create":
        return <Palette className="h-4 w-4 text-green-600" />
      case "complete":
        return <BookOpen className="h-4 w-4 text-purple-600" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Profile Header */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Foto do perfil" />
                  <AvatarFallback className="text-2xl">JS</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">João Silva</h1>
                  <p className="text-lg text-muted-foreground">Estudante de Engenharia • Luanda, Angola</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Membro desde Janeiro 2024</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>Nível {userStats.level}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userStats.totalDownloads}</div>
                    <div className="text-sm text-muted-foreground">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{userStats.projectsCreated}</div>
                    <div className="text-sm text-muted-foreground">Projetos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userStats.templatesUsed}</div>
                    <div className="text-sm text-muted-foreground">Templates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{userStats.studyHours}h</div>
                    <div className="text-sm text-muted-foreground">Estudo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
                <TabsTrigger value="activity">Atividade</TabsTrigger>
                <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Progress Card */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        <span>Progresso do Nível</span>
                      </CardTitle>
                      <CardDescription>
                        Você está no nível {userStats.level} com {userStats.points} pontos
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso para o próximo nível</span>
                          <span>
                            {userStats.points}/{userStats.nextLevelPoints}
                          </span>
                        </div>
                        <Progress value={(userStats.points / userStats.nextLevelPoints) * 100} className="h-3" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Faltam {userStats.nextLevelPoints - userStats.points} pontos para o próximo nível
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-secondary" />
                        <span>Estatísticas</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Download className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Downloads</span>
                          </div>
                          <span className="font-medium">{userStats.totalDownloads}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Palette className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Projetos</span>
                          </div>
                          <span className="font-medium">{userStats.projectsCreated}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-purple-600" />
                            <span className="text-sm">Templates</span>
                          </div>
                          <span className="font-medium">{userStats.templatesUsed}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-orange-600" />
                            <span className="text-sm">Horas de Estudo</span>
                          </div>
                          <span className="font-medium">{userStats.studyHours}h</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Atividade Recente</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <div className="font-medium">{activity.action}</div>
                            <div className="text-sm text-muted-foreground">{activity.item}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Informações Pessoais</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome</Label>
                          <Input id="firstName" defaultValue="João" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input id="lastName" defaultValue="Silva" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="joao.silva@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" defaultValue="+244 900 000 000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input id="location" defaultValue="Luanda, Angola" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <Textarea
                          id="bio"
                          placeholder="Conte um pouco sobre você..."
                          defaultValue="Estudante de Engenharia apaixonado por tecnologia e educação."
                        />
                      </div>
                      <Button className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Preferences */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Bell className="h-5 w-5" />
                          <span>Notificações</span>
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
                            <div className="text-sm font-medium">Novos templates</div>
                            <div className="text-xs text-muted-foreground">Ser notificado sobre novos templates</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-sm font-medium">Newsletter</div>
                            <div className="text-xs text-muted-foreground">Receber newsletter semanal</div>
                          </div>
                          <Switch />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Settings className="h-5 w-5" />
                          <span>Preferências</span>
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
                              <SelectItem value="fr">Français</SelectItem>
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

              <TabsContent value="activity" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Histórico de Atividades</span>
                    </CardTitle>
                    <CardDescription>Acompanhe todas as suas ações na plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity
                        .concat([
                          {
                            id: 5,
                            action: "Atualizou perfil",
                            item: "Informações pessoais",
                            time: "1 semana atrás",
                            type: "update",
                          },
                          {
                            id: 6,
                            action: "Baixou template",
                            item: "Relatório de Projeto",
                            time: "2 semanas atrás",
                            type: "download",
                          },
                        ])
                        .map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                            {getActivityIcon(activity.type)}
                            <div className="flex-1">
                              <div className="font-medium">{activity.action}</div>
                              <div className="text-sm text-muted-foreground">{activity.item}</div>
                            </div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>Conquistas</span>
                    </CardTitle>
                    <CardDescription>Suas conquistas e marcos na plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border ${
                            achievement.earned
                              ? "bg-primary/5 border-primary/20"
                              : "bg-muted/30 border-muted opacity-60"
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div
                              className={`p-2 rounded-lg ${
                                achievement.earned ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <achievement.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{achievement.title}</div>
                              <div className="text-sm text-muted-foreground mb-2">{achievement.description}</div>
                              {achievement.earned ? (
                                <Badge className="bg-primary/10 text-primary">
                                  Conquistado em {new Date(achievement.date!).toLocaleDateString("pt-BR")}
                                </Badge>
                              ) : (
                                <Badge variant="secondary">Não conquistado</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
