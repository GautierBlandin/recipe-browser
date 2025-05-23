import { useParams } from 'react-router-dom';
import { RecipesRepository } from '../ports';
import { RecipeView } from './recipe-view';

interface RecipeContainerProps {
  recipesRepository: RecipesRepository;
}

export function RecipeContainer({ recipesRepository }: RecipeContainerProps) {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div className="max-w-4xl mx-auto p-6">Recipe ID not provided</div>;
  }
  
  const recipe = recipesRepository.getRecipe(id);
  
  if (!recipe) {
    return <div className="max-w-4xl mx-auto p-6">Recipe not found</div>;
  }
  
  return <RecipeView recipe={recipe} />;
}