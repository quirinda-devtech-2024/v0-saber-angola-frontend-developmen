"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-32 pb-20 px-6 text-center">
      <motion.div
        className="max-w-5xl mx-auto space-y-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image src="/images/logo-transparent.png" alt="SaberAngola" width={120} height={120} className="mx-auto" />
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
          Crie <span className="text-primary">documentos profissionais</span> em minutos
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Monografias, CVs, cartas e certificados criados com facilidade. Desenvolvido para estudantes angolanos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" onClick={() => (window.location.href = "/modelos")}>
            Começar Gratuitamente
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/guia">Ver Como Funciona</Link>
          </Button>
        </div>
      </motion.div>

      <div className="mt-16 max-w-4xl mx-auto">
        <div className="relative aspect-video bg-muted rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Preview da Plataforma</p>
          </div>
        </div>
      </div>
    </section>
  )
}
