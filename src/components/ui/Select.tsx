'use client';

import { forwardRef, useState, useId } from 'react';
import { cn } from '@/utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helper?: string;
  error?: string;
  options: { label: string; value: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helper, error, options, className, value, defaultValue, onChange, onFocus, onBlur, ...props }, ref) => {
    const id = useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    
    const isControlled = value !== undefined;
    const hasValue = isControlled ? String(value).length > 0 : String(internalValue).length > 0;
    const shouldFloat = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className={cn('relative flex w-full flex-col', className)}>
        <div className="relative">
          <select
            ref={ref}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-describedby={cn(helper && helperId, error && errorId) || undefined}
            aria-invalid={!!error}
            className={cn(
              'peer w-full appearance-none bg-transparent outline-none transition-all py-3 text-body',
              'border-b cursor-pointer',
              error 
                ? 'border-red-500 text-ivory' 
                : 'border-ink-20 text-ivory focus:border-inchworm',
            )}
            {...props}
          >
            <option value="" disabled className="text-ink bg-ivory">
              Select an option
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-ink bg-ivory">
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron since appearance is none */}
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ivory-dim">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <label
            htmlFor={id}
            className={cn(
              'absolute left-0 cursor-text select-none transition-all duration-200 pointer-events-none',
              shouldFloat
                ? '-top-3 text-body-xs text-ivory-dim'
                : 'top-3 text-ivory-dim'
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
               <span className="h-4" />
            )}
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
