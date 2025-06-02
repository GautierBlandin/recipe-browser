import { PageHeading } from '@recipe-browser/shared-ui';
import { useRecipeStore } from './store/recipe-store';
import { EditRecipeDialog } from './recipe-edition/edit-recipe-dialog';
import { DeleteRecipeDialog } from './recipe-deletion/delete-recipe-dialog';
import { RecipeDetails } from './recipe-details';

export function RecipeView() {
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
