'use client';

import { forwardRef, useState, useId, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helper?: string;
  error?: string;
  autoGrow?: boolean;
  showCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helper, error, autoGrow = false, showCount, maxLength, className, value, defaultValue, onChange, onFocus, onBlur, rows = 3, ...props }, ref) => {
    const id = useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    
    const isControlled = value !== undefined;
    const hasValue = isControlled ? String(value).length > 0 : String(internalValue).length > 0;
    const shouldFloat = isFocused || hasValue;
    const currentLength = isControlled ? String(value).length : String(internalValue).length;

    // Use merged ref to handle both internal autoGrow and external ref
    const setRefs = (element: HTMLTextAreaElement) => {
      textareaRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const adjustHeight = () => {
      if (!autoGrow || !textareaRef.current) return;
      const el = textareaRef.current;
      el.style.height = 'auto';
      // max height based on roughly rows * 24px * 4
      const maxHeight = (Number(rows) || 3) * 24 * 4;
      const newHeight = Math.min(el.scrollHeight, maxHeight);
      el.style.height = `${newHeight}px`;
    };

    useEffect(() => {
      adjustHeight();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, internalValue, autoGrow]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
      adjustHeight();
    };

    return (
      <div className={cn('relative flex w-full flex-col', className)}>
        <div className="relative">
          <textarea
            ref={setRefs}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            rows={rows}
            aria-describedby={cn(helper && helperId, error && errorId) || undefined}
            aria-invalid={!!error}
            className={cn(
              'peer w-full resize-none appearance-none bg-transparent outline-none transition-all py-3 text-body',
              'border-b',
              error 
                ? 'border-red-500 text-ivory' 
                : 'border-ink-border text-ivory focus:border-inchworm',
            )}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              'absolute left-0 cursor-text select-none transition-all duration-200',
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

Textarea.displayName = 'Textarea';

export { Textarea };
