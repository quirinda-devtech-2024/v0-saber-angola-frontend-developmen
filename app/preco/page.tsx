"use client"

import { LandingHeader } from "@/components/layout/LandingHeader"
import { LandingFooter } from "@/components/layout/LandingFooter"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Gratuito",
    price: "0 Kz",
    description: "Ideal para estudantes iniciantes",
    features: ["5 modelos básicos", "Download em Word", "Suporte por e-mail"],
  },
  {
    name: "Premium Estudante",
    price: "2.500 Kz / mês",
    description: "Para quem quer mais opções e personalização",
    features: ["Acesso a todos os modelos", "Edição avançada", "Exportação em PDF", "Suporte prioritário"],
    highlight: true,
  },
  {
    name: "Institucional",
    price: "Sob consulta",
    description: "Para escolas e universidades",
    features: ["Painel de gestão", "Contas múltiplas", "Integração personalizada"],
  },
]

export default function PrecoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 pt-32 pb-20 px-6 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Planos e Preços</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Escolhe o plano que melhor se adapta às tuas necessidades e começa a criar agora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`text-center transition-all ${plan.highlight ? "border-primary shadow-lg scale-105" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">{plan.price}</div>
                <ul className="space-y-2 text-left max-w-xs mx-auto">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center space-x-2">
                      <Check className="text-primary h-4 w-4 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" onClick={() => (window.location.href = "/modelos")}>
                  Começar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
