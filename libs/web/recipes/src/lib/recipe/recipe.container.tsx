import { RecipeView } from './recipe.view';
import { useRecipesInfrastructure } from '../infrastructure/recipes-infrastructure.context';
import { RecipeStoreProvider } from './store/recipe-store';

interface RecipeContainerProps {
  id: string;
}

export function RecipeContainer({ id }: RecipeContainerProps) {
  const { recipesRepository } = useRecipesInfrastructure();
  const recipe = recipesRepository.getRecipe(id);

  if (!recipe) {
    return <div className="max-w-4xl mx-auto p-6">Recipe not found</div>;
  }

  return (
    <RecipeStoreProvider initialRecipe={recipe}>
      <RecipeView />
    </RecipeStoreProvider>
  );
}
