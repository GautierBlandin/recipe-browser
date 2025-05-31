import { useState } from 'react';
import { RecipeView } from './recipe.view';
import { useRecipesInfrastructure } from '../infrastructure/recipes-infrastructure.context';
import { RecipeEditFormData } from './recipe-edit-form';
import { RecipeIngredient } from '../models';

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

  const parseIngredientsFromText = (ingredientsText?: string): RecipeIngredient[] => {
    if (!ingredientsText || ingredientsText.trim() === '') return [];
    return ingredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => ({ name: line }));
  };

  const parseStepsFromText = (stepsText?: string): string[] => {
    if (!stepsText || stepsText.trim() === '') return [];
    return stepsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  const handleSaveRecipe = (data: RecipeEditFormData) => {
    const updateData = {
      name: data.name,
      description: data.description,
      ingredients: data.ingredients ? parseIngredientsFromText(data.ingredients) : undefined,
      steps: data.steps ? parseStepsFromText(data.steps) : undefined,
      cookingTimeMinutes: data.cookingTimeMinutes,
      servings: data.servings
    };
    
    const updatedRecipe = recipesRepository.updateRecipe(id, updateData);
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
