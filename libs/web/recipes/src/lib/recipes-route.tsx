import { Route } from 'react-router-dom';
import { Recipes } from './recipes';
import { Recipe } from './recipe';

export const recipesRoute = (
  <Route path="/recipes">
    <Route index element={<Recipes />} />
    <Route path=":id" element={<Recipe />} />
  </Route>
);
