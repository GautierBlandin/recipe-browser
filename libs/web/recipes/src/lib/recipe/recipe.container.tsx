import { useState } from 'react';
import { RecipeView } from './recipe.view';
import { useRecipesInfrastructure } from '../infrastructure/recipes-infrastructure.context';

interface RecipeContainerProps {
  id?: string;
}

export function RecipeContainer({ id }: RecipeContainerProps) {
  const { recipesRepository } = useRecipesInfrastructure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  if (!id) {
    return <div className="max-w-4xl mx-auto p-6">Recipe ID not provided</div>;
  }

  const recipe = recipesRepository.getRecipe(id);

  if (!recipe) {
    return <div className="max-w-4xl mx-auto p-6">Recipe not found</div>;
  }

  const handleEditRecipeClicked = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <RecipeView 
      recipe={recipe} 
      onEditRecipeClicked={handleEditRecipeClicked}
      isEditModalOpen={isEditModalOpen}
      onCloseEditModal={handleCloseModal}
    />
  );
}
