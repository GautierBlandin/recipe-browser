import { Button, Modal, useModal } from '@recipe-browser/shared-ui';
import { RecipeEditForm } from './recipe-edit-form';

export function EditRecipeDialog() {
  const editModal = useModal();

  return (
    <>
      <Button variant="neutral" onClick={editModal.open}>
        Edit Recipe
      </Button>
      
      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        title="Edit Recipe"
        ariaLabel="Edit Recipe"
        size="full"
      >
        <RecipeEditForm
          onCancel={editModal.close}
          onSuccess={editModal.close}
        />
      </Modal>
    </>
  );
}