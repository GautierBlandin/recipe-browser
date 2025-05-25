import { Recipe } from './recipe';
import { RecipeIngredient } from './recipe-ingredient';
import { buildTestRecipeIngredient } from './recipe-ingredient.sample';
import { buildTestPortion } from './portion.sample';

export function buildTestRecipe({ 
  id, 
  name,
  description,
  ingredients,
  steps,
  cookingTimeMinutes,
  servings
}: { 
  id: string; 
  name?: string;
  description?: string;
  ingredients?: RecipeIngredient[];
  steps?: string[];
  cookingTimeMinutes?: number;
  servings?: number;
}): Recipe {
  return {
    id,
    name: name ?? `Test Recipe ${id}`,
    description: description ?? `A delicious test recipe for ${name ?? `Test Recipe ${id}`}`,
    ingredients: ingredients ?? [
      buildTestRecipeIngredient({ name: 'flour', portion: buildTestPortion({ quantity: 2, unit: 'cups' }) }),
      buildTestRecipeIngredient({ name: 'sugar', portion: buildTestPortion({ quantity: 1, unit: 'cup' }) }),
      buildTestRecipeIngredient({ name: 'butter', portion: buildTestPortion({ quantity: 0.5, unit: 'cup' }) }),
      buildTestRecipeIngredient({ name: 'eggs', portion: buildTestPortion({ quantity: 2, unit: 'absolute' }) }),
      buildTestRecipeIngredient({ name: 'vanilla extract', portion: null })
    ],
    steps: steps ?? [
      'Preheat oven to 350°F',
      'Mix dry ingredients in a large bowl',
      'Cream butter and sugar in separate bowl',
      'Add eggs and vanilla to butter mixture',
      'Combine wet and dry ingredients',
      'Bake for 25-30 minutes'
    ],
    cookingTimeMinutes: cookingTimeMinutes ?? 45,
    servings: servings ?? 6,
  };
}