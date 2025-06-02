import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { buildTestRecipe } from '../../models/recipe.sample';
import { Recipe } from '../recipe';
import { RecipesRepository } from '../../ports';
import { TestContainer } from '../../test-infrastructure';

describe('Recipe Edit Modal', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  const renderWithModalOpen = (recipeId: string) => {
    render(
      <TestContainer recipesRepository={repository}>
        <Recipe id={recipeId} />
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

    // Verify the repository was updated
    expect(repository.getRecipe('1')?.name).toBe('Updated Name');
  });

  it('should display description input field with current recipe description', () => {
    const recipe = buildTestRecipe({
      id: '1',
      description: 'A delicious test recipe'
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    const descriptionInput = screen.getByLabelText('Description') as HTMLTextAreaElement;
    expect(descriptionInput).toBeTruthy();
    expect(descriptionInput.value).toBe('A delicious test recipe');
  });

  it('should update recipe description when form is saved', async () => {
    const recipe = buildTestRecipe({
      id: '1',
      description: 'Original description'
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    // Change the description
    const descriptionInput = screen.getByLabelText('Description') as HTMLTextAreaElement;
    fireEvent.change(descriptionInput, { target: { value: 'Updated description' } });

    // Submit the form
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    // Wait for the recipe description to be updated in the view
    await waitFor(() => {
      expect(screen.getByText('Updated description')).toBeTruthy();
    });

    // Verify the repository was updated
    expect(repository.getRecipe('1')?.description).toBe('Updated description');
  });

  it('should display ingredients input field with current recipe ingredients', () => {
    const recipe = buildTestRecipe({
      id: '1',
      ingredients: [
        { name: 'Flour', portion: { quantity: 2, unit: 'cups' } },
        { name: 'Sugar', portion: { quantity: 1, unit: 'cup' } }
      ]
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    const ingredientsInput = screen.getByLabelText('Ingredients') as HTMLTextAreaElement;
    expect(ingredientsInput).toBeTruthy();
    expect(ingredientsInput.value).toBe('2 cups Flour\n1 cup Sugar');
  });

  it('should update recipe ingredients when form is saved', async () => {
    const recipe = buildTestRecipe({
      id: '1',
      ingredients: [{ name: 'Original ingredient' }]
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    // Change the ingredients
    const ingredientsInput = screen.getByLabelText('Ingredients') as HTMLTextAreaElement;
    fireEvent.change(ingredientsInput, { target: { value: 'Updated ingredient\nSecond ingredient' } });

    // Submit the form
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    // Wait for the recipe ingredients to be updated in the view
    await waitFor(() => {
      expect(screen.getByText('Updated ingredient')).toBeTruthy();
      expect(screen.getByText('Second ingredient')).toBeTruthy();
    });

    // Verify the repository was updated
    const updatedRecipe = repository.getRecipe('1');
    expect(updatedRecipe?.ingredients).toEqual([
      { name: 'Updated ingredient' },
      { name: 'Second ingredient' }
    ]);
  });

  it('should display steps input field with current recipe steps', () => {
    const recipe = buildTestRecipe({
      id: '1',
      steps: ['First step', 'Second step']
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    const stepsInput = screen.getByLabelText('Steps') as HTMLTextAreaElement;
    expect(stepsInput).toBeTruthy();
    expect(stepsInput.value).toBe('First step\nSecond step');
  });

  it('should update recipe steps when form is saved', async () => {
    const recipe = buildTestRecipe({
      id: '1',
      steps: ['Original step']
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    // Change the steps
    const stepsInput = screen.getByLabelText('Steps') as HTMLTextAreaElement;
    fireEvent.change(stepsInput, { target: { value: 'Updated step\nSecond step' } });

    // Submit the form
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    // Wait for the recipe steps to be updated in the view
    await waitFor(() => {
      expect(screen.getByText('Updated step')).toBeTruthy();
      expect(screen.getByText('Second step')).toBeTruthy();
    });

    // Verify the repository was updated
    expect(repository.getRecipe('1')?.steps).toEqual(['Updated step', 'Second step']);
  });

  it('should display cooking time input field with current recipe cooking time', () => {
    const recipe = buildTestRecipe({
      id: '1',
      cookingTimeMinutes: 60
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    const cookingTimeInput = screen.getByLabelText('Cooking Time (minutes)') as HTMLInputElement;
    expect(cookingTimeInput).toBeTruthy();
    expect(cookingTimeInput.value).toBe('60');
  });

  it('should update recipe cooking time when form is saved', async () => {
    const recipe = buildTestRecipe({
      id: '1',
      cookingTimeMinutes: 30
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    // Change the cooking time
    const cookingTimeInput = screen.getByLabelText('Cooking Time (minutes)') as HTMLInputElement;
    fireEvent.change(cookingTimeInput, { target: { value: '45' } });

    // Submit the form
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    // Wait for the recipe cooking time to be updated in the view
    await waitFor(() => {
      expect(screen.getByText('45 minutes')).toBeTruthy();
    });

    // Verify the repository was updated
    expect(repository.getRecipe('1')?.cookingTimeMinutes).toBe(45);
  });

  it('should display servings input field with current recipe servings', () => {
    const recipe = buildTestRecipe({
      id: '1',
      servings: 8
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    const servingsInput = screen.getByLabelText('Servings') as HTMLInputElement;
    expect(servingsInput).toBeTruthy();
    expect(servingsInput.value).toBe('8');
  });

  it('should update recipe servings when form is saved', async () => {
    const recipe = buildTestRecipe({
      id: '1',
      servings: 4
    });
    repository.setRecipes([recipe]);

    renderWithModalOpen('1');

    // Change the servings
    const servingsInput = screen.getByLabelText('Servings') as HTMLInputElement;
    fireEvent.change(servingsInput, { target: { value: '6' } });

    // Submit the form
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    // Wait for the recipe servings to be updated in the view
    await waitFor(() => {
      expect(screen.getByText('6')).toBeTruthy();
    });

    // Verify the repository was updated
    expect(repository.getRecipe('1')?.servings).toBe(6);
  });
});
