import { useNavigate } from 'react-router-dom';
import { RecipesListView } from './recipes-list.view';
import { RecipesRepository } from '../ports';
import { NavbarLayout } from '../navigation';
import { RECIPES_ROUTE } from '../recipes-route.constants';

interface RecipesContainerProps {
  recipesRepository: RecipesRepository;
}

export function RecipesListContainer({ recipesRepository }: RecipesContainerProps) {
  const navigate = useNavigate();
  const recipes = recipesRepository.getAllRecipes();

  const handleCreateRecipe = (name: string) => {
    const newRecipe = recipesRepository.createRecipe(name);
    navigate(`${RECIPES_ROUTE}/${newRecipe.id}`);
  };

  return <RecipesListView recipes={recipes} onCreateRecipe={handleCreateRecipe} />;
}

const recipesRepository = new RecipesRepository();

export function RecipesList() {
  return (
    <NavbarLayout>
      <RecipesListContainer recipesRepository={recipesRepository} />
    </NavbarLayout>
  );
}
