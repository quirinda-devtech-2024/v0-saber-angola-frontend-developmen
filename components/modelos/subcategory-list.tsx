"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import type { Subcategory } from "@/types/models"

interface SubcategoryListProps {
  subcategories: Subcategory[]
  onSelect: (subcategoryId: string) => void
}

export function SubcategoryList({ subcategories, onSelect }: SubcategoryListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subcategories.map((subcategory) => (
        <Card
          key={subcategory.id}
          className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          onClick={() => onSelect(subcategory.id)}
        >
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              {subcategory.name}
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </CardTitle>
            <CardDescription>{subcategory.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {subcategory.courses?.slice(0, 3).map((course) => (
                <Badge key={course} variant="outline" className="text-xs">
                  {course}
                </Badge>
              ))}
              {subcategory.levels?.slice(0, 2).map((level) => (
                <Badge key={level} variant="outline" className="text-xs">
                  {level}
                </Badge>
              ))}
              {subcategory.types?.slice(0, 3).map((type) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
