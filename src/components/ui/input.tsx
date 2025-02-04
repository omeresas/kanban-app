import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "border-input focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "file:text-foreground placeholder:text-muted-foreground text-base file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm",
        edit_task_title:
          "text-task-foreground bg-accent/80 self-start rounded-sm border-none text-lg font-semibold shadow-none px-3 py-2 h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
