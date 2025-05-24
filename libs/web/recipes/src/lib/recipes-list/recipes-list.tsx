import { RecipesListView } from './recipes-list.view';
import { RecipesRepository } from '../ports';
import { NavbarLayout } from '../navigation';

interface RecipesContainerProps {
  recipesRepository: RecipesRepository;
}

export function RecipesListContainer({ recipesRepository }: RecipesContainerProps) {
  const recipes = recipesRepository.getAllRecipes();
  return <RecipesListView recipes={recipes} />;
}

const recipesRepository = new RecipesRepository();

export function RecipesList() {
  return (
    <NavbarLayout>
      <RecipesListContainer recipesRepository={recipesRepository} />
    </NavbarLayout>
  );
}
