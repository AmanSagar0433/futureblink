import * as React from "react"

import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const horizontalLoadingBarVariants = cva(
  "h-1 w-full overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
      },
      sizeVariant: {
        default: "h-1",
        sm: "h-0.5",
        lg: "h-2",
        xl: "h-5"
      },
      colorVariant: {
        primary: "bg-blue-200 border-primary",
        gray: "bg-muted-foreground/40 border-transparent",
        orange: "bg-orange-100 border-orange-500",
        green: "bg-green-100 border-green-500",
      },
      cornerVariant: {
        none: "",
        full: "rounded-full",
      },
      borderSizeVariant: {
        none: "",
        sm:"border-2",
        xl:"border-4"
      }
    },
    defaultVariants: {
      variant: "default",
      sizeVariant: "default",
      colorVariant: "gray",
      cornerVariant: "none",
      borderSizeVariant: "none"
    },
  }
)

const barVariants = cva(
    "",
    {
      variants: {
        colorVariant: {
          primary: "bg-primary",
          orange: "bg-orange-400",
          green: "bg-green-400",
        },
        cornerVarient: {
          none: "",
          full: "rounded-full"
        },
      },
      defaultVariants: {
        colorVariant: "primary",
        cornerVarient: "none"
      },
    }
  );

interface HorizontalLoadingBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof horizontalLoadingBarVariants> {}

const HorizontalLoadingBar = React.forwardRef<HTMLDivElement, HorizontalLoadingBarProps>(
  ({ className, variant, sizeVariant, colorVariant, cornerVariant, borderSizeVariant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(horizontalLoadingBarVariants({ variant, sizeVariant, colorVariant, cornerVariant, borderSizeVariant }), className,"p-0")}
      {...props}
    />
  )
)
HorizontalLoadingBar.displayName = "HorizontalLoadingBar"


interface BarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof barVariants> {}

const Bar = React.forwardRef<HTMLDivElement, BarProps>(
  ({ className, colorVariant, cornerVarient, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(barVariants({ colorVariant, cornerVarient }),className,"w-3/5 h-full opacity-90 animate-indeterminate border-0 p-0 m-0")}
      {...props}
    />
  )
);
Bar.displayName = "Bar";

export { HorizontalLoadingBar, Bar }