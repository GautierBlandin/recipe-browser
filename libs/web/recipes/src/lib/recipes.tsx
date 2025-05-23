import { Recipe } from './models/recipe';
import { RecipesList } from './recipes-list';

const hardcodedRecipes: Recipe[] = [
  { id: 1, name: 'Roasted Chicken' },
  { id: 2, name: 'Pasta Pesto' },
  { id: 3, name: 'Pasta Carbonara' },
  { id: 4, name: 'Pasta Salmon' },
  { id: 5, name: 'Beef Stir Fry' },
  { id: 6, name: 'Chicken Curry' },
  { id: 7, name: 'Mediterranean Salad' },
  { id: 8, name: 'Mushroom Risotto' },
];

export function Recipes() {
  return <RecipesList recipes={hardcodedRecipes} />;
}
