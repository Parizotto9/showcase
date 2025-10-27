import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  required?: boolean;
  placeholder?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, placeholder, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <span className="mb-1 block  font-bold text-[#57576CFF]">
            {label} {required && "*"}
          </span>
        )}
        <textarea
          className={cn(
            "flex h-10 min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  focus-visible:outline-none border-[#d1d5dbff] focus:border-[#a5a8ad] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
            className
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };