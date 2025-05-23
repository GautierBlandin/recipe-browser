import { RecipesList } from './recipes-list';
import { RecipesRepository } from './recipes.repository';

const recipesRepository = new RecipesRepository();

export function Recipes() {
  const recipes = recipesRepository.getAllRecipes();
  return <RecipesList recipes={recipes} />;
}
