"use client"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Save,
  FileText,
  Download,
  Undo,
  Redo,
  Search,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  ImageIcon,
  Table,
  Link,
  Crown,
  Lock,
  Clock,
  History,
  Share2,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function StudioPage() {
  const searchParams = useSearchParams()
  const documentId = searchParams.get("doc")

  const [isPremium, setIsPremium] = useState(false) // Mock premium status
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [documentContent, setDocumentContent] = useState("")
  const [documentTitle, setDocumentTitle] = useState("")
  const [showVersionHistory, setShowVersionHistory] = useState(false)

  // Mock document data
  const mockDocument = {
    id: documentId || "1",
    title: "Monografia em Informática - Redes Neurais Aplicadas",
    type: "Monografia",
    course: "Informática",
    author: "João Pedro Silva",
    createdAt: "2024-01-15",
    lastModified: "2024-01-20",
    status: "Gerado",
    pages: 45,
    wordCount: 12500,
    versions: [
      { id: 1, date: "2024-01-20 14:30", author: "João Pedro", action: "Editado no Studio", size: "12.5k palavras" },
      { id: 2, date: "2024-01-20 10:15", author: "Sistema", action: "Gerado automaticamente", size: "11.8k palavras" },
      { id: 3, date: "2024-01-19 16:45", author: "João Pedro", action: "Rascunho salvo", size: "8.2k palavras" },
    ],
  }

  const documentStructure = [
    { id: "capa", title: "Capa", level: 0 },
    { id: "resumo", title: "Resumo", level: 0 },
    { id: "sumario", title: "Sumário", level: 0 },
    { id: "introducao", title: "1. Introdução", level: 1 },
    { id: "objetivos", title: "1.1 Objetivos", level: 2 },
    { id: "justificativa", title: "1.2 Justificativa", level: 2 },
    { id: "fundamentacao", title: "2. Fundamentação Teórica", level: 1 },
    { id: "redes-neurais", title: "2.1 Redes Neurais", level: 2 },
    { id: "deep-learning", title: "2.2 Deep Learning", level: 2 },
    { id: "metodologia", title: "3. Metodologia", level: 1 },
    { id: "resultados", title: "4. Resultados", level: 1 },
    { id: "conclusao", title: "5. Conclusão", level: 1 },
    { id: "referencias", title: "Referências", level: 0 },
  ]

  useEffect(() => {
    if (documentId) {
      setDocumentTitle(mockDocument.title)
      setDocumentContent(`# ${mockDocument.title}

## Resumo

Este trabalho apresenta uma análise abrangente sobre a aplicação de redes neurais em sistemas de informação modernos. O objetivo principal é demonstrar como essas tecnologias podem ser implementadas para resolver problemas complexos de classificação e predição.

**Palavras-chave:** Redes Neurais, Deep Learning, Inteligência Artificial, Machine Learning

## 1. Introdução

A inteligência artificial tem revolucionado diversos setores da sociedade moderna. As redes neurais, em particular, representam uma das abordagens mais promissoras para resolver problemas complexos que envolvem reconhecimento de padrões e tomada de decisões automatizadas.

### 1.1 Objetivos

O objetivo geral deste trabalho é...

### 1.2 Justificativa

A escolha deste tema justifica-se pela crescente importância...

## 2. Fundamentação Teórica

### 2.1 Redes Neurais

As redes neurais artificiais são modelos computacionais inspirados no funcionamento do cérebro humano...

### 2.2 Deep Learning

O deep learning representa uma evolução das redes neurais tradicionais...

## 3. Metodologia

Para o desenvolvimento desta pesquisa, foi adotada uma abordagem...

## 4. Resultados

Os resultados obtidos demonstram...

## 5. Conclusão

Com base nos estudos realizados, pode-se concluir que...

## Referências

1. GOODFELLOW, Ian; BENGIO, Yoshua; COURVILLE, Aaron. Deep Learning. MIT Press, 2016.
2. RUSSELL, Stuart; NORVIG, Peter. Artificial Intelligence: A Modern Approach. 4th ed. Pearson, 2020.`)
    }
  }, [documentId])

  const handleSave = async () => {
    setIsSaving(true)
    // Mock save operation
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLastSaved(new Date())
    setIsSaving(false)
  }

  const handleExport = (format: "word" | "pdf") => {
    // Mock export operation
    alert(`Exportando documento como ${format.toUpperCase()}...`)
  }

  const handleRevertVersion = (versionId: number) => {
    // Mock revert operation
    alert(`Revertendo para a versão ${versionId}...`)
  }

  if (!isPremium && documentId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center space-y-6 p-6">
            <div className="space-y-4">
              <Lock className="h-16 w-16 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-bold">Studio Premium</h2>
              <p className="text-muted-foreground">
                O Studio é um recurso exclusivo para assinantes premium. Edite seus documentos gerados com ferramentas
                avançadas.
              </p>
            </div>

            <Alert>
              <Crown className="h-4 w-4" />
              <AlertDescription>
                <strong>Recursos Premium:</strong> Editor WYSIWYG, histórico de versões, exportação Word/PDF, edição
                colaborativa e muito mais.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Crown className="h-4 w-4 mr-2" />
                Assinar Premium
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Pagar Avulso (Esta Sessão)
              </Button>
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Documentos
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <FloatingContactButton />
      </div>
    )
  }

  if (!documentId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="container max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-balance">Studio Premium</h1>
                  <p className="text-lg text-muted-foreground">
                    Editor avançado para documentos gerados - Recurso Premium
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 px-4">
            <div className="container max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                <h2 className="text-2xl font-semibold">Nenhum documento selecionado</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  O Studio é usado para editar documentos já gerados. Selecione um documento do seu histórico para
                  começar a editar.
                </p>
              </div>

              <div className="space-y-4">
                <Button size="lg" asChild>
                  <a href="/home">Ver Meus Documentos</a>
                </Button>
                <div className="text-sm text-muted-foreground">
                  ou{" "}
                  <a href="/modelos" className="text-primary hover:underline">
                    gere um novo documento
                  </a>
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Studio Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="space-y-1">
                <h1 className="font-semibold text-lg truncate max-w-md">{documentTitle}</h1>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">{mockDocument.type}</Badge>
                  <span>•</span>
                  <span>{mockDocument.pages} páginas</span>
                  <span>•</span>
                  <span>{mockDocument.wordCount.toLocaleString()} palavras</span>
                  {lastSaved && (
                    <>
                      <span>•</span>
                      <span>Salvo {lastSaved.toLocaleTimeString()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowVersionHistory(!showVersionHistory)}>
                <History className="h-4 w-4 mr-2" />
                Versões
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Clock className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                {isSaving ? "Salvando..." : "Salvar"}
              </Button>
              <Select onValueChange={(value) => handleExport(value as "word" | "pdf")}>
                <SelectTrigger className="w-32">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Exportar</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="word">Word (.docx)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 flex">
        {/* Document Structure Sidebar */}
        <div className="w-64 border-r bg-muted/30 overflow-y-auto">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-3">Estrutura do Documento</h3>
              <div className="space-y-1">
                {documentStructure.map((section) => (
                  <button
                    key={section.id}
                    className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted transition-colors ${
                      section.level === 0
                        ? "font-medium"
                        : section.level === 1
                          ? "ml-2 font-normal"
                          : "ml-4 text-muted-foreground"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>

            {showVersionHistory && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Histórico de Versões</h3>
                <div className="space-y-2">
                  {mockDocument.versions.map((version) => (
                    <div key={version.id} className="p-2 border rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{version.action}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs"
                          onClick={() => handleRevertVersion(version.id)}
                        >
                          Restaurar
                        </Button>
                      </div>
                      <div className="text-muted-foreground">
                        <div>{version.date}</div>
                        <div>
                          {version.author} • {version.size}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="border-b p-2 bg-background">
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-1 border-r pr-2 mr-2">
                <Button variant="ghost" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2 mr-2">
                <Button variant="ghost" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Underline className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2 mr-2">
                <Button variant="ghost" size="sm">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2 mr-2">
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Table className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Link className="h-4 w-4" />
                </Button>
              </div>

              <div className="ml-auto flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-8 w-48 h-8" />
                </div>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-lg rounded-lg p-8 min-h-[800px] border">
                <Textarea
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  className="w-full h-full min-h-[750px] border-none resize-none focus:ring-0 focus:outline-none text-sm leading-relaxed font-mono"
                  placeholder="Comece a editar seu documento..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-80 border-l bg-muted/30 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold text-sm mb-3">Propriedades do Documento</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="doc-title" className="text-xs">
                    Título
                  </Label>
                  <Input
                    id="doc-title"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label htmlFor="doc-author" className="text-xs">
                    Autor
                  </Label>
                  <Input id="doc-author" defaultValue={mockDocument.author} className="h-8" />
                </div>
                <div>
                  <Label htmlFor="doc-course" className="text-xs">
                    Curso
                  </Label>
                  <Input id="doc-course" defaultValue={mockDocument.course} className="h-8" />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-sm mb-3">Formatação</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Fonte</Label>
                  <Select defaultValue="times">
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="times">Times New Roman</SelectItem>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="calibri">Calibri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Tamanho</Label>
                  <Select defaultValue="12">
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10pt</SelectItem>
                      <SelectItem value="11">11pt</SelectItem>
                      <SelectItem value="12">12pt</SelectItem>
                      <SelectItem value="14">14pt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Espaçamento</Label>
                  <Select defaultValue="1.5">
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Simples</SelectItem>
                      <SelectItem value="1.5">1,5 linhas</SelectItem>
                      <SelectItem value="2">Duplo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-sm mb-3">Estatísticas</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Páginas:</span>
                  <span>{mockDocument.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Palavras:</span>
                  <span>{mockDocument.wordCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Caracteres:</span>
                  <span>{(mockDocument.wordCount * 6).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Última edição:</span>
                  <span>{mockDocument.lastModified}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  )
}
