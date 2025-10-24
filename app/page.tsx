"use client"

import { LandingHeader } from "@/components/layout/LandingHeader"
import { LandingFooter } from "@/components/layout/LandingFooter"
import { Hero } from "@/components/landing/Hero"
import { Stats } from "@/components/landing/Stats"
import { Features } from "@/components/landing/Features"
import { DocumentTypes } from "@/components/landing/DocumentTypes"
import { Testimonials } from "@/components/landing/Testimonials"
import { FAQ } from "@/components/landing/FAQ"
import { CTA } from "@/components/landing/CTA"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <LandingHeader />

      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <DocumentTypes />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <LandingFooter />
    </div>
  )
}
