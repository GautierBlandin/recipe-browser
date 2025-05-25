import { Recipe, formatRecipeIngredient } from '../models';
import { Main, Card, PageHeading, SectionHeading } from '@recipe-browser/shared-ui';

interface RecipeViewProps {
  recipe: Recipe;
}

export function RecipeView({ recipe }: RecipeViewProps) {
  return (
    <Main>
      <PageHeading>{recipe.name}</PageHeading>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Description */}
        {recipe.description && (
          <Card className="md:col-span-2">
            <SectionHeading>Description</SectionHeading>
            <p className="text-neutral-secondary">{recipe.description}</p>
          </Card>
        )}

        {/* Recipe Info */}
        {(recipe.cookingTimeMinutes || recipe.servings) && (
          <Card>
            <SectionHeading>Recipe Info</SectionHeading>
            <div className="space-y-2">
              {recipe.cookingTimeMinutes && (
                <div className="flex justify-between">
                  <span className="text-neutral-tertiary">Cooking Time:</span>
                  <span className="text-neutral-primary">{recipe.cookingTimeMinutes} minutes</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex justify-between">
                  <span className="text-neutral-tertiary">Servings:</span>
                  <span className="text-neutral-primary">{recipe.servings}</span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <Card>
            <SectionHeading>Ingredients</SectionHeading>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-neutral-secondary flex items-center">
                  <span className="w-2 h-2 bg-neutral-tertiary rounded-full mr-3 flex-shrink-0"></span>
                  {formatRecipeIngredient(ingredient)}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Steps */}
        {recipe.steps && recipe.steps.length > 0 && (
          <Card className="md:col-span-2">
            <SectionHeading>Cooking Instructions</SectionHeading>
            <ol className="space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="text-neutral-secondary flex">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        )}
      </div>
    </Main>
  );
}
