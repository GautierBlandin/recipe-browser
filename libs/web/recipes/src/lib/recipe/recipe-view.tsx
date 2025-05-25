import { Recipe, formatRecipeIngredient } from '../models';

interface RecipeViewProps {
  recipe: Recipe;
}

export function RecipeView({ recipe }: RecipeViewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutral-primary mb-8">{recipe.name}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Description */}
        {recipe.description && (
          <div className="bg-neutral-primary rounded-lg shadow-md p-6 border border-neutral-primary md:col-span-2">
            <h2 className="text-xl font-semibold text-neutral-primary mb-3">Description</h2>
            <p className="text-neutral-secondary">{recipe.description}</p>
          </div>
        )}

        {/* Recipe Info */}
        {(recipe.cookingTimeMinutes || recipe.servings) && (
          <div className="bg-neutral-primary rounded-lg shadow-md p-6 border border-neutral-primary">
            <h2 className="text-xl font-semibold text-neutral-primary mb-3">Recipe Info</h2>
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
          </div>
        )}

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="bg-neutral-primary rounded-lg shadow-md p-6 border border-neutral-primary">
            <h2 className="text-xl font-semibold text-neutral-primary mb-3">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-neutral-secondary flex items-center">
                  <span className="w-2 h-2 bg-neutral-tertiary rounded-full mr-3 flex-shrink-0"></span>
                  {formatRecipeIngredient(ingredient)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps */}
        {recipe.steps && recipe.steps.length > 0 && (
          <div className="bg-neutral-primary rounded-lg shadow-md p-6 border border-neutral-primary md:col-span-2">
            <h2 className="text-xl font-semibold text-neutral-primary mb-3">Cooking Instructions</h2>
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
          </div>
        )}
      </div>
    </div>
  );
}
