import { useState } from 'react';
import { Button, Modal } from '@recipe-browser/shared-ui';
import { RecipeEditForm } from './recipe-edit-form';

export function useEditRecipeForm() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const OpenModalButton = () => (
    <Button variant="neutral" onClick={handleOpen}>
      Edit Recipe
    </Button>
  );

  const EditModal = () => (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Recipe"
      ariaLabel="Edit Recipe"
      size="full"
    >
      <RecipeEditForm
        onCancel={handleClose}
        onSuccess={handleClose}
      />
    </Modal>
  );

  return {
    OpenModalButton,
    EditModal,
    isOpen,
    open: handleOpen,
    close: handleClose
  };
}