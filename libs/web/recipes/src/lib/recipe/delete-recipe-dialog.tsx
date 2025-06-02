import { Button, Modal, useModal } from '@recipe-browser/shared-ui';
import { useRecipeStore } from './store/recipe-store';
import { useRecipesRepository } from '../infrastructure/recipes-infrastructure.context';
import { useNavigate } from 'react-router-dom';

export function DeleteRecipeDialog() {
  const deleteModal = useModal();
  const recipe = useRecipeStore((state) => state.recipe);
  const repository = useRecipesRepository();
  const navigate = useNavigate();

  const handleDelete = () => {
    const result = repository.deleteRecipe(recipe.id);
    if (result.deleted) {
      navigate('/recipes');
    }
  };

  return (
    <>
      <Button variant="error" onClick={deleteModal.open}>
        Delete Recipe
      </Button>
      
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete Recipe"
        ariaLabel="Delete Recipe"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-neutral-primary">
            Are you sure you want to delete "{recipe.name}"? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-2">
            <Button variant="neutral" onClick={deleteModal.close}>
              Cancel
            </Button>
            <Button variant="error" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}