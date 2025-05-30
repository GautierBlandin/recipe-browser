import { Recipe } from '../models';
import { PageHeading, Button, Modal } from '@recipe-browser/shared-ui';
import { RecipeDescriptionView } from './ui/recipe-description.view';
import { RecipeInfoView } from './ui/recipe-info.view';
import { RecipeIngredientsView } from './ui/recipe-ingredients.view';
import { RecipeStepsView } from './ui/recipe-steps.view';

interface RecipeViewProps {
  recipe: Recipe;
  onEditRecipeClicked: () => void;
  isEditModalOpen: boolean;
  onCloseEditModal: () => void;
}

export function RecipeView({ recipe, onEditRecipeClicked, isEditModalOpen, onCloseEditModal }: RecipeViewProps) {
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
      >
        <div>Edit form placeholder</div>
      </Modal>
    </>
  );
}
