"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Lightbulb,
  ArrowRight,
  FileText,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Download,
  Shield,
  HelpCircle,
  ChevronDown,
  Play,
  Award,
  Zap,
  Globe,
  Lock,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleLogin = () => {
    window.location.href = "/auth/login"
  }

  const handleRegister = () => {
    window.location.href = "/auth/register"
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Announcement Bar */}
        <div className="bg-primary text-primary-foreground py-3 px-4 text-center">
          <div className="container max-w-6xl mx-auto">
            <p className="text-sm font-medium">
              🎓 Novo: Templates de Monografias e TFC disponíveis!
              <Link href="/modelos" className="underline ml-2 hover:no-underline">
                Explorar agora
              </Link>
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <div className="container max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    ✨ Plataforma #1 para Estudantes Angolanos
                  </Badge>

                  <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
                    Crie documentos
                    <span className="text-primary block">acadêmicos</span>
                    <span className="text-muted-foreground text-4xl md:text-5xl block mt-2">em minutos</span>
                  </h1>

                  <p className="text-xl text-muted-foreground text-balance max-w-lg leading-relaxed">
                    A plataforma completa para estudantes universitários criarem CVs, cartas formais, monografias e
                    certificados com qualidade profissional.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={handleRegister} className="text-lg px-8 py-6 shadow-lg">
                    Começar gratuitamente
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleLogin}
                    className="text-lg px-8 py-6 bg-transparent"
                  >
                    Fazer login
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
                      <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-background"></div>
                      <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">+2.500 estudantes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="bg-card border rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Documento gerado</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Concluído
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="font-medium">Carta de Motivação</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-primary/20 rounded-full">
                            <div className="h-2 bg-primary rounded-full w-full"></div>
                          </div>
                          <p className="text-sm text-muted-foreground">Geração completa em 2 minutos</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Word
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-card border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-semibold text-green-500">+150%</p>
                      <p className="text-xs text-muted-foreground">Taxa de aprovação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2.500+</div>
                <div className="text-sm text-muted-foreground">Estudantes ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15.000+</div>
                <div className="text-sm text-muted-foreground">Documentos criados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Taxa de satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2 min</div>
                <div className="text-sm text-muted-foreground">Tempo médio</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="text-sm px-4 py-2">
                Recursos
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Tudo que precisa para ter
                <span className="text-primary block">sucesso acadêmico</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Ferramentas profissionais para criar documentos que impressionam universidades e empregadores
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-3">Biblioteca de Modelos</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Mais de 50 templates profissionais: cartas formais, CVs, monografias, declarações e certificados
                    prontos para usar.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center p-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl mb-3">Studio Avançado</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Editor inteligente com preview em tempo real, formatação automática e sugestões de conteúdo
                    personalizadas.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-3">Qualidade Garantida</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Documentos revisados por especialistas, formatação profissional e compatibilidade total com padrões
                    angolanos.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-3">Rapidez Incomparável</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Crie documentos profissionais em minutos, não horas. Economize tempo para focar nos seus estudos.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center p-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl mb-3">Exportação Flexível</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Baixe seus documentos em PDF ou Word com formatação perfeita, prontos para impressão ou envio
                    digital.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-3">Suporte Completo</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Tutoriais detalhados, FAQ abrangente e suporte técnico para garantir seu sucesso na plataforma.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="text-sm px-4 py-2">
                Como funciona
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Simples como
                <span className="text-primary block">1, 2, 3</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Processo intuitivo que leva você do zero ao documento profissional em minutos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-2xl font-bold text-primary">1</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <BookOpen className="w-3 h-3 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Escolha o Modelo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Navegue pela nossa biblioteca de templates e selecione o que melhor se adequa às suas necessidades
                  acadêmicas ou profissionais.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-2xl font-bold text-secondary">2</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                    <FileText className="w-3 h-3 text-secondary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Preencha os Dados</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete o formulário inteligente com suas informações. Nossa IA sugere conteúdo relevante para
                  otimizar seu documento.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-2xl font-bold text-accent">3</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Download className="w-3 h-3 text-accent-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Baixe e Use</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seu documento está pronto! Baixe em PDF ou Word com formatação profissional e use onde precisar.
                </p>
              </div>

              {/* Connecting Lines */}
              <div className="hidden md:block absolute top-10 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-20"></div>
            </div>

            {/* Demo Video Placeholder */}
            <div className="mt-16 text-center">
              <div className="bg-muted/50 rounded-2xl p-12 max-w-4xl mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Veja o SaberAngola em ação</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Assista como é fácil criar um documento profissional em menos de 3 minutos
                  </p>
                  <Button size="lg" variant="outline" className="bg-background">
                    <Play className="w-4 h-4 mr-2" />
                    Assistir demonstração
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="text-sm px-4 py-2">
                Depoimentos
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                O que dizem nossos
                <span className="text-primary block">estudantes</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed mb-6">
                    "O SaberAngola me ajudou a criar uma carta de motivação perfeita para a minha candidatura. Fui
                    aceito na universidade dos meus sonhos!"
                  </CardDescription>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">MA</span>
                    </div>
                    <div>
                      <p className="font-semibold">Maria Antónia</p>
                      <p className="text-sm text-muted-foreground">Estudante de Direito</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed mb-6">
                    "Incrível como consegui criar um CV profissional em poucos minutos. A qualidade é impressionante e
                    consegui o meu primeiro emprego!"
                  </CardDescription>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">JS</span>
                    </div>
                    <div>
                      <p className="font-semibold">João Silva</p>
                      <p className="text-sm text-muted-foreground">Estudante de Engenharia</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed mb-6">
                    "A plataforma é muito intuitiva e os templates são de alta qualidade. Recomendo a todos os
                    estudantes universitários!"
                  </CardDescription>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">AF</span>
                    </div>
                    <div>
                      <p className="font-semibold">Ana Fernandes</p>
                      <p className="text-sm text-muted-foreground">Estudante de Medicina</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="text-sm px-4 py-2">
                Por que escolher
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Mais que uma ferramenta,
                <span className="text-primary block">seu parceiro de sucesso</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Qualidade Universitária</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Templates desenvolvidos por especialistas acadêmicos e revisados por professores universitários
                      angolanos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Tecnologia Avançada</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      IA integrada que sugere melhorias, corrige erros e otimiza seu conteúdo automaticamente.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Padrões Angolanos</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Formatação específica para universidades e empresas angolanas, seguindo normas locais.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Segurança Total</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Seus dados são protegidos com criptografia de nível bancário. Privacidade garantida.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-card border rounded-2xl p-8 shadow-xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Painel de Controle</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Smartphone className="w-3 h-3 mr-1" />
                        Mobile
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary/5 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">47</div>
                        <div className="text-xs text-muted-foreground">Documentos</div>
                      </div>
                      <div className="bg-secondary/5 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-secondary mb-1">12</div>
                        <div className="text-xs text-muted-foreground">Templates</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">CV Profissional</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Concluído
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-secondary" />
                          </div>
                          <span className="text-sm font-medium">Carta Motivação</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Em progresso
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="text-sm px-4 py-2">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Perguntas
                <span className="text-primary block">frequentes</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Tire suas dúvidas sobre o SaberAngola
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "O SaberAngola é gratuito?",
                  answer:
                    "Sim! Oferecemos um plano gratuito com acesso a templates básicos. Para recursos avançados como o Studio de edição e templates premium, temos planos acessíveis a partir de 2.500 Kz/mês.",
                },
                {
                  question: "Os documentos seguem padrões angolanos?",
                  answer:
                    "Absolutamente! Todos os nossos templates foram desenvolvidos seguindo as normas e padrões específicos das universidades e empresas angolanas, garantindo total compatibilidade.",
                },
                {
                  question: "Posso editar os documentos após criá-los?",
                  answer:
                    "Sim! Com o Studio Premium você pode editar, revisar e atualizar seus documentos quantas vezes quiser. Também mantemos um histórico de versões para sua segurança.",
                },
                {
                  question: "Meus dados estão seguros?",
                  answer:
                    "Sua privacidade é nossa prioridade. Utilizamos criptografia de nível bancário e nunca compartilhamos seus dados pessoais. Você tem controle total sobre suas informações.",
                },
                {
                  question: "Posso usar no celular?",
                  answer:
                    "Claro! O SaberAngola é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Crie documentos onde estiver.",
                },
                {
                  question: "Que tipos de documentos posso criar?",
                  answer:
                    "Oferecemos templates para CVs, cartas formais, cartas de motivação, monografias, TFC, declarações, certificados e muito mais. Nossa biblioteca está sempre crescendo.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardHeader className="p-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors rounded-lg"
                    >
                      <span className="font-semibold text-lg">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Não encontrou sua resposta?</p>
              <Button variant="outline" asChild>
                <Link href="/guia">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Ver guia completo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                🚀 Comece hoje mesmo
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold text-balance">
                Pronto para criar documentos
                <span className="text-primary block">profissionais?</span>
              </h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Junte-se a milhares de estudantes que já transformaram sua vida acadêmica com o SaberAngola
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleRegister} className="text-lg px-12 py-6 shadow-lg">
                Criar conta gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-12 py-6 bg-transparent">
                <Link href="/modelos">Explorar modelos</Link>
              </Button>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                ✅ Sem cartão de crédito • ✅ Configuração em 30 segundos • ✅ Suporte 24/7
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
