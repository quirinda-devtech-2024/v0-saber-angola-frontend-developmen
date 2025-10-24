"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Star, FileText, Eye } from "lucide-react"
import type { Model } from "@/types/models"

interface ModelListProps {
  models: Model[]
  onSelect: (modelId: number) => void
}

export function ModelList({ models, onSelect }: ModelListProps) {
  if (models.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Nenhum modelo encontrado</h3>
        <p className="text-muted-foreground">Tente ajustar os filtros ou escolher uma categoria diferente.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <Card key={model.id} className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
          <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
            <img
              src={model.preview || "/placeholder.svg"}
              alt={model.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-lg">{model.title}</CardTitle>
            <CardDescription>{model.description}</CardDescription>
            {(model.course || model.type) && (
              <Badge variant="secondary" className="w-fit">
                {model.course || model.type}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>{model.downloads}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{model.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" onClick={() => onSelect(model.id)}>
                <FileText className="h-4 w-4 mr-2" />
                Selecionar
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
