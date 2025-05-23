import { Recipe } from '../models';

interface RecipesListProps {
  recipes: Recipe[];
}

export function RecipesList(props: RecipesListProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Recipe Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {recipe.name}
            </h3>
            <div className="text-sm text-gray-500">
              Click to view recipe
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}