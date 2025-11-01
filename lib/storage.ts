const STORAGE_URL = process.env.NEXT_PUBLIC_R2_URL || "https://r2.saberangola.com"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.saberangola.com"

export async function uploadFile(file: File, path: string, token: string): Promise<{ url: string; id: string }> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("path", path)

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Falha ao fazer upload do arquivo")
  }

  return response.json()
}

export function getPublicUrl(id: string): string {
  return `${STORAGE_URL}/${id}`
}

export async function deleteFile(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/delete-file/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Falha ao deletar arquivo")
  }
}
