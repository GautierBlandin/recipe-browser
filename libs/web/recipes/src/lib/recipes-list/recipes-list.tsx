import { RecipesListView } from './recipes-list.view';
import { RecipesRepository } from '../ports';

interface RecipesContainerProps {
  recipesRepository: RecipesRepository;
}

export function RecipesListContainer({ recipesRepository }: RecipesContainerProps) {
  const recipes = recipesRepository.getAllRecipes();
  return <RecipesListView recipes={recipes} />;
}

const recipesRepository = new RecipesRepository();

export function RecipesList() {
  return <RecipesListContainer recipesRepository={recipesRepository} />;
}
