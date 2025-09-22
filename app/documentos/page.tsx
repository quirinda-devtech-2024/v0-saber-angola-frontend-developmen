"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, FileText, Download, Eye, AlertCircle, CheckCircle, Clock, Crown, Lock } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function DocumentosPage() {
  const searchParams = useSearchParams()
  const modelId = searchParams.get("model")

  const [isPremium, setIsPremium] = useState(false) // Mock premium status
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStatus, setGenerationStatus] = useState<"idle" | "queue" | "processing" | "completed" | "error">(
    "idle",
  )
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Mock model data based on modelId
  const modelTemplates = {
    "1": {
      id: 1,
      name: "Monografia em Informática - Formato ABNT",
      type: "monografia",
      course: "Informática",
      category: "Trabalhos Escolares",
      subcategory: "Monografias",
      estimatedPages: "40-60 páginas",
      fields: [
        { id: "titulo", label: "Título da Monografia", type: "text", required: true, section: "metadados" },
        { id: "autor", label: "Nome do Autor", type: "text", required: true, section: "metadados" },
        {
          id: "curso",
          label: "Curso",
          type: "text",
          required: true,
          section: "metadados",
          defaultValue: "Informática",
        },
        { id: "orientador", label: "Professor Orientador", type: "text", required: true, section: "metadados" },
        { id: "instituicao", label: "Instituição de Ensino", type: "text", required: true, section: "metadados" },
        { id: "data", label: "Data de Apresentação", type: "date", required: true, section: "metadados" },
        {
          id: "resumo",
          label: "Resumo",
          type: "textarea",
          required: true,
          section: "conteudo",
          placeholder: "Resumo executivo da monografia (máx. 500 palavras)",
        },
        {
          id: "palavras_chave",
          label: "Palavras-chave",
          type: "text",
          required: true,
          section: "conteudo",
          placeholder: "Separadas por vírgula",
        },
        {
          id: "introducao",
          label: "Introdução",
          type: "textarea",
          required: true,
          section: "capitulos",
          placeholder: "Contextualização e objetivos do trabalho",
        },
        {
          id: "desenvolvimento",
          label: "Desenvolvimento",
          type: "textarea",
          required: true,
          section: "capitulos",
          placeholder: "Conteúdo principal da pesquisa",
        },
        {
          id: "conclusao",
          label: "Conclusão",
          type: "textarea",
          required: true,
          section: "capitulos",
          placeholder: "Considerações finais e resultados",
        },
        {
          id: "referencias",
          label: "Referências Bibliográficas",
          type: "textarea",
          required: true,
          section: "referencias",
          placeholder: "Lista de referências no formato ABNT",
        },
      ],
    },
    "3": {
      id: 3,
      name: "CV Estudante Universitário",
      type: "cv",
      category: "Outros Documentos",
      subcategory: "CVs",
      estimatedPages: "1-2 páginas",
      fields: [
        { id: "nome_completo", label: "Nome Completo", type: "text", required: true, section: "dados_pessoais" },
        { id: "email", label: "E-mail", type: "email", required: true, section: "dados_pessoais" },
        { id: "telefone", label: "Telefone", type: "tel", required: true, section: "dados_pessoais" },
        { id: "endereco", label: "Endereço", type: "text", required: true, section: "dados_pessoais" },
        {
          id: "objetivo",
          label: "Objetivo Profissional",
          type: "textarea",
          required: true,
          section: "objetivo",
          placeholder: "Descreva seu objetivo profissional",
        },
        {
          id: "formacao",
          label: "Formação Acadêmica",
          type: "textarea",
          required: true,
          section: "formacao",
          placeholder: "Curso atual, instituição, período",
        },
        {
          id: "experiencias",
          label: "Experiências (Estágios/Trabalhos)",
          type: "textarea",
          required: false,
          section: "experiencia",
          placeholder: "Descreva suas experiências profissionais",
        },
        {
          id: "habilidades",
          label: "Habilidades e Competências",
          type: "textarea",
          required: true,
          section: "habilidades",
          placeholder: "Liste suas principais habilidades",
        },
        {
          id: "idiomas",
          label: "Idiomas",
          type: "text",
          required: false,
          section: "complementares",
          placeholder: "Ex: Inglês (intermediário), Francês (básico)",
        },
        {
          id: "cursos_extras",
          label: "Cursos Complementares",
          type: "textarea",
          required: false,
          section: "complementares",
          placeholder: "Cursos, certificações, workshops",
        },
      ],
    },
  }

  const currentModel = modelTemplates[modelId as keyof typeof modelTemplates]

  useEffect(() => {
    // Initialize form with default values
    if (currentModel) {
      const initialData: Record<string, any> = {}
      currentModel.fields.forEach((field) => {
        if (field.defaultValue) {
          initialData[field.id] = field.defaultValue
        }
      })
      setFormData(initialData)
    }
  }, [currentModel])

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[fieldId]) {
      setValidationErrors((prev) => ({ ...prev, [fieldId]: "" }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (currentModel) {
      currentModel.fields.forEach((field) => {
        if (field.required && !formData[field.id]?.trim()) {
          errors[field.id] = `${field.label} é obrigatório`
        }
      })
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveDraft = async () => {
    // Mock API call to save draft
    console.log("[v0] Saving draft:", formData)
    // In real implementation: POST /api/documents/drafts
  }

  const handleGenerateDocument = async () => {
    if (!validateForm()) {
      return
    }

    if (!isPremium) {
      // Show premium upgrade modal
      alert("O Studio é um recurso premium. Assine o plano ou pague avulso para gerar seu documento.")
      return
    }

    setIsGenerating(true)
    setGenerationStatus("queue")
    setGenerationProgress(0)

    // Mock generation process
    const steps = ["queue", "processing", "completed"] as const
    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setGenerationStatus(steps[i])
      setGenerationProgress((i + 1) * 33)
    }

    setIsGenerating(false)
    // In real implementation: POST /api/documents/generate
    console.log("[v0] Document generated:", formData)
  }

  const groupFieldsBySection = () => {
    if (!currentModel) return {}

    const sections: Record<string, typeof currentModel.fields> = {}
    currentModel.fields.forEach((field) => {
      if (!sections[field.section]) {
        sections[field.section] = []
      }
      sections[field.section].push(field)
    })
    return sections
  }

  const getSectionTitle = (sectionKey: string) => {
    const titles: Record<string, string> = {
      metadados: "Informações Básicas",
      dados_pessoais: "Dados Pessoais",
      objetivo: "Objetivo Profissional",
      formacao: "Formação Acadêmica",
      experiencia: "Experiência Profissional",
      habilidades: "Habilidades",
      complementares: "Informações Complementares",
      conteudo: "Conteúdo Principal",
      capitulos: "Estrutura do Trabalho",
      referencias: "Referências e Fontes",
    }
    return titles[sectionKey] || sectionKey
  }

  if (!currentModel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-semibold">Modelo não encontrado</h2>
            <p className="text-muted-foreground">O modelo solicitado não existe ou foi removido.</p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Modelos
            </Button>
          </div>
        </main>
        <Footer />
        <FloatingContactButton />
      </div>
    )
  }

  const sections = groupFieldsBySection()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="py-8 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="space-y-4">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Modelos
              </Button>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Modelos</span>
                  <span>→</span>
                  <span>{currentModel.category}</span>
                  <span>→</span>
                  <span>{currentModel.subcategory}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{currentModel.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <Badge variant="secondary">{currentModel.course}</Badge>
                  <span>Estimativa: {currentModel.estimatedPages}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Preencher Dados do Documento</span>
                    </CardTitle>
                    <CardDescription>Preencha os campos obrigatórios (*) para gerar seu documento</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {Object.entries(sections).map(([sectionKey, fields]) => (
                      <div key={sectionKey} className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">{getSectionTitle(sectionKey)}</h3>
                          <Separator />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {fields.map((field) => (
                            <div key={field.id} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                              <Label htmlFor={field.id} className="flex items-center space-x-1">
                                <span>{field.label}</span>
                                {field.required && <span className="text-destructive">*</span>}
                              </Label>

                              {field.type === "textarea" ? (
                                <Textarea
                                  id={field.id}
                                  placeholder={field.placeholder}
                                  value={formData[field.id] || ""}
                                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                                  className={validationErrors[field.id] ? "border-destructive" : ""}
                                  rows={4}
                                />
                              ) : (
                                <Input
                                  id={field.id}
                                  type={field.type}
                                  placeholder={field.placeholder}
                                  value={formData[field.id] || ""}
                                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                                  className={validationErrors[field.id] ? "border-destructive" : ""}
                                />
                              )}

                              {validationErrors[field.id] && (
                                <p className="text-sm text-destructive mt-1">{validationErrors[field.id]}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Preview and Actions Section */}
              <div className="space-y-6">
                {/* Preview Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>Pré-visualização</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          {formData.titulo || formData.nome_completo || "Pré-visualização do documento"}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <strong>Tipo:</strong> {currentModel.name}
                      </p>
                      <p>
                        <strong>Páginas estimadas:</strong> {currentModel.estimatedPages}
                      </p>
                      {formData.autor && (
                        <p>
                          <strong>Autor:</strong> {formData.autor}
                        </p>
                      )}
                      {formData.nome_completo && (
                        <p>
                          <strong>Nome:</strong> {formData.nome_completo}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isPremium && (
                      <Alert>
                        <Crown className="h-4 w-4" />
                        <AlertDescription>
                          A geração de documentos é um recurso premium.
                          <Button variant="link" className="p-0 h-auto font-semibold">
                            Assine agora
                          </Button>{" "}
                          ou pague avulso.
                        </AlertDescription>
                      </Alert>
                    )}

                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 animate-spin" />
                          <span className="text-sm">
                            {generationStatus === "queue" && "Na fila de processamento..."}
                            {generationStatus === "processing" && "Gerando documento..."}
                            {generationStatus === "completed" && "Documento gerado!"}
                          </span>
                        </div>
                        <Progress value={generationProgress} className="w-full" />
                      </div>
                    )}

                    {generationStatus === "completed" && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>Seu documento foi gerado com sucesso!</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Button
                        onClick={handleSaveDraft}
                        variant="outline"
                        className="w-full bg-transparent"
                        disabled={isGenerating}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Rascunho
                      </Button>

                      <Button onClick={handleGenerateDocument} className="w-full" disabled={isGenerating || !isPremium}>
                        {!isPremium ? (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Gerar Documento (Premium)
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 mr-2" />
                            Gerar Documento
                          </>
                        )}
                      </Button>

                      {generationStatus === "completed" && (
                        <Button variant="outline" className="w-full bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Rascunhos são salvos automaticamente</p>
                      <p>• Documentos gerados ficam no seu histórico</p>
                      <p>• Edição no Studio disponível após geração</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
