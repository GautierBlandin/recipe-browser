import { Recipe, RecipeIngredient } from './recipe';

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
      { name: 'flour', portion: { quantity: 2, unit: 'cups' } },
      { name: 'sugar', portion: { quantity: 1, unit: 'cup' } },
      { name: 'butter', portion: { quantity: 0.5, unit: 'cup' } },
      { name: 'eggs', portion: { quantity: 2, unit: 'absolute' } },
      { name: 'vanilla extract' }
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