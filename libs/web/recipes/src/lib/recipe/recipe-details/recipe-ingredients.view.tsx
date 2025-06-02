import { Card, CardTitle } from '@recipe-browser/shared-ui';
import { RecipeIngredient, formatRecipeIngredient } from '../../models';

interface RecipeIngredientsViewProps {
  ingredients?: RecipeIngredient[];
}

export function RecipeIngredientsView({ ingredients }: RecipeIngredientsViewProps) {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <Card aria-label="Recipe ingredients section">
      <CardTitle className="mb-2">Ingredients</CardTitle>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="text-neutral-secondary flex items-center">
            <span className="w-2 h-2 bg-neutral-tertiary rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
            {formatRecipeIngredient(ingredient)}
          </li>
        ))}
      </ul>
    </Card>
  );
}