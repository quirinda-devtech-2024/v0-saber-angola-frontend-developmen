"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BookOpen, Users, Download, Lightbulb } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Biblioteca de Modelos",
    description: "Mais de 50 modelos prontos: cartas, CVs, declarações e certificados.",
  },
  {
    icon: Users,
    title: "Editor Avançado",
    description: "Personalize facilmente os documentos com um editor moderno e intuitivo.",
  },
  {
    icon: Download,
    title: "Múltiplos Formatos",
    description: "Baixe em Word (.docx) ou PDF, prontos para enviar ou editar.",
  },
  {
    icon: Lightbulb,
    title: "Guias e Tutoriais",
    description: "Aprenda passo a passo com materiais educativos e suporte completo.",
  },
]

export function Features() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Funcionalidades Principais</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Tudo o que precisas para criar documentos de qualidade profissional — em minutos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 h-full">
              <CardHeader>
                <f.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
