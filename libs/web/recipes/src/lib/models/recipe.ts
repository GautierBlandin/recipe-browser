import { RecipeIngredient } from './recipe-ingredient';

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  ingredients?: RecipeIngredient[];
  steps?: string[];
  cookingTimeMinutes?: number;
  servings?: number;
}
