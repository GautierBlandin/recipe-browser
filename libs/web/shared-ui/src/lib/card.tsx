import { ReactNode } from 'react';
import { cn } from './utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-neutral-primary rounded-lg shadow-md p-6 border border-neutral-primary', className)}>
      {children}
    </div>
  );
}