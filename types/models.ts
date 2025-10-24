export interface FormField {
  name: string
  label: string
  type: "text" | "number" | "select" | "textarea" | "date"
  required?: boolean
  options?: string[]
  placeholder?: string
  helpText?: string
}

export interface ModelSchema {
  id: number
  title: string
  fields: FormField[]
  output_type: "docx" | "pdf"
}

export interface Model {
  id: number
  title: string
  description: string
  course?: string
  type?: string
  downloads: number
  rating: number
  preview: string
  schema?: ModelSchema
}

export interface Subcategory {
  id: string
  name: string
  description: string
  courses?: string[]
  levels?: string[]
  types?: string[]
  subjects?: string[]
}

export interface Category {
  id: string
  name: string
  icon: any
  description: string
  count: number
  subcategories: Subcategory[]
}
