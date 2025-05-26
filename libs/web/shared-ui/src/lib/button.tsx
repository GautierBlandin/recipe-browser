import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

export type ButtonVariant = 'brand' | 'neutral' | 'success' | 'error';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  brand: 'bg-brand-primary hover:bg-brand-primary-hover text-brand-onprimary',
  neutral: 'bg-neutral-secondary hover:bg-neutral-secondary-hover text-neutral-primary',
  success: 'bg-success-primary hover:bg-success-primary-hover text-success-onprimary',
  error: 'bg-error-primary hover:bg-error-primary-hover text-error-onprimary',
};

export function Button({ children, className, variant = 'brand', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}