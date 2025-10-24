"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
      <motion.div
        className="max-w-3xl mx-auto space-y-6 relative z-10 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Comece a criar seus documentos com o SaberAngola
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
          Milhares de estudantes já estão economizando tempo e melhorando seus resultados com a nossa plataforma.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="px-8 py-3 text-lg"
          onClick={() => (window.location.href = "/modelos")}
        >
          Criar Documento Agora
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  )
}
