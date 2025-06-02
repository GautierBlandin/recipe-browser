import { RecipeDescriptionView } from './recipe-description.view';
import { RecipeInfoView } from './recipe-info.view';
import { RecipeIngredientsView } from './recipe-ingredients.view';
import { RecipeStepsView } from './recipe-steps.view';
import { useRecipeStore } from '../store/recipe-store';

export function RecipeDetails() {
  const recipe = useRecipeStore((state) => state.recipe);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RecipeDescriptionView description={recipe.description} />
      <RecipeInfoView
        cookingTimeMinutes={recipe.cookingTimeMinutes}
        servings={recipe.servings}
      />
      <RecipeIngredientsView ingredients={recipe.ingredients} />
      <RecipeStepsView steps={recipe.steps} />
    </div>
  );
}