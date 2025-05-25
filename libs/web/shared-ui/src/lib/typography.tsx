import { ReactNode } from 'react';
import { cn } from './utils';

interface PageHeadingProps {
  children: ReactNode;
  className?: string;
}

export function PageHeading({ children, className }: PageHeadingProps) {
  return (
    <h1 className={cn('text-3xl font-bold text-neutral-primary mb-8', className)}>
      {children}
    </h1>
  );
}

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 className={cn('text-xl font-semibold text-neutral-primary', className)}>
      {children}
    </h2>
  );
}

interface SmallTextProps {
  children: ReactNode;
  className?: string;
}

export function SmallText({ children, className }: SmallTextProps) {
  return (
    <div className={cn('text-sm text-neutral-muted', className)}>
      {children}
    </div>
  );
}
