# Frontend Componentes Base

## Componentes UI Essenciais

1. Button Component
```typescript
// components/ui/button.tsx
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        "rounded-md font-medium transition-colors",
        {
          'bg-primary text-white hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-primary hover:bg-secondary/90': variant === 'secondary',
          'border-2 border-primary text-primary hover:bg-primary/10': variant === 'outline',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
```

2. Input Component
```typescript
// components/ui/input.tsx
import { cn } from "@/lib/utils"
import { InputHTMLAttributes, forwardRef } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  error,
  ...props
}, ref) => {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm",
        "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
        { "border-red-500 focus:border-red-500 focus:ring-red-500": error },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
```

3. Card Component
```typescript
// components/ui/card.tsx
import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
```

4. Form Layout Component
```typescript
// components/ui/form-layout.tsx
import { HTMLAttributes } from "react"

export function FormLayout({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      {children}
    </div>
  )
}

export function FormField({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="space-y-1">
      {children}
    </div>
  )
}
```

5. Alert Component
```typescript
// components/ui/alert.tsx
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error'
}

export function Alert({
  className,
  variant = 'info',
  ...props
}: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-md p-4",
        {
          'bg-blue-50 text-blue-700': variant === 'info',
          'bg-green-50 text-green-700': variant === 'success',
          'bg-yellow-50 text-yellow-700': variant === 'warning',
          'bg-red-50 text-red-700': variant === 'error',
        },
        className
      )}
      {...props}
    />
  )
}
```