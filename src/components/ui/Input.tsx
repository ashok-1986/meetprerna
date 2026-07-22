'use client';

import { forwardRef, useState, useId } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helper?: string;
  error?: string;
  inputSize?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper, error, inputSize = 'md', showCount, maxLength, className, value, defaultValue, onChange, onFocus, onBlur, ...props }, ref) => {
    const id = useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    
    // We need to track if the input has a value to float the label if it's uncontrolled
    // but ideally react-hook-form makes it controlled. We'll use a simple state fallback.
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    
    const isControlled = value !== undefined;
    const hasValue = isControlled ? String(value).length > 0 : String(internalValue).length > 0;
    const shouldFloat = isFocused || hasValue;

    const currentLength = isControlled ? String(value).length : String(internalValue).length;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const sizeClasses = {
      sm: 'py-2 text-body-sm',
      md: 'py-3 text-body',
      lg: 'py-4 text-body-lg',
    };

    return (
      <div className={cn('relative flex w-full flex-col', className)}>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            aria-describedby={cn(helper && helperId, error && errorId) || undefined}
            aria-invalid={!!error}
            className={cn(
              'peer w-full appearance-none bg-transparent outline-none transition-all',
              'border-b',
              error 
                ? 'border-red-500 text-ivory' 
                : 'border-ink-20 text-ivory focus:border-inchworm',
              sizeClasses[inputSize]
            )}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              'absolute left-0 cursor-text select-none transition-all duration-200',
              shouldFloat
                ? '-top-3 text-body-xs text-ivory-dim'
                : `text-ivory-dim ${inputSize === 'sm' ? 'top-2' : inputSize === 'md' ? 'top-3' : 'top-4'}`
            )}
          >
            {label}
          </label>
        </div>

        <div className="mt-1 flex justify-between gap-4">
          <div className="flex flex-col">
            {error ? (
              <span id={errorId} className="text-body-xs text-red-500">
                {error}
              </span>
            ) : helper ? (
              <span id={helperId} className="text-body-xs text-ivory-dim">
                {helper}
              </span>
            ) : (
               <span className="h-4" /> /* spacer */
            )}
          </div>
          
          {(showCount && maxLength) && (
            <span className="text-body-xs text-ivory-dim shrink-0">
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
