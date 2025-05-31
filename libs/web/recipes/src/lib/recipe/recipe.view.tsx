import { Button, Modal, PageHeading } from '@recipe-browser/shared-ui';
import { RecipeDescriptionView } from './ui/recipe-description.view';
import { RecipeInfoView } from './ui/recipe-info.view';
import { RecipeIngredientsView } from './ui/recipe-ingredients.view';
import { RecipeStepsView } from './ui/recipe-steps.view';
import { RecipeEditForm, RecipeEditFormData } from './recipe-edit-form';
import { useRecipeStore } from './store/recipe-store';

interface RecipeViewProps {
  onEditRecipeClicked: () => void;
  isEditModalOpen: boolean;
  onCloseEditModal: () => void;
  onSaveRecipe: (data: RecipeEditFormData) => void;
}

export function RecipeView({ onEditRecipeClicked, isEditModalOpen, onCloseEditModal, onSaveRecipe }: RecipeViewProps) {
  const recipe = useRecipeStore((state) => state.recipe);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <PageHeading>{recipe.name}</PageHeading>
        <Button variant="neutral" onClick={onEditRecipeClicked}>Edit Recipe</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecipeDescriptionView description={recipe.description} />
        <RecipeInfoView
          cookingTimeMinutes={recipe.cookingTimeMinutes}
          servings={recipe.servings}
        />
        <RecipeIngredientsView ingredients={recipe.ingredients} />
        <RecipeStepsView steps={recipe.steps} />
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={onCloseEditModal}
        title="Edit Recipe"
        ariaLabel="Edit Recipe"
        size="full"
      >
        <RecipeEditForm
          onSave={onSaveRecipe}
          onCancel={onCloseEditModal}
        />
      </Modal>
    </>
  );
}
