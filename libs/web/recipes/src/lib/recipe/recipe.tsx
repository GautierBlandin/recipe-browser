import { useRecipesInfrastructure } from '../infrastructure/recipes-infrastructure.context';
import { RecipeStoreProvider, useRecipeStore } from './store/recipe-store';
import { PageHeading } from '@recipe-browser/shared-ui';
import { EditRecipeDialog } from './recipe-edition/edit-recipe-dialog';
import { DeleteRecipeDialog } from './recipe-deletion/delete-recipe-dialog';
import { RecipeDetails } from './recipe-details';

interface RecipeProps {
  id: string;
}

export function Recipe({ id }: RecipeProps) {
  const { recipesRepository } = useRecipesInfrastructure();
  const recipe = recipesRepository.getRecipe(id);

  if (!recipe) {
    return <div className="max-w-4xl mx-auto p-6">Recipe not found</div>;
  }

  return (
    <RecipeStoreProvider initialRecipe={recipe}>
      <RecipeContent />
    </RecipeStoreProvider>
  );
}

export function RecipeContent() {
  const recipe = useRecipeStore((state) => state.recipe);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <PageHeading>{recipe.name}</PageHeading>
        <div className="flex gap-2">
          <EditRecipeDialog />
          <DeleteRecipeDialog />
        </div>
      </div>

      <RecipeDetails />
    </>
  );
}
