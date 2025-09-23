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
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const handleLogin = () => {
    window.location.href = "/auth/login"
  }

  const handleRegister = () => {
    window.location.href = "/auth/register"
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqData = [
    {
      question: "O SaberAngola é gratuito?",
      answer:
        "Sim! Oferecemos uma versão gratuita com acesso a modelos básicos. Também temos planos premium com recursos avançados e mais modelos profissionais.",
    },
    {
      question: "Posso editar os documentos depois de baixar?",
      answer:
        "Sim! Os documentos são gerados em formato Word (.docx), permitindo edições posteriores completas. Também oferecemos exportação em PDF para envio direto.",
    },
    {
      question: "Os modelos seguem padrões angolanos?",
      answer:
        "Absolutamente! Todos os nossos modelos foram criados especificamente para o contexto acadêmico e profissional angolano, seguindo normas locais e internacionais.",
    },
    {
      question: "Como posso obter suporte?",
      answer:
        "Oferecemos suporte completo através do nosso sistema de tickets, chat online e seção de guias com tutoriais detalhados e FAQ abrangente.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
          <div className="container max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
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
              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
                A plataforma acadêmica digital que revoluciona a criação de documentos para estudantes angolanos. Crie
                CVs, cartas formais, monografias e certificados com qualidade profissional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={handleRegister} className="text-lg px-8 py-3">
                <UserPlus className="mr-2 h-5 w-5" />
                Começar Gratuitamente
              </Button>
              <Button size="lg" variant="outline" onClick={handleLogin} className="text-lg px-8 py-3 bg-transparent">
                Já tenho conta
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">5,000+</div>
                <div className="text-sm md:text-base opacity-90">Estudantes Registados</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">15,000+</div>
                <div className="text-sm md:text-base opacity-90">Documentos Criados</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">50+</div>
                <div className="text-sm md:text-base opacity-90">Modelos Disponíveis</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">98%</div>
                <div className="text-sm md:text-base opacity-90">Satisfação dos Usuários</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Como Funciona</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Criar documentos profissionais nunca foi tão simples. Apenas 3 passos!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Escolha um Modelo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Navegue pela nossa biblioteca de modelos profissionais e escolha o que melhor se adequa às suas
                    necessidades acadêmicas
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-secondary">2</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Preencha os Dados</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Complete o formulário intuitivo com as suas informações pessoais, acadêmicas e profissionais
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Baixe o Documento</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gere e baixe o seu documento em formato Word ou PDF, pronto para usar profissionalmente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Document Types Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Tipos de Documentos</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Crie qualquer documento acadêmico ou profissional que precisar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-6">
                  <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">Cartas Formais</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Cartas de pedido, recomendação, motivação para universidades e empresas com formatação profissional
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-6">
                  <GraduationCap className="h-16 w-16 text-secondary mx-auto mb-4" />
                  <CardTitle className="text-xl">CVs Profissionais</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Currículos modernos e otimizados para o mercado de trabalho angolano e internacional
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-6">
                  <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">Certificados</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Declarações, certificados acadêmicos e documentos oficiais personalizáveis e profissionais
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Funcionalidades Principais</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Tudo que precisa para criar documentos acadêmicos de qualidade profissional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Biblioteca de Modelos</CardTitle>
                  <CardDescription>
                    Mais de 50 modelos profissionais: cartas, CVs, declarações e certificados
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle>Editor Avançado</CardTitle>
                  <CardDescription>
                    Studio premium para criar, editar e personalizar documentos com precisão
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Múltiplos Formatos</CardTitle>
                  <CardDescription>
                    Exporte em Word (.docx) e PDF com qualidade profissional e formatação perfeita
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <Lightbulb className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle>Guias e Tutoriais</CardTitle>
                  <CardDescription>
                    Documentação completa, tutoriais passo a passo e FAQ para usar cada recurso
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Por que Escolher o SaberAngola?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Vantagens que fazem a diferença na sua vida acadêmica e profissional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <Clock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Economize Tempo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Crie documentos profissionais em minutos, não em horas. Foque no que realmente importa: seus estudos
                    e carreira.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Shield className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Qualidade Garantida</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Modelos criados por especialistas, seguindo rigorosamente padrões acadêmicos e profissionais
                    angolanos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Globe className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Acesso Universal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Plataforma online disponível 24/7. Acesse de qualquer dispositivo com internet, em qualquer lugar.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Zap className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Interface Intuitiva</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Design simples e fácil de usar. Não precisa ser expert em tecnologia para criar documentos
                    profissionais.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <TrendingUp className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Sempre Atualizado</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Novos modelos e funcionalidades adicionados regularmente baseados no feedback dos usuários.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Download className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Múltiplos Formatos</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Baixe em Word para editar ou PDF para enviar. Compatível com todos os dispositivos e sistemas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">O que Dizem os Estudantes</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Depoimentos reais de quem já transformou sua vida acadêmica com o SaberAngola
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "O SaberAngola me ajudou muito na criação do meu CV. Consegui uma vaga de estágio graças ao documento
                  profissional que criei aqui!"
                </p>
                <div>
                  <div className="font-semibold">Maria Silva</div>
                  <div className="text-sm text-muted-foreground">Estudante de Economia, UAN</div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Excelente plataforma! Criei minha carta de motivação para mestrado em poucos minutos. Muito prático e
                  profissional."
                </p>
                <div>
                  <div className="font-semibold">João Mendes</div>
                  <div className="text-sm text-muted-foreground">Estudante de Engenharia, ISPTEC</div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Os modelos são muito bem estruturados e seguem os padrões que as universidades exigem. Recomendo a
                  todos os colegas!"
                </p>
                <div>
                  <div className="font-semibold">Ana Costa</div>
                  <div className="text-sm text-muted-foreground">Estudante de Direito, UKB</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Perguntas Frequentes</h2>
              <p className="text-xl text-muted-foreground text-balance">
                Respostas às dúvidas mais comuns sobre o SaberAngola
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <div className="ml-4 flex-shrink-0">
                        {openFAQ === index ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed ml-8 pt-2 border-t border-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Comece a criar seus documentos hoje</h2>
              <p className="text-xl opacity-90 text-balance max-w-2xl mx-auto leading-relaxed">
                Junte-se aos milhares de estudantes que já usam o SaberAngola para criar documentos profissionais e
                impulsionar suas carreiras
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={handleRegister} variant="secondary" className="text-lg px-8 py-3">
                Criar Conta Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
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
