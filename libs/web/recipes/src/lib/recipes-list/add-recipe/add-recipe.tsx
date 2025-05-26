import { useState } from 'react';
import { Card, Button } from '@recipe-browser/shared-ui';

interface AddRecipeProps {
  onCreateRecipe: (name: string) => void;
}

export function AddRecipe({ onCreateRecipe }: AddRecipeProps) {
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
    onCreateRecipe(name);
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
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          data-testid="add-recipe-button"
        >
          Add Recipe
        </Button>
      )}

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
              <Button
                type="submit"
                variant="success"
                data-testid="submit-recipe-button"
              >
                Create Recipe
              </Button>
              <Button
                type="button"
                variant="neutral"
                onClick={handleCancel}
                data-testid="cancel-button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}