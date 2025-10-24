"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import type { Subcategory } from "@/types/models"

interface SearchFiltersProps {
  subcategory: Subcategory
  selectedCourse: string
  selectedLevel: string
  searchQuery: string
  onCourseChange: (value: string) => void
  onLevelChange: (value: string) => void
  onSearchChange: (value: string) => void
}

export function SearchFilters({
  subcategory,
  selectedCourse,
  selectedLevel,
  searchQuery,
  onCourseChange,
  onLevelChange,
  onSearchChange,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Pesquisar modelos..."
          className="pl-10 h-12"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {subcategory.courses && (
        <Select value={selectedCourse} onValueChange={onCourseChange}>
          <SelectTrigger className="w-full md:w-48 h-12">
            <SelectValue placeholder="Curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os cursos</SelectItem>
            {subcategory.courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {subcategory.levels && (
        <Select value={selectedLevel} onValueChange={onLevelChange}>
          <SelectTrigger className="w-full md:w-48 h-12">
            <SelectValue placeholder="Nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os níveis</SelectItem>
            {subcategory.levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
