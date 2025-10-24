"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import type { Category } from "@/types/models"

interface CategoryListProps {
  categories: Category[]
  onSelect: (categoryId: string) => void
}

export function CategoryList({ categories, onSelect }: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group p-6"
          onClick={() => onSelect(category.id)}
        >
          <CardHeader className="text-center pb-4">
            <category.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <CardTitle className="text-2xl mb-2">{category.name}</CardTitle>
            <CardDescription className="text-base">{category.description}</CardDescription>
            <Badge variant="secondary" className="mt-2 w-fit mx-auto">
              {category.count} modelos disponíveis
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <ChevronRight className="h-6 w-6 text-muted-foreground mx-auto group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
