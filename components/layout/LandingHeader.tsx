"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo-transparent.png" alt="SaberAngola" width={40} height={40} />
          <span className="font-bold text-lg text-primary">SaberAngola</span>
        </Link>

        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Início
          </Link>
          <Link href="/sobre" className="hover:text-primary transition-colors">
            Sobre
          </Link>
          <Link href="/preco" className="hover:text-primary transition-colors">
            Preços
          </Link>
          <Link href="/guia" className="hover:text-primary transition-colors">
            Guia
          </Link>
          <Link href="/contacto" className="hover:text-primary transition-colors">
            Contato
          </Link>
        </nav>

        <Button onClick={() => (window.location.href = "/modelos")} size="sm" className="ml-4">
          Entrar
        </Button>
      </div>
    </header>
  )
}
