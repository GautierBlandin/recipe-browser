import { RecipeIngredient } from './recipe-ingredient';
import { Portion } from './portion';
import { buildTestPortion } from './portion.sample';

export function buildTestRecipeIngredient(options: {
  name?: string;
  portion?: Portion | null;
} = {}): RecipeIngredient {
  return {
    name: options.name ?? 'Test Ingredient',
    portion: options.portion === null ? undefined : (options.portion ?? buildTestPortion()),
  };
}