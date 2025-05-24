import { ReactNode } from 'react';
import { HashRouter, Routes } from 'react-router-dom';
import { recipesRoute } from '../recipes-route';

interface TestContainerProps {
  children: ReactNode;
}

export function TestContainer({ children }: TestContainerProps) {
  return (
    <HashRouter>
      <Routes>
        {recipesRoute}
      </Routes>
      {children}
    </HashRouter>
  );
}