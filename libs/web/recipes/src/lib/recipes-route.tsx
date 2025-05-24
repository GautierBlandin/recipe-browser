import { Route } from 'react-router-dom';
import { RecipesList } from './recipes-list';
import { Recipe } from './recipe';
import { RECIPES_ROUTE } from './recipes-route.constants';

export const recipesRoute = (
  <Route path={RECIPES_ROUTE}>
    <Route index element={<RecipesList />} />
    <Route path=":id" element={<Recipe />} />
  </Route>
);
