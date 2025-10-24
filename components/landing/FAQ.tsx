"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react"

const faqData = [
  {
    q: "O SaberAngola é gratuito?",
    a: "Sim! Existe uma versão gratuita com modelos básicos e planos premium para recursos avançados.",
  },
  {
    q: "Posso editar os documentos depois de baixar?",
    a: "Sim! Os documentos vêm em Word (.docx) e PDF, prontos para edição e impressão.",
  },
  {
    q: "Os modelos seguem padrões angolanos?",
    a: "Sim, os formatos são adaptados às normas acadêmicas e profissionais de Angola.",
  },
  {
    q: "Como posso obter suporte?",
    a: "Oferecemos suporte via chat, e-mail e tutoriais detalhados na área de ajuda.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="max-w-5xl mx-auto text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Perguntas Frequentes</h2>
        <p className="text-lg text-muted-foreground">Respostas rápidas sobre o SaberAngola.</p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqData.map((item, i) => (
          <Card
            key={i}
            className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium">{item.q}</span>
              </div>
              {open === i ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{item.a}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
