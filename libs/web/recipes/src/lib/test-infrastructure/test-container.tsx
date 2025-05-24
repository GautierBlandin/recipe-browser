import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';

interface TestContainerProps {
  children: ReactNode;
}

export function TestContainer({ children }: TestContainerProps) {
  return (
    <HashRouter>
      {children}
    </HashRouter>
  );
}
