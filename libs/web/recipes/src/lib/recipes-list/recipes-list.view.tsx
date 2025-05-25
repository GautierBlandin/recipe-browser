import { useNavigate } from 'react-router-dom';
import { Recipe } from '../models';
import { RECIPES_ROUTE } from '../recipes-route.constants';

interface RecipesListProps {
  recipes: Recipe[];
}

export function RecipesListView(props: RecipesListProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutral-primary mb-8">My Recipe Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-neutral-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-neutral-primary cursor-pointer hover:bg-neutral-primary-hover"
            onClick={() => navigate(`${RECIPES_ROUTE}/${recipe.id}`)}
          >
            <h3 className="text-lg font-semibold text-neutral-primary mb-2">
              {recipe.name}
            </h3>
            <div className="text-sm text-neutral-muted">
              Click to view recipe
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
