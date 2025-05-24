import { RecipesRepository } from '../ports';
import { RecipeContainer } from './recipe-container';
import { NavbarLayout } from '../navigation';

const recipesRepository = new RecipesRepository();

export function Recipe() {
  return (
    <NavbarLayout>
      <RecipeContainer recipesRepository={recipesRepository} />
    </NavbarLayout>
  );
}