import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium hover:transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        sidebar_selected:
          "my-2 w-full rounded-r-full justify-start font-medium text-base rounded-l-none p-2 pl-6 text-left bg-selected-board-button-background text-selected-board-button-foreground hover:bg-selected-board-button-background/90 [&_svg]:size-4.5",
        sidebar_unselected:
          "my-2 w-full rounded-r-full justify-start font-medium text-base rounded-l-none p-2 pl-6 text-left bg-not-selected-board-button-background text-not-selected-board-button-foreground hover:bg-accent [&_svg]:size-4.5",
        add_board:
          "bg-add-board-button-background text-add-board-button-foreground hover:bg-accent my-2 w-full justify-start rounded-l-none rounded-r-full p-2 pl-6 text-base font-medium [&_svg]:size-4.5",
        add_column:
          "bg-column-background text-column-foreground hover:bg-column-background/90",
        add_column_cancel:
          "bg-add-column-cancel-background text-add-column-cancel-foreground hover:bg-add-column-cancel-background/90",
        add_task:
          "bg-task-background text-task-foreground hover:bg-task-background/90 justify-start shadow-md",
        add_task_cancel:
          "bg-add-task-cancel-background text-add-task-cancel-foreground hover:bg-add-task-cancel-background/90",
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        auto: "h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
