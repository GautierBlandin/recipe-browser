import { useForm } from 'react-hook-form';
import { Recipe } from '../models';
import { Button } from '@recipe-browser/shared-ui';

export interface RecipeEditFormData {
  name: string;
}

interface RecipeEditFormProps {
  recipe: Recipe;
  onSave: (data: RecipeEditFormData) => void;
  onCancel: () => void;
}

export function RecipeEditForm({ recipe, onSave, onCancel }: RecipeEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RecipeEditFormData>({
    defaultValues: {
      name: recipe.name
    }
  });

  const onSubmit = (data: RecipeEditFormData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
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

      <div className="flex justify-end space-x-3 pt-4">
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