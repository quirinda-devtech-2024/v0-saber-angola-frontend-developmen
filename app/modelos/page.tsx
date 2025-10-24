"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { BookOpen, FileText } from "lucide-react"
import { CategoryList } from "@/components/modelos/category-list"
import { SubcategoryList } from "@/components/modelos/subcategory-list"
import { ModelList } from "@/components/modelos/model-list"
import { SearchFilters } from "@/components/modelos/search-filters"
import { DynamicForm } from "@/components/modelos/dynamic-form"
import { documentsService } from "@/services/documents"
import type { Category, Model, ModelSchema } from "@/types/models"
import { toast } from "sonner"

export default function ModelosPage() {
  const [currentView, setCurrentView] = useState<"categories" | "subcategories" | "models" | "form">("categories")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [models, setModels] = useState<Model[]>([])
  const [selectedModelSchema, setSelectedModelSchema] = useState<ModelSchema | null>(null)
  const [loading, setLoading] = useState(false)

  const mainCategories: Category[] = [
    {
      id: "trabalhos-escolares",
      name: "Trabalhos Escolares",
      icon: BookOpen,
      description: "Monografias, TFC e trabalhos acadêmicos",
      count: 45,
      subcategories: [
        {
          id: "monografias",
          name: "Monografias",
          description: "Trabalhos de pesquisa acadêmica",
          courses: ["Informática", "Direito", "Mecânica", "Gestão", "Medicina", "Engenharia"],
        },
        {
          id: "tfc",
          name: "Trabalhos de Final de Curso (TFC)",
          description: "Projetos de conclusão de curso",
          courses: ["Informática", "Direito", "Gestão", "Psicologia", "Educação", "Enfermagem"],
        },
        {
          id: "trabalhos-normais",
          name: "Trabalhos Normais",
          description: "Trabalhos do dia a dia acadêmico",
          levels: ["Ensino Médio", "Superior", "Técnico"],
          subjects: ["Matemática", "História", "Programação", "Física", "Química", "Literatura"],
        },
      ],
    },
    {
      id: "declaracoes",
      name: "Declarações",
      icon: FileText,
      description: "Declarações oficiais para fins acadêmicos, profissionais ou bancários",
      count: 18,
      subcategories: [
        {
          id: "declaracao-rendimento",
          name: "Declaração de Rendimento",
          description: "Modelo para comprovar rendimentos para abertura de conta bancária",
          types: ["Abertura de conta", "Financiamento", "Visto", "Residência"],
        },
        {
          id: "declaracao-cedencia",
          name: "Declaração de Cedência",
          description: "Modelo para formalizar cedência de bens, documentos ou equipamentos",
          types: ["Equipamentos", "Materiais", "Espaços físicos", "Temporária"],
        },
      ],
    },
    {
      id: "contratos",
      name: "Contratos",
      icon: FileText,
      description: "Modelos de contratos formais para diversas finalidades",
      count: 22,
      subcategories: [
        {
          id: "contrato-prestacao-servicos",
          name: "Prestação de Serviços",
          description: "Acordos entre prestador e cliente",
          types: ["Design", "Construção", "Consultoria", "Informática", "Eventos"],
        },
        {
          id: "contrato-aluguer",
          name: "Contrato de Aluguer",
          description: "Locação de bens móveis ou imóveis",
          types: ["Casa", "Loja", "Veículo", "Equipamento"],
        },
      ],
    },
    {
      id: "curriculos",
      name: "Currículos (CVs)",
      icon: FileText,
      description: "Modelos de currículo profissional para diferentes perfis",
      count: 12,
      subcategories: [
        {
          id: "cv-estudante",
          name: "Estudante / Primeiro Emprego",
          description: "CV ideal para quem está iniciando no mercado de trabalho",
          types: ["Universitário", "Recém-formado", "Estágio"],
        },
        {
          id: "cv-profissional",
          name: "Profissional / Experiente",
          description: "Modelos otimizados para profissionais com experiência",
          types: ["Gestão", "Tecnologia", "Saúde", "Educação"],
        },
      ],
    },
    {
      id: "outros-documentos",
      name: "Outros Documentos",
      icon: FileText,
      description: "Cartas formais, certificados e autorizações diversas",
      count: 15,
      subcategories: [
        {
          id: "cartas-formais",
          name: "Cartas Formais",
          description: "Cartas de recomendação, motivação e pedido",
          types: ["Recomendação", "Motivação", "Pedido", "Apresentação"],
        },
        {
          id: "certificados",
          name: "Certificados",
          description: "Documentos de conclusão, participação e reconhecimento",
          types: ["Conclusão", "Participação", "Honra", "Curso"],
        },
      ],
    },
  ]

  useEffect(() => {
    if (currentView === "models" && selectedSubcategory) {
      loadModels()
    }
  }, [selectedSubcategory, selectedCourse, selectedLevel, searchQuery])

  const loadModels = async () => {
    setLoading(true)
    try {
      const filters = {
        course: selectedCourse !== "all" ? selectedCourse : undefined,
        level: selectedLevel !== "all" ? selectedLevel : undefined,
        search: searchQuery || undefined,
      }
      const data = await documentsService.getModels(selectedSubcategory, filters)
      setModels(data)
    } catch (error) {
      toast.error("Erro ao carregar modelos")
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentView("subcategories")
  }

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId)
    setCurrentView("models")
  }

  const handleModelSelect = async (modelId: number) => {
    setLoading(true)
    try {
      const schema = await documentsService.getSchema(modelId)
      setSelectedModelSchema(schema)
      setCurrentView("form")
    } catch (error) {
      toast.error("Erro ao carregar formulário")
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = async (formData: Record<string, any>) => {
    if (!selectedModelSchema) return

    try {
      const response = await documentsService.submitForm(selectedModelSchema.id, formData)
      toast.success("Documento gerado com sucesso!")
      window.open(response.download_url, "_blank")
      setCurrentView("models")
      setSelectedModelSchema(null)
    } catch (error) {
      toast.error("Erro ao gerar documento")
    }
  }

  const handleBack = () => {
    if (currentView === "form") {
      setCurrentView("models")
      setSelectedModelSchema(null)
    } else if (currentView === "models") {
      setCurrentView("subcategories")
      setSelectedSubcategory("")
    } else if (currentView === "subcategories") {
      setCurrentView("categories")
      setSelectedCategory("")
    }
  }

  const getCurrentCategory = () => {
    return mainCategories.find((cat) => cat.id === selectedCategory)
  }

  const getCurrentSubcategory = () => {
    const category = getCurrentCategory()
    return category?.subcategories.find((sub) => sub.id === selectedSubcategory)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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
                  {currentView === "subcategories" && getCurrentCategory()?.name}
                  {currentView === "models" && getCurrentSubcategory()?.name}
                  {currentView === "form" && "Preencher Documento"}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {currentView === "categories" &&
                    "Encontra rapidamente o documento que precisas, de monografias a contratos profissionais"}
                  {currentView === "subcategories" && getCurrentCategory()?.description}
                  {currentView === "models" && getCurrentSubcategory()?.description}
                  {currentView === "form" && "Preencha os campos abaixo para gerar seu documento personalizado"}
                </p>
              </div>

              {/* Search and Filters - only show in models view */}
              {currentView === "models" && getCurrentSubcategory() && (
                <SearchFilters
                  subcategory={getCurrentSubcategory()!}
                  selectedCourse={selectedCourse}
                  selectedLevel={selectedLevel}
                  searchQuery={searchQuery}
                  onCourseChange={setSelectedCourse}
                  onLevelChange={setSelectedLevel}
                  onSearchChange={setSearchQuery}
                />
              )}
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container max-w-7xl mx-auto">
            {/* Main Categories View */}
            {currentView === "categories" && (
              <CategoryList categories={mainCategories} onSelect={handleCategorySelect} />
            )}

            {/* Subcategories View */}
            {currentView === "subcategories" && getCurrentCategory() && (
              <SubcategoryList subcategories={getCurrentCategory()!.subcategories} onSelect={handleSubcategorySelect} />
            )}

            {/* Models View */}
            {currentView === "models" && <ModelList models={models} onSelect={handleModelSelect} />}

            {/* Dynamic Form View */}
            {currentView === "form" && selectedModelSchema && (
              <DynamicForm schema={selectedModelSchema} onSubmit={handleFormSubmit} onBack={handleBack} />
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
