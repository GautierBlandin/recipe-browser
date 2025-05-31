import { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';
import { Recipe } from '../../models';

interface RecipeState {
  recipe: Recipe;
}

interface RecipeActions {
  setRecipe: (recipe: Recipe) => void;
}

export type RecipeStore = RecipeState & RecipeActions;

const createRecipeStore = (initialRecipe: Recipe) =>
  createStore<RecipeStore>((set) => ({
    recipe: initialRecipe,
    setRecipe: (recipe) => set({ recipe }),
  }));

type RecipeStoreApi = ReturnType<typeof createRecipeStore>;

const RecipeStoreContext = createContext<RecipeStoreApi | undefined>(undefined);

export interface RecipeStoreProviderProps {
  children: React.ReactNode;
  initialRecipe: Recipe;
}

export function RecipeStoreProvider({
  children,
  initialRecipe,
}: RecipeStoreProviderProps) {
  const storeRef = useRef<RecipeStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createRecipeStore(initialRecipe);
  }

  return (
    <RecipeStoreContext.Provider value={storeRef.current}>
      {children}
    </RecipeStoreContext.Provider>
  );
}

export function useRecipeStore<T>(selector: (state: RecipeStore) => T): T {
  const store = useContext(RecipeStoreContext);
  if (!store) {
    throw new Error('useRecipeStore must be used within RecipeStoreProvider');
  }
  return useStore(store, selector);
}