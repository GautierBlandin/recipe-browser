import { useParams } from 'react-router-dom';
import { RecipesRepository } from '../ports';
import { RecipeContainer } from './recipe-container';
import { NavbarLayout } from '../navigation';

const recipesRepository = new RecipesRepository();

export function Recipe() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <NavbarLayout>
      <RecipeContainer recipesRepository={recipesRepository} id={id} />
    </NavbarLayout>
  );
}