import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../models';
import { RECIPES_ROUTE } from '../recipes-route.constants';
import { Card, CardTitle, PageHeading } from '@recipe-browser/shared-ui';

interface RecipesListProps {
  recipes: Recipe[];
  onCreateRecipe: (name: string) => void;
}

export function RecipesListView(props: RecipesListProps) {
  const [showForm, setShowForm] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = recipeName.trim();
    
    if (!name) {
      setError('Recipe name is required');
      return;
    }
    
    setError('');
    props.onCreateRecipe(name);
    setRecipeName('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setRecipeName('');
    setError('');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageHeading>My Recipe Collection</PageHeading>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            data-testid="add-recipe-button"
          >
            Add Recipe
          </button>
        )}
      </div>

      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="recipe-name" className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Name
              </label>
              <input
                id="recipe-name"
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter recipe name..."
                autoFocus
                data-testid="recipe-name-input"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600" data-testid="error-message">
                  {error}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                data-testid="submit-recipe-button"
              >
                Create Recipe
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
                data-testid="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.recipes.map((recipe) => (
          <Link key={recipe.id} to={`${RECIPES_ROUTE}/${recipe.id}`}>
            <Card className="cursor-pointer hover:bg-neutral-primary-hover transition-shadow duration-200">
              <CardTitle className="mb-2">
                {recipe.name}
              </CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
