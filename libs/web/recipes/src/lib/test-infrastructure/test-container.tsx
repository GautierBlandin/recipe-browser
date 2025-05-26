import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';
import { RecipesInfrastructureProvider } from '../infrastructure/recipes-infrastructure.context';
import { RecipesRepository } from '../ports';

interface TestContainerProps {
  children: ReactNode;
  recipesRepository?: RecipesRepository;
}

export function TestContainer({ children, recipesRepository }: TestContainerProps) {
  const testRepository = recipesRepository || new RecipesRepository();
  
  return (
    <HashRouter>
      <RecipesInfrastructureProvider recipesRepository={testRepository}>
        {children}
      </RecipesInfrastructureProvider>
    </HashRouter>
  );
}
