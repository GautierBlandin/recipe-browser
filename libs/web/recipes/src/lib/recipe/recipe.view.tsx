import { PageHeading } from '@recipe-browser/shared-ui';
import { RecipeDescriptionView } from './ui/recipe-description.view';
import { RecipeInfoView } from './ui/recipe-info.view';
import { RecipeIngredientsView } from './ui/recipe-ingredients.view';
import { RecipeStepsView } from './ui/recipe-steps.view';
import { useRecipeStore } from './store/recipe-store';
import { EditRecipeDialog } from './edit-recipe-dialog';

export function RecipeView() {
  const recipe = useRecipeStore((state) => state.recipe);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <PageHeading>{recipe.name}</PageHeading>
        <EditRecipeDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecipeDescriptionView description={recipe.description} />
        <RecipeInfoView
          cookingTimeMinutes={recipe.cookingTimeMinutes}
          servings={recipe.servings}
        />
        <RecipeIngredientsView ingredients={recipe.ingredients} />
        <RecipeStepsView steps={recipe.steps} />
      </div>
    </>
  );
}
