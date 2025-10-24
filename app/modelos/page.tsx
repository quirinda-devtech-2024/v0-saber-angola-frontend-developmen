"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { FileText } from "lucide-react"
import { DynamicForm } from "@/components/modelos/dynamic-form"
import type { ModelSchema } from "@/types/models"
import { toast, Toaster } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { getSchemaById, getAllSchemasByCategory } from "@/services/formSchemas"

export default function ModelosPage() {
  const [currentView, setCurrentView] = useState<"categories" | "models" | "form">("categories")
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [models, setModels] = useState<ModelSchema[]>([])
  const [selectedModel, setSelectedModel] = useState<ModelSchema | null>(null)
  const [loading, setLoading] = useState(false)

  interface Category {
    id: string
    name: string
    description: string
  }

  const categories: Category[] = [
    {
      id: "trabalhos-academicos",
      name: "Trabalhos Acadêmicos",
      description: "Monografias, relatórios, TFCs",
    },
    {
      id: "declaracoes",
      name: "Declarações",
      description: "Documentos formais e comprovações",
    },
    {
      id: "contratos",
      name: "Contratos",
      description: "Modelos de contratos profissionais",
    },
    {
      id: "curriculos",
      name: "Currículos e Cartas",
      description: "CVs e cartas personalizadas",
    },
    {
      id: "outros-documentos",
      name: "Outros Documentos",
      description: "Cartas formais, certificados, etc.",
    },
  ]

  useEffect(() => {
    if (currentView === "models" && currentCategory) {
      loadModels()
    }
  }, [currentCategory])

  const loadModels = async () => {
    if (!currentCategory) return

    setLoading(true)
    try {
      const schemas = getAllSchemasByCategory(currentCategory)
      setModels(schemas)
    } catch (error) {
      toast.error("Erro ao carregar modelos")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (catId: string) => {
    setCurrentCategory(catId)
    setCurrentView("models")
  }

  const handleModelSelect = (modelId: number) => {
    if (!currentCategory) return
    const schema = getSchemaById(currentCategory, modelId)
    if (schema) {
      setSelectedModel(schema)
      setCurrentView("form")
    } else {
      toast.error("Modelo não encontrado")
    }
  }

  const handleFormSubmit = async (formData: Record<string, any>) => {
    console.log("📄 Dados do formulário:", formData)
    toast.success("Documento gerado com sucesso!")
    // TODO: Replace with actual API call when backend is ready
    // const response = await documentsService.submitForm(selectedModel.id, formData)
    // window.open(response.download_url, "_blank")
  }

  const handleBack = () => {
    if (currentView === "form") {
      setCurrentView("models")
      setSelectedModel(null)
    } else if (currentView === "models") {
      setCurrentView("categories")
      setCurrentCategory(null)
      setModels([])
    }
  }

  const getCurrentCategory = () => {
    return categories.find((cat) => cat.id === currentCategory)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster position="top-center" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/20">
          <div className="container max-w-7xl mx-auto">
            <div className="space-y-6">
              {currentView !== "categories" && (
                <Button variant="ghost" onClick={handleBack} className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              )}

              <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">
                  {currentView === "categories" && "Modelos prontos para ti"}
                  {currentView === "models" && getCurrentCategory()?.name}
                  {currentView === "form" && "Preencher Documento"}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {currentView === "categories" &&
                    "Encontra rapidamente o documento que precisas, de monografias a contratos profissionais"}
                  {currentView === "models" && getCurrentCategory()?.description}
                  {currentView === "form" && "Preencha os campos abaixo para gerar seu documento personalizado"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container max-w-7xl mx-auto">
            {/* Main Categories View */}
            {currentView === "categories" && (
              <AnimatePresence mode="wait">
                <motion.div
                  key="categories"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2 mb-8">
                    <h2 className="text-2xl font-semibold">Biblioteca de Modelos</h2>
                    <p className="text-muted-foreground">Escolha a categoria do documento que precisa criar</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                      <motion.div
                        key={cat.id}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Card
                          className="cursor-pointer hover:shadow-lg transition h-full"
                          onClick={() => handleCategorySelect(cat.id)}
                        >
                          <CardHeader>
                            <CardTitle>{cat.name}</CardTitle>
                            <CardDescription>{cat.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Models View */}
            {currentView === "models" && (
              <AnimatePresence mode="wait">
                <motion.div
                  key="models"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2 mb-8">
                    <h2 className="text-2xl font-semibold">Modelos disponíveis</h2>
                    <p className="text-muted-foreground">Selecione o modelo que deseja utilizar</p>
                  </div>

                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Carregando modelos...</p>
                    </div>
                  ) : models.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Nenhum modelo disponível nesta categoria</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {models.map((model) => (
                        <motion.div
                          key={model.id}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card
                            onClick={() => handleModelSelect(model.id)}
                            className="cursor-pointer hover:shadow-lg transition border border-gray-200 h-full"
                          >
                            <CardHeader>
                              <CardTitle className="text-lg">{model.title}</CardTitle>
                              <CardDescription>Documento {model.output_type.toUpperCase()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <FileText className="h-8 w-8 text-primary" />
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Dynamic Form View */}
            {currentView === "form" && selectedModel && (
              <DynamicForm schema={selectedModel} onSubmit={handleFormSubmit} onBack={handleBack} />
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
