import { createContext, useContext, ReactNode } from 'react';
import { RecipesRepository } from '../ports';

export interface RecipesInfrastructure {
  recipesRepository: RecipesRepository;
}

const RecipesInfrastructureContext = createContext<RecipesInfrastructure | null>(null);

interface RecipesInfrastructureProviderProps {
  children: ReactNode;
  recipesRepository?: RecipesRepository;
}

export function RecipesInfrastructureProvider({ 
  children, 
  recipesRepository = new RecipesRepository() 
}: RecipesInfrastructureProviderProps) {
  const infrastructure: RecipesInfrastructure = {
    recipesRepository,
  };

  return (
    <RecipesInfrastructureContext.Provider value={infrastructure}>
      {children}
    </RecipesInfrastructureContext.Provider>
  );
}

export function useRecipesInfrastructure(): RecipesInfrastructure {
  const context = useContext(RecipesInfrastructureContext);
  
  if (!context) {
    throw new Error('useRecipesInfrastructure must be used within a RecipesInfrastructureProvider');
  }
  
  return context;
}