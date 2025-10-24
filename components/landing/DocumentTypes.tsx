"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, GraduationCap, Award, PenTool, Building2, Clipboard } from "lucide-react"

const docs = [
  {
    icon: FileText,
    title: "Cartas Formais",
    description: "Cartas de recomendação, pedido ou motivação com estrutura profissional.",
  },
  {
    icon: GraduationCap,
    title: "Currículos (CVs)",
    description: "Modelos modernos e otimizados para o mercado angolano e internacional.",
  },
  {
    icon: Award,
    title: "Certificados",
    description: "Certificados e declarações formais para instituições e eventos.",
  },
  {
    icon: Building2,
    title: "Contratos",
    description: "Modelos de contratos para serviços, aluguel ou trabalho formal.",
  },
  {
    icon: PenTool,
    title: "Monografias",
    description: "Formatos acadêmicos conforme normas ABNT e padrões angolanos.",
  },
  {
    icon: Clipboard,
    title: "Outros Documentos",
    description: "Declarações, autorizações e modelos diversos.",
  },
]

export function DocumentTypes() {
  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Tipos de Documentos</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Crie qualquer documento acadêmico ou profissional que precisa — simples, rápido e confiável.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {docs.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="transition-transform"
          >
            <Card className="text-center hover:shadow-lg p-8 h-full">
              <CardHeader>
                <d.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{d.title}</CardTitle>
                <CardDescription className="text-base">{d.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
