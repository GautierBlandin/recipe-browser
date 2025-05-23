import { RecipesRepository } from '../ports';
import { RecipeContainer } from './recipe-container';

const recipesRepository = new RecipesRepository();

export function Recipe() {
  return <RecipeContainer recipesRepository={recipesRepository} />;
}