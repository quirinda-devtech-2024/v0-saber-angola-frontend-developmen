import formSchemas from "@/data/formSchemas.json"

export function getSchemasByCategory(categoryId: string) {
  return formSchemas[categoryId as keyof typeof formSchemas] || []
}

export function getAllSchemasByCategory(categoryId: string) {
  return getSchemasByCategory(categoryId)
}

export function getSchemaById(categoryId: string, modelId: number) {
  const categorySchemas = getSchemasByCategory(categoryId)
  return categorySchemas.find((schema: any) => schema.id === modelId)
}
