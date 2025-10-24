"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Download, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface FormField {
  name: string
  label: string
  type: "text" | "number" | "select" | "date" | "textarea"
  required?: boolean
  placeholder?: string
  options?: string[]
  helpText?: string
}

interface FormSchema {
  id: number
  title: string
  output_type: string
  fields: FormField[]
}

interface DynamicFormProps {
  schema: FormSchema
  onSubmit: (data: Record<string, any>) => Promise<void>
  onBack: () => void
}

export function DynamicForm({ schema, onSubmit, onBack }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    schema.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} é obrigatório`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      await onSubmit(formData)
      toast.success(`Documento "${schema.title}" processado com sucesso!`)
    } catch (error) {
      toast.error("Erro ao gerar documento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar aos modelos
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{schema.title}</CardTitle>
            <CardDescription>
              Preencha os campos abaixo para gerar seu documento em formato {schema.output_type.toUpperCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {schema.fields.map((field, index) => (
                <motion.div
                  key={field.name}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>

                  {field.type === "text" && (
                    <Input
                      id={field.name}
                      placeholder={field.placeholder || field.label}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={errors[field.name] ? "border-destructive" : ""}
                    />
                  )}

                  {field.type === "number" && (
                    <Input
                      id={field.name}
                      type="number"
                      placeholder={field.placeholder || field.label}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={errors[field.name] ? "border-destructive" : ""}
                    />
                  )}

                  {field.type === "textarea" && (
                    <Textarea
                      id={field.name}
                      placeholder={field.placeholder || field.label}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={errors[field.name] ? "border-destructive" : ""}
                      rows={4}
                    />
                  )}

                  {field.type === "date" && (
                    <Input
                      id={field.name}
                      type="date"
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={errors[field.name] ? "border-destructive" : ""}
                    />
                  )}

                  {field.type === "select" && field.options && (
                    <Select
                      value={formData[field.name] || ""}
                      onValueChange={(value) => handleChange(field.name, value)}
                    >
                      <SelectTrigger className={errors[field.name] ? "border-destructive" : ""}>
                        <SelectValue placeholder={field.placeholder || `Selecione ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
                  {errors[field.name] && <p className="text-xs text-destructive">{errors[field.name]}</p>}
                </motion.div>
              ))}

              <Button type="submit" disabled={loading} className="w-full h-12 text-base">
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Gerando documento...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Gerar Documento
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
