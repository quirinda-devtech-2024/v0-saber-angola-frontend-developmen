import type { ModelSchema } from "./types" // Assuming ModelSchema is defined in a separate file

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export const documentsService = {
  getSchema: async (modelId: number): Promise<ModelSchema> => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/templates/${modelId}/schema/`)
      if (!response.ok) throw new Error("Failed to fetch schema")
      return await response.json()
    } catch (error) {
      console.error("Error fetching schema:", error)
      // Fallback to mock data for development
      return {
        id: modelId,
        title: "Monografia em Informática",
        fields: [
          {
            name: "tema",
            label: "Tema da Monografia",
            type: "text",
            required: true,
            helpText: "Digite o tema completo, incluindo o subtítulo",
          },
          { name: "autor", label: "Nome do Autor", type: "text", required: true },
          {
            name: "curso",
            label: "Curso",
            type: "select",
            options: ["Informática", "Gestão", "Direito"],
            required: true,
          },
          { name: "ano", label: "Ano de Conclusão", type: "number", required: true },
          { name: "orientador", label: "Orientador", type: "text", required: false },
        ],
        output_type: "docx",
      }
    }
  },

  submitForm: async (modelId: number, formData: Record<string, any>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/templates/${modelId}/generate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Failed to generate document")
      return await response.json()
    } catch (error) {
      console.error("Error generating document:", error)
      // Mock response for development
      return {
        download_url: "/sample-document.docx",
        message: "Documento gerado com sucesso!",
      }
    }
  },

  getModels: async (subcategoryId: string, filters?: Record<string, string>) => {
    // Mock data for now - replace with real API call
    return [
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
        preview: "/simple-thesis-template.jpg",
      },
    ]
  },
}
