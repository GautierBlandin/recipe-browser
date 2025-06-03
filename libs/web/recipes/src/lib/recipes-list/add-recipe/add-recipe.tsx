import { useState } from 'react';
import { Modal, Button } from '@recipe-browser/shared-ui';

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

  const handleAddRecipeClick = () => {
    if(window.recipeAPI) window.recipeAPI.onAddRecipeClick();
    setShowForm(true);
  };

  return (
    <>
      <Button
        onClick={handleAddRecipeClick}
        aria-label="Add new recipe"
      >
        Add Recipe
      </Button>

      <Modal isOpen={showForm} onClose={handleCancel} title="Add New Recipe">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recipe-name" className="block text-sm font-medium text-neutral-secondary mb-1">
              Recipe Name
            </label>
            <input
              id="recipe-name"
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              placeholder="Enter recipe name..."
              autoFocus
              aria-label="Recipe name"
              aria-describedby={error ? "recipe-name-error" : undefined}
            />
            {error && (
              <p id="recipe-name-error" className="mt-1 text-sm text-error-primary" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="success"
              aria-label="Create recipe"
            >
              Create Recipe
            </Button>
            <Button
              type="button"
              variant="neutral"
              onClick={handleCancel}
              aria-label="Cancel recipe creation"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
