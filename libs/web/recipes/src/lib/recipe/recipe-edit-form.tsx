import { useForm } from 'react-hook-form';
import { RecipeIngredient, formatRecipeIngredient } from '../models';
import { Button } from '@recipe-browser/shared-ui';
import { useRecipeStore } from './store/recipe-store';
import { useRecipesInfrastructure } from '../infrastructure/recipes-infrastructure.context';

export interface RecipeEditFormData {
  name: string;
  description?: string;
  ingredients?: string;
  steps?: string;
  cookingTimeMinutes?: number;
  servings?: number;
}

interface RecipeEditFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

function formatIngredientsAsText(ingredients?: RecipeIngredient[]): string {
  if (!ingredients || ingredients.length === 0) return '';
  return ingredients.map(formatRecipeIngredient).join('\n');
}

function formatStepsAsText(steps?: string[]): string {
  if (!steps || steps.length === 0) return '';
  return steps.join('\n');
}

function parseIngredientsFromText(ingredientsText?: string): RecipeIngredient[] {
  if (!ingredientsText || ingredientsText.trim() === '') return [];
  return ingredientsText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => ({ name: line }));
}

function parseStepsFromText(stepsText?: string): string[] {
  if (!stepsText || stepsText.trim() === '') return [];
  return stepsText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

export function RecipeEditForm({ onCancel, onSuccess }: RecipeEditFormProps) {
  const recipe = useRecipeStore((state) => state.recipe);
  const setRecipe = useRecipeStore((state) => state.setRecipe);
  const { recipesRepository } = useRecipesInfrastructure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RecipeEditFormData>({
    defaultValues: {
      name: recipe.name,
      description: recipe.description,
      ingredients: formatIngredientsAsText(recipe.ingredients),
      steps: formatStepsAsText(recipe.steps),
      cookingTimeMinutes: recipe.cookingTimeMinutes,
      servings: recipe.servings
    }
  });

  const onSubmit = (data: RecipeEditFormData) => {
    const updateData = {
      name: data.name,
      description: data.description,
      ingredients: data.ingredients ? parseIngredientsFromText(data.ingredients) : undefined,
      steps: data.steps ? parseStepsFromText(data.steps) : undefined,
      cookingTimeMinutes: data.cookingTimeMinutes,
      servings: data.servings
    };

    const updatedRecipe = recipesRepository.updateRecipe(recipe.id, updateData);
    if (updatedRecipe) {
      setRecipe(updatedRecipe);
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-neutral-primary mb-2">
            Recipe Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-neutral-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            {...register('name', {
              required: 'Recipe name is required',
              minLength: {
                value: 2,
                message: 'Recipe name must be at least 2 characters long'
              }
            })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error-primary">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cookingTimeMinutes" className="block text-sm font-medium text-neutral-primary mb-2">
              Cooking Time (minutes)
            </label>
            <input
              id="cookingTimeMinutes"
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-neutral-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              {...register('cookingTimeMinutes', {
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: 'Cooking time must be at least 1 minute'
                }
              })}
            />
            {errors.cookingTimeMinutes && (
              <p className="mt-1 text-sm text-error-primary">{errors.cookingTimeMinutes.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-neutral-primary mb-2">
              Servings
            </label>
            <input
              id="servings"
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-neutral-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              {...register('servings', {
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: 'Servings must be at least 1'
                }
              })}
            />
            {errors.servings && (
              <p className="mt-1 text-sm text-error-primary">{errors.servings.message}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-primary mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="w-full px-3 py-2 border border-neutral-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-vertical"
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-neutral-primary mb-2">
            Ingredients
          </label>
          <textarea
            id="ingredients"
            rows={8}
            placeholder="Enter each ingredient on a new line"
            className="w-full px-3 py-2 border border-neutral-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-vertical"
            {...register('ingredients')}
          />
        </div>

        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-neutral-primary mb-2">
            Steps
          </label>
          <textarea
            id="steps"
            rows={8}
            placeholder="Enter each step on a new line"
            className="w-full px-3 py-2 border border-neutral-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-vertical"
            {...register('steps')}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <Button
          type="button"
          variant="neutral"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="brand"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
