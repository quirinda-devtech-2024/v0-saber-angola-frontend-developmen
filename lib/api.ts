const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.saberangola.com"

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: any
  token?: string
}

async function request(path: string, options: RequestOptions = {}) {
  const { method = "GET", headers = {}, body, token } = options

  const url = `${API_URL}/${path}`
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  }

  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || `API error: ${response.status}`)
  }

  return response.json()
}

export const api = {
  get: (path: string, token?: string) => request(path, { method: "GET", token }),

  post: (path: string, data: any, token?: string) => request(path, { method: "POST", body: data, token }),

  put: (path: string, data: any, token?: string) => request(path, { method: "PUT", body: data, token }),

  delete: (path: string, token?: string) => request(path, { method: "DELETE", token }),

  patch: (path: string, data: any, token?: string) => request(path, { method: "PATCH", body: data, token }),
}
