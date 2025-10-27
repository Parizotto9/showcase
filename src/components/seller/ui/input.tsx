import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  min?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, placeholder, min, required = true, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <span className="mb-1 block  font-bold text-[#57576CFF]">
            {label} {required && '*'}
          </span>
        )}
        <input
          type={type}
          min={min}
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  focus-visible:outline-none border-[#d1d5dbff] focus:border-[#a5a8ad] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ',
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
Input.displayName = 'Input';

export { Input };
