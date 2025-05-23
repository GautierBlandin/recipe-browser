import { Recipe } from '../models';

interface RecipeViewProps {
  recipe: Recipe;
}

export function RecipeView({ recipe }: RecipeViewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{recipe.name}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <p className="text-gray-600">Recipe details for {recipe.name} will be displayed here.</p>
      </div>
    </div>
  );
}