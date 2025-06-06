
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeDashboardVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        warning: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200",
        info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeDashboardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeDashboardVariants> {}

function BadgeDashboard({ className, variant, ...props }: BadgeDashboardProps) {
  return (
    <div className={cn(badgeDashboardVariants({ variant }), className)} {...props} />
  )
}

export { BadgeDashboard, badgeDashboardVariants }
