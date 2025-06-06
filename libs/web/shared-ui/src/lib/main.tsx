import { ReactNode } from 'react';
import { cn } from './utils';

interface MainProps {
  children: ReactNode;
  className?: string;
}

export function Main({ children, className }: MainProps) {
  return (
    <main className={cn('flex-1 overflow-auto', className)}>
      <div className="max-w-4xl mx-auto p-6">
        {children}
      </div>
    </main>
  );
}
