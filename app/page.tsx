"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Users,
  Award,
  Lightbulb,
  ArrowRight,
  UserPlus,
  FileText,
  GraduationCap,
  Clock,
  Shield,
  Download,
  Star,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = "/auth/login"
  }

  const handleRegister = () => {
    window.location.href = "/auth/register"
  }

  return (
    <div className="min-h-screen flex flex col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
          <div className="container max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <Image
                src="/images/logo-transparent.png"
                alt="SaberAngola"
                width={120}
                height={120}
                className="mx-auto"
              />
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                <span className="text-primary">SaberAngola</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Plataforma acadêmica digital para estudantes angolanos. Crie documentos profissionais, CVs, cartas
                formais e certificados com facilidade.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleLogin} className="text-lg px-8">
                Entrar
              </Button>
              <Button size="lg" variant="outline" onClick={handleRegister} className="text-lg px-8 bg-transparent">
                <UserPlus className="mr-2 h-5 w-5" />
                Criar Conta
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">5,000+</div>
                <div className="text-sm opacity-90">Estudantes Registados</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">15,000+</div>
                <div className="text-sm opacity-90">Documentos Criados</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">50+</div>
                <div className="text-sm opacity-90">Modelos Disponíveis</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">98%</div>
                <div className="text-sm opacity-90">Satisfação dos Usuários</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Destaques da Plataforma</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Exemplos de documentos que pode criar e novidades da plataforma
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Cartas Formais</CardTitle>
                  <CardDescription>
                    Cartas de pedido, recomendação e motivação para universidades e empresas
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle>CVs Profissionais</CardTitle>
                  <CardDescription>Currículos formatados e otimizados para o mercado angolano</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Certificados</CardTitle>
                  <CardDescription>Declarações e certificados acadêmicos personalizáveis</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Como Funciona</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Criar documentos profissionais nunca foi tão simples
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Escolha um Modelo</h3>
                <p className="text-muted-foreground">
                  Navegue pela nossa biblioteca de modelos e escolha o que melhor se adequa às suas necessidades
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <h3 className="text-xl font-semibold">Preencha os Dados</h3>
                <p className="text-muted-foreground">
                  Complete o formulário com as suas informações pessoais e acadêmicas
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Baixe o Documento</h3>
                <p className="text-muted-foreground">
                  Gere e baixe o seu documento em formato Word ou PDF, pronto para usar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Funcionalidades Principais</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tudo que precisa para criar documentos acadêmicos profissionais
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Modelos</CardTitle>
                  <CardDescription>
                    Biblioteca de modelos prontos: cartas, CVs, declarações e certificados
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle>Studio</CardTitle>
                  <CardDescription>Ferramenta prática para criar, editar e personalizar documentos</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Exportação</CardTitle>
                  <CardDescription>Exporte seus documentos em Word e PDF com qualidade profissional</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Lightbulb className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle>Guia</CardTitle>
                  <CardDescription>Tutoriais passo a passo e FAQ para usar cada recurso</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Por que Escolher o SaberAngola?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Vantagens que fazem a diferença na sua vida acadêmica
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <Clock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Economize Tempo</h3>
                  <p className="text-muted-foreground">
                    Crie documentos em minutos, não em horas. Foque no que realmente importa: seus estudos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Shield className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Qualidade Garantida</h3>
                  <p className="text-muted-foreground">
                    Modelos criados por especialistas, seguindo padrões acadêmicos e profissionais angolanos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Download className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Múltiplos Formatos</h3>
                  <p className="text-muted-foreground">
                    Baixe em Word para editar ou PDF para enviar. Compatível com todos os dispositivos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Globe className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Acesso em Qualquer Lugar</h3>
                  <p className="text-muted-foreground">
                    Plataforma online disponível 24/7. Acesse de qualquer dispositivo com internet.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Interface Intuitiva</h3>
                  <p className="text-muted-foreground">
                    Design simples e fácil de usar. Não precisa ser expert em tecnologia para criar documentos
                    profissionais.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <TrendingUp className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sempre Atualizado</h3>
                  <p className="text-muted-foreground">
                    Novos modelos e funcionalidades adicionados regularmente baseados no feedback dos usuários.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">O que Dizem os Estudantes</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Depoimentos reais de quem já usa o SaberAngola
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "O SaberAngola me ajudou muito na criação do meu CV. Consegui uma vaga de estágio graças ao documento
                  profissional que criei aqui!"
                </p>
                <div className="font-semibold">Maria Silva</div>
                <div className="text-sm text-muted-foreground">Estudante de Economia, UAN</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Excelente plataforma! Criei minha carta de motivação para mestrado em poucos minutos. Muito prático e
                  profissional."
                </p>
                <div className="font-semibold">João Mendes</div>
                <div className="text-sm text-muted-foreground">Estudante de Engenharia, ISPTEC</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Os modelos são muito bem estruturados e seguem os padrões que as universidades exigem. Recomendo a
                  todos os colegas!"
                </p>
                <div className="font-semibold">Ana Costa</div>
                <div className="text-sm text-muted-foreground">Estudante de Direito, UKB</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Perguntas Frequentes</h2>
              <p className="text-xl text-muted-foreground">Respostas às dúvidas mais comuns sobre o SaberAngola</p>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />O SaberAngola é gratuito?
                </h3>
                <p className="text-muted-foreground">
                  Sim! Oferecemos uma versão gratuita com acesso a modelos básicos. Também temos planos premium com
                  recursos avançados e mais modelos.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Posso editar os documentos depois de baixar?
                </h3>
                <p className="text-muted-foreground">
                  Sim! Os documentos são gerados em formato Word (.docx), permitindo edições posteriores. Também
                  oferecemos exportação em PDF.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Os modelos seguem padrões angolanos?
                </h3>
                <p className="text-muted-foreground">
                  Absolutamente! Todos os nossos modelos foram criados especificamente para o contexto acadêmico e
                  profissional angolano.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Como posso obter suporte?
                </h3>
                <p className="text-muted-foreground">
                  Oferecemos suporte através do nosso sistema de tickets, chat online e seção de guias com tutoriais
                  detalhados.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Comece a criar seus documentos hoje</h2>
              <p className="text-xl opacity-90">
                Junte-se aos milhares de estudantes que já usam o SaberAngola para criar documentos profissionais
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleRegister} variant="secondary" className="text-lg px-8">
                Criar Conta Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/guia">Ver Como Funciona</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
