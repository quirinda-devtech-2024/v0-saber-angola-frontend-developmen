import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "SaberAngola",
    template: "%s | SaberAngola",
  },
  description:
    "Crie documentos acadêmicos e profissionais em minutos — monografias, CVs, certificados e mais. Feito para estudantes angolanos.",
  keywords: [
    "SaberAngola",
    "documentos acadêmicos",
    "monografias",
    "currículos",
    "cartas formais",
    "Angola",
    "estudantes angolanos",
    "certificados",
    "CVs profissionais",
  ],
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: "https://saberangola.com",
    siteName: "SaberAngola",
    title: "SaberAngola — Documentos Acadêmicos Profissionais",
    description: "Plataforma digital angolana para criação de documentos acadêmicos e profissionais.",
    images: [
      {
        url: "/images/logo-with-bg.png",
        width: 1200,
        height: 630,
        alt: "SaberAngola Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaberAngola — Crie documentos profissionais em minutos",
    description: "A revolução digital acadêmica em Angola. Monografias, CVs, certificados e mais.",
    images: ["/images/logo-with-bg.png"],
  },
  metadataBase: new URL("https://saberangola.com"),
  icons: {
    icon: "/favicon.ico",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.className} ${geistMono.className} font-sans antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}
