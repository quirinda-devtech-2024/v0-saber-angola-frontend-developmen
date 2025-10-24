"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maria Silva",
    role: "Estudante de Economia, UAN",
    text: "O SaberAngola me ajudou a criar meu CV e consegui uma vaga de estágio rapidamente!",
  },
  {
    name: "João Mendes",
    role: "Estudante de Engenharia, ISPTEC",
    text: "Criei minha carta de motivação em poucos minutos. Simplesmente incrível!",
  },
  {
    name: "Ana Costa",
    role: "Estudante de Direito, UKB",
    text: "Os modelos seguem exatamente as normas das universidades. Recomendo muito!",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">O que Dizem os Estudantes</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Depoimentos reais de quem já transformou sua vida acadêmica com o SaberAngola.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300 text-left h-full">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{t.text}</p>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
