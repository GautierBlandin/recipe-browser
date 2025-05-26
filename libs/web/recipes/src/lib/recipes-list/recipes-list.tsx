import { useNavigate } from 'react-router-dom';
import { RecipesListView } from './recipes-list.view';
import { NavbarLayout } from '../navigation';
import { RECIPES_ROUTE } from '../recipes-route.constants';
import { useRecipesInfrastructure } from '../infrastructure/recipes-infrastructure.context';

export function RecipesListContainer() {
  const navigate = useNavigate();
  const { recipesRepository } = useRecipesInfrastructure();
  const recipes = recipesRepository.getAllRecipes();

  const handleCreateRecipe = (name: string) => {
    const newRecipe = recipesRepository.createRecipe(name);
    navigate(`${RECIPES_ROUTE}/${newRecipe.id}`);
  };

  return <RecipesListView recipes={recipes} onCreateRecipe={handleCreateRecipe} />;
}

export function RecipesList() {
  return (
    <NavbarLayout>
      <RecipesListContainer />
    </NavbarLayout>
  );
}
