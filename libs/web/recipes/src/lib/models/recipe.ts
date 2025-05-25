export interface Recipe {
  id: string;
  name: string;
  description?: string;
  ingredients?: RecipeIngredient[];
  steps?: string[];
  cookingTimeMinutes?: number;
  servings?: number;
}

export interface RecipeIngredient {
  name: string;
  portion?: Portion;
}

export function formatIngredient(ingredient: RecipeIngredient): string {
  if (!ingredient.portion) {
    return ingredient.name;
  }
  return `${ingredient.portion.quantity} ${ingredient.portion.unit} ${ingredient.name}`;
}

export interface Portion {
  unit: string;
  quantity: number;
}