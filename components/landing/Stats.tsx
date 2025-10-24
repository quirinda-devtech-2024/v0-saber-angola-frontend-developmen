"use client"

import { motion } from "framer-motion"

export function Stats() {
  const stats = [
    { value: "5,000+", label: "Estudantes Registados" },
    { value: "15,000+", label: "Documentos Criados" },
    { value: "50+", label: "Modelos Disponíveis" },
    { value: "98%", label: "Satisfação dos Usuários" },
  ]

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="text-4xl font-bold">{s.value}</div>
            <div className="text-sm opacity-90 mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
