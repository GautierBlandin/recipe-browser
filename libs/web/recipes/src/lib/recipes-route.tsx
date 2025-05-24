import { Route } from 'react-router-dom';
import { RecipesList } from './recipes-list';
import { Recipe } from './recipe';

export const recipesRoute = (
  <Route path="/recipes">
    <Route index element={<RecipesList />} />
    <Route path=":id" element={<Recipe />} />
  </Route>
);
