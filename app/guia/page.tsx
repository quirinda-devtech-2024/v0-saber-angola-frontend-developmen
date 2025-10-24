"use client"

import { LandingHeader } from "@/components/layout/LandingHeader"
import { LandingFooter } from "@/components/layout/LandingFooter"
import { BookOpen, FileText, Download, User } from "lucide-react"

const steps = [
  { icon: User, title: "Cria uma conta", desc: "Clica em 'Entrar' ou 'Começar Gratuitamente' para acessar o sistema." },
  { icon: FileText, title: "Escolhe um modelo", desc: "Seleciona o tipo de documento que desejas criar." },
  { icon: BookOpen, title: "Preenche o formulário", desc: "Insere as tuas informações de forma simples e rápida." },
  { icon: Download, title: "Baixa o documento", desc: "Exporta em Word ou PDF, pronto para uso." },
]

export default function GuiaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 pt-32 pb-20 px-6">
        <section className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Guia Rápido</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aprende a usar o SaberAngola em 4 passos simples.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="text-center space-y-4 p-6 bg-muted/30 rounded-xl hover:shadow-md transition-all">
              <s.icon className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
