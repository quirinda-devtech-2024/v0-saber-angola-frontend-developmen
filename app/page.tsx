"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, Lightbulb, ArrowRight, CreditCard, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  const handleRegister = async () => {
    try {
      const response = await fetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redirect: "/home" }),
      })
      if (response.ok) {
        window.location.href = "/home"
      }
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  const handleCheckout = async (plan: string) => {
    try {
      const response = await fetch("/api/payments/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await response.json()
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
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
                Bem-vindo ao <span className="text-primary">SaberAngola</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                A plataforma educacional angolana que conecta conhecimento, pessoas e oportunidades de aprendizagem.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleRegister} className="text-lg px-8">
                <UserPlus className="mr-2 h-5 w-5" />
                Criar Conta Grátis
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
                <Link href="/guia">Guia do Usuário</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">O que oferecemos</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ferramentas e recursos para potencializar sua jornada de aprendizagem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Modelos</CardTitle>
                  <CardDescription>Templates e modelos prontos para acelerar seu trabalho</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>Biblioteca completa de documentos e recursos educacionais</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Studio</CardTitle>
                  <CardDescription>Ambiente criativo para desenvolver seus projetos</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Lightbulb className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle>Guias</CardTitle>
                  <CardDescription>Tutoriais e guias para maximizar seu aprendizado</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Planos e Preços</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Escolha o plano ideal para suas necessidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Plano Gratuito</CardTitle>
                  <CardDescription className="text-lg">Para começar sua jornada</CardDescription>
                  <div className="text-4xl font-bold text-primary mt-4">Grátis</div>
                </CardHeader>
                <div className="space-y-4 mt-6">
                  <p>✓ Acesso a modelos básicos</p>
                  <p>✓ 5 documentos por mês</p>
                  <p>✓ Guias e tutoriais</p>
                  <Button onClick={handleRegister} className="w-full mt-6">
                    Começar Grátis
                  </Button>
                </div>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">Plano Premium</CardTitle>
                  <CardDescription className="text-lg">Para usuários avançados</CardDescription>
                  <div className="text-4xl font-bold text-primary mt-4">
                    15.000 Kz<span className="text-lg font-normal">/mês</span>
                  </div>
                </CardHeader>
                <div className="space-y-4 mt-6">
                  <p>✓ Todos os modelos disponíveis</p>
                  <p>✓ Documentos ilimitados</p>
                  <p>✓ Studio avançado</p>
                  <p>✓ Suporte prioritário</p>
                  <Button onClick={() => handleCheckout("premium")} className="w-full mt-6">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Assinar Premium
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Pronto para começar sua jornada?</h2>
              <p className="text-xl text-muted-foreground">
                Junte-se à comunidade SaberAngola e transforme sua forma de aprender
              </p>
            </div>

            <Button size="lg" onClick={handleRegister} className="text-lg px-8">
              Entrar na Plataforma
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
