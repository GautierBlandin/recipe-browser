import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { buildTestRecipe } from '../models/recipe.sample';
import { RecipeContainer } from './recipe.container';
import { RecipesRepository } from '../ports';
import { TestContainer } from '../test-infrastructure';

describe('Recipe Edit Modal', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  const renderWithModalOpen = (recipeId: string) => {
    render(
      <TestContainer recipesRepository={repository}>
        <RecipeContainer id={recipeId} />
      </TestContainer>
    );

    const editButton = screen.getByRole('button', { name: 'Edit Recipe' });
    fireEvent.click(editButton);
  };

  it('should open edit modal when edit button is clicked', () => {
    const recipe = buildTestRecipe({
      id: '1',
      name: 'Test Recipe'
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    expect(screen.getByRole('dialog', { name: 'Edit Recipe' })).toBeTruthy();
  });

  it('should display name input field with current recipe name', () => {
    const recipe = buildTestRecipe({
      id: '1',
      name: 'Chocolate Cake'
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    const nameInput = screen.getByLabelText('Recipe Name') as HTMLInputElement;
    expect(nameInput).toBeTruthy();
    expect(nameInput.value).toBe('Chocolate Cake');
  });

  it('should update recipe name when form is saved', async () => {
    const recipe = buildTestRecipe({
      id: '1',
      name: 'Original Name'
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    // Change the name in the input field
    const nameInput = screen.getByLabelText('Recipe Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

    // Submit the form
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    // Wait for the recipe name to be updated in the view
    await waitFor(() => {
      expect(screen.getByText('Updated Name')).toBeTruthy();
    });
  });
});
