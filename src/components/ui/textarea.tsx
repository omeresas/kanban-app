import * as React from "react";
import { useEffect, useRef, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        edit_task_description:
          "text-task-foreground bg-accent/80 rounded-xs border-none text-base font-normal shadow-none px-3 py-2 h-auto focus-visible:ring-2",
        edit_column_title:
          "text-column-foreground bg-task-background rounded-xs border-none text-lg font-bold p-1 md:text-lg break-words break-all focus-visible:ring-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, []);

    useEffect(() => {
      adjustHeight();
    }, [adjustHeight, props.value]);

    return (
      <textarea
        ref={(element) => {
          textareaRef.current = element;
          if (typeof ref === "function") ref(element);
          else if (ref) ref.current = element;
        }}
        className={cn(textareaVariants({ variant, className }))}
        rows={1}
        spellCheck={false}
        onInput={adjustHeight}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
