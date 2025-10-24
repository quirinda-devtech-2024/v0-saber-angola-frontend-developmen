import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="bg-muted py-10 text-center text-sm text-muted-foreground">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-wrap justify-center gap-6 text-foreground/80">
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
        </div>
        <p>&copy; {new Date().getFullYear()} SaberAngola. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
