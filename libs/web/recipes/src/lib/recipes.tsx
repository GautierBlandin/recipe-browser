import { RecipesList } from './recipes-list';
import { RecipesRepository } from './recipes.repository';

interface RecipesContainerProps {
  recipesRepository: RecipesRepository;
}

export function RecipesContainer({ recipesRepository }: RecipesContainerProps) {
  const recipes = recipesRepository.getAllRecipes();
  return <RecipesList recipes={recipes} />;
}

const recipesRepository = new RecipesRepository();

export function Recipes() {
  return <RecipesContainer recipesRepository={recipesRepository} />;
}
