import { useState } from 'react';
import { RecipeView } from './recipe.view';
import { useRecipesInfrastructure } from '../infrastructure/recipes-infrastructure.context';
import { RecipeEditFormData } from './recipe-edit-form';

interface RecipeContainerProps {
  id: string;
}

export function RecipeContainer({ id }: RecipeContainerProps) {
  const { recipesRepository } = useRecipesInfrastructure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [recipe, setRecipe] = useState(() => recipesRepository.getRecipe(id));

  if (!recipe) {
    return <div className="max-w-4xl mx-auto p-6">Recipe not found</div>;
  }

  const handleEditRecipeClicked = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveRecipe = (data: RecipeEditFormData) => {
    const updatedRecipe = recipesRepository.updateRecipe(id, data);
    if (updatedRecipe) {
      setRecipe(updatedRecipe);
    }
    setIsEditModalOpen(false);
  };

  return (
    <RecipeView
      recipe={recipe}
      onEditRecipeClicked={handleEditRecipeClicked}
      isEditModalOpen={isEditModalOpen}
      onCloseEditModal={handleCloseModal}
      onSaveRecipe={handleSaveRecipe}
    />
  );
}
