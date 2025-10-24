"use client"

import { LandingHeader } from "@/components/layout/LandingHeader"
import { LandingFooter } from "@/components/layout/LandingFooter"
import Image from "next/image"
import { Award, BookOpen, Users, Zap } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-primary/10 to-background text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre o SaberAngola</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            O SaberAngola é uma plataforma digital criada para simplificar a vida de estudantes e profissionais
            angolanos. Nosso objetivo é democratizar o acesso a modelos de documentos acadêmicos e profissionais com
            qualidade e praticidade.
          </p>
        </section>

        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square bg-muted rounded-2xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/logo-transparent.png"
                alt="Sobre SaberAngola"
                width={300}
                height={300}
                className="opacity-50"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Nosso Propósito</h2>
            <p className="text-muted-foreground leading-relaxed">
              Em um país onde o acesso a ferramentas digitais ainda é limitado, queremos capacitar estudantes e
              instituições com tecnologia acessível, eficiente e adaptada à realidade angolana. O SaberAngola é mais que
              uma plataforma: é um movimento de transformação educacional.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="text-primary h-6 w-6 flex-shrink-0" />
                <span>Foco na Educação</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="text-secondary h-6 w-6 flex-shrink-0" />
                <span>Qualidade Profissional</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="text-primary h-6 w-6 flex-shrink-0" />
                <span>Feito para Estudantes</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="text-secondary h-6 w-6 flex-shrink-0" />
                <span>Rápido e Intuitivo</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
