"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Mail, Phone, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  const contactOptions = [
    {
      icon: Mail,
      label: "Email",
      action: () => window.open("mailto:info@saberangola.ao"),
    },
    {
      icon: Phone,
      label: "Telefone",
      action: () => window.open("tel:+244900000000"),
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      action: () => window.open("https://wa.me/244900000000"),
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <Card className="mb-4 shadow-lg animate-in slide-in-from-bottom-2">
          <CardContent className="p-4 space-y-2">
            {contactOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start space-x-2 h-auto py-3"
                onClick={option.action}
              >
                <option.icon className="h-4 w-4" />
                <span>{option.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Main Button */}
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
