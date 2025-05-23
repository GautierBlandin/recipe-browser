import { Recipe } from './recipe';

export function buildTestRecipe({ id, name }: { id: string; name?: string }): Recipe {
  return {
    id,
    name: name ?? `Test Recipe ${id}`,
  };
}