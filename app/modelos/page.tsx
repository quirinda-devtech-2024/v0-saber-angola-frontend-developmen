"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Star, FileText, BookOpen, ChevronRight, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function ModelosPage() {
  const [currentView, setCurrentView] = useState<"categories" | "subcategories" | "models">("categories")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedLevel, setSelectedLevel] = useState<string>("")

  const mainCategories = [
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
          courses: ["Informática", "Direito", "Mecânica", "Gestão", "Medicina", "Engenharia"],
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
      id: "outros-documentos",
      name: "Outros Documentos",
      icon: FileText,
      description: "CVs, cartas formais e certificados",
      count: 25,
      subcategories: [
        {
          id: "cvs",
          name: "Currículos (CVs)",
          description: "Modelos de currículo profissional",
          types: ["Estudante", "Profissional", "Primeiro Emprego", "Executivo"],
        },
        {
          id: "cartas-formais",
          name: "Cartas Formais",
          description: "Cartas de recomendação, motivação e pedido",
          types: ["Recomendação", "Motivação", "Pedido", "Apresentação"],
        },
        {
          id: "certificados-declaracoes",
          name: "Certificados e Declarações",
          description: "Documentos oficiais e certificações",
          types: ["Participação", "Conclusão", "Matrícula", "Frequência"],
        },
      ],
    },
  ]

  const sampleModels = {
    "monografias-informatica": [
      {
        id: 1,
        title: "Monografia em Informática - Formato ABNT",
        description: "Estrutura completa para monografia em Informática seguindo normas ABNT",
        course: "Informática",
        downloads: 1234,
        rating: 4.8,
        preview: "/academic-thesis-template.jpg",
      },
      {
        id: 2,
        title: "Monografia em Informática - Formato Simples",
        description: "Modelo simplificado para monografia em Informática",
        course: "Informática",
        downloads: 987,
        rating: 4.6,
        preview: "/academic-thesis-template.jpg",
      },
    ],
    "cvs-estudante": [
      {
        id: 3,
        title: "CV Estudante Universitário",
        description: "Currículo otimizado para estudantes sem experiência profissional",
        type: "Estudante",
        downloads: 2156,
        rating: 4.9,
        preview: "/student-cv-template.jpg",
      },
    ],
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentView("subcategories")
  }

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId)
    setCurrentView("models")
  }

  const handleModelSelect = (modelId: number) => {
    window.location.href = `/documentos?model=${modelId}`
  }

  const handleBack = () => {
    if (currentView === "models") {
      setCurrentView("subcategories")
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
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-6xl mx-auto">
            <div className="space-y-6">
              {currentView !== "categories" && (
                <Button variant="ghost" onClick={handleBack} className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              )}

              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">
                  {currentView === "categories" && "Biblioteca de Modelos"}
                  {currentView === "subcategories" && getCurrentCategory()?.name}
                  {currentView === "models" && getCurrentSubcategory()?.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {currentView === "categories" && "Escolha a categoria de documento que precisa criar"}
                  {currentView === "subcategories" && getCurrentCategory()?.description}
                  {currentView === "models" && getCurrentSubcategory()?.description}
                </p>
              </div>

              {/* Search and Filters - only show in models view */}
              {currentView === "models" && (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Pesquisar modelos..." className="pl-10 h-12" />
                  </div>
                  {getCurrentSubcategory()?.courses && (
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger className="w-full md:w-48 h-12">
                        <SelectValue placeholder="Curso" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentSubcategory()?.courses?.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {getCurrentSubcategory()?.levels && (
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger className="w-full md:w-48 h-12">
                        <SelectValue placeholder="Nível" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentSubcategory()?.levels?.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            {/* Main Categories View */}
            {currentView === "categories" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mainCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer group p-6"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardHeader className="text-center pb-4">
                      <category.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-2xl mb-2">{category.name}</CardTitle>
                      <CardDescription className="text-base">{category.description}</CardDescription>
                      <Badge variant="secondary" className="mt-2 w-fit mx-auto">
                        {category.count} modelos disponíveis
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <ChevronRight className="h-6 w-6 text-muted-foreground mx-auto group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Subcategories View */}
            {currentView === "subcategories" && getCurrentCategory() && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentCategory()?.subcategories.map((subcategory) => (
                  <Card
                    key={subcategory.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => handleSubcategorySelect(subcategory.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {subcategory.name}
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </CardTitle>
                      <CardDescription>{subcategory.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {subcategory.courses?.slice(0, 3).map((course) => (
                          <Badge key={course} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                        {subcategory.levels?.slice(0, 2).map((level) => (
                          <Badge key={level} variant="outline" className="text-xs">
                            {level}
                          </Badge>
                        ))}
                        {subcategory.types?.slice(0, 3).map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Models View */}
            {currentView === "models" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.values(sampleModels)
                    .flat()
                    .map((model) => (
                      <Card key={model.id} className="hover:shadow-lg transition-shadow group">
                        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                          <img
                            src={model.preview || "/placeholder.svg"}
                            alt={model.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{model.title}</CardTitle>
                          <CardDescription>{model.description}</CardDescription>
                          {(model.course || model.type) && (
                            <Badge variant="secondary" className="w-fit">
                              {model.course || model.type}
                            </Badge>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Download className="h-4 w-4" />
                                <span>{model.downloads}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{model.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1" onClick={() => handleModelSelect(model.id)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Selecionar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {Object.values(sampleModels).flat().length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum modelo encontrado</h3>
                    <p className="text-muted-foreground">
                      Tente ajustar os filtros ou escolher uma categoria diferente.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
