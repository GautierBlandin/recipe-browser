import { Portion } from './portion';

export interface RecipeIngredient {
  name: string;
  portion?: Portion;
}

export function formatRecipeIngredient(ingredient: RecipeIngredient): string {
  if (!ingredient.portion) {
    return ingredient.name;
  }
  return `${ingredient.portion.quantity} ${ingredient.portion.unit} ${ingredient.name}`;
}