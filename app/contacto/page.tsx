"use client"

import { LandingHeader } from "@/components/layout/LandingHeader"
import { LandingFooter } from "@/components/layout/LandingFooter"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 pt-32 pb-20 px-6 bg-gradient-to-b from-primary/5 to-background">
        <section className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Estamos prontos para te ajudar. Envia-nos uma mensagem e responderemos o mais breve possível.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6 text-left">
            <div className="flex items-start space-x-3">
              <Mail className="text-primary h-6 w-6 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">suporte@saberangola.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="text-primary h-6 w-6 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p className="text-muted-foreground">+244 923 000 000</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="text-primary h-6 w-6 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Endereço</h3>
                <p className="text-muted-foreground">Luanda, Angola</p>
              </div>
            </div>
          </div>

          <form className="space-y-4 bg-muted/20 p-8 rounded-xl shadow-sm">
            <Input placeholder="Nome completo" />
            <Input type="email" placeholder="Email" />
            <Textarea placeholder="Sua mensagem..." className="min-h-[120px]" />
            <Button className="w-full">Enviar Mensagem</Button>
          </form>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
