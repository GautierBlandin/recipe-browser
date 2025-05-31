import { useState } from 'react';
import { Button, Modal } from '@recipe-browser/shared-ui';
import { RecipeEditForm, RecipeEditFormData } from './recipe-edit-form';

interface UseEditRecipeFormProps {
  onSave: (data: RecipeEditFormData) => void;
}

export function useEditRecipeForm({ onSave }: UseEditRecipeFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  const handleSave = (data: RecipeEditFormData) => {
    onSave(data);
    handleClose();
  };

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
        onSave={handleSave}
        onCancel={handleClose}
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