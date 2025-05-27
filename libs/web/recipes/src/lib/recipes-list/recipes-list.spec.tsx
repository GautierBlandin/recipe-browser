import { render, screen, fireEvent } from '@testing-library/react';
import { buildTestRecipe } from '../models/recipe.sample';
import { RecipesListContainer } from './recipes-list';
import { RecipesRepository } from '../ports';
import { TestContainer } from '../test-infrastructure';
import { RECIPES_ROUTE } from '../recipes-route.constants';

describe('RecipesContainer', () => {
  let repository: RecipesRepository;

    beforeEach(() => {
      repository = new RecipesRepository();
    });

    const renderComponent = () => {
      return render(
        <TestContainer recipesRepository={repository}>
          <RecipesListContainer />
        </TestContainer>
      );
    };

    it('should render successfully', () => {
      const defaultRecipes = [
      buildTestRecipe({ id: '1', name: 'Recipe 1' }),
      buildTestRecipe({ id: '2', name: 'Recipe 2' }),
    ];
    repository.setRecipes(defaultRecipes);

    const { baseElement } = renderComponent();

    expect(baseElement).toBeTruthy();
  });

  it('should display the recipe collection title', () => {
    const defaultRecipes = [
      buildTestRecipe({ id: '1', name: 'Recipe 1' }),
      buildTestRecipe({ id: '2', name: 'Recipe 2' }),
    ];
    repository.setRecipes(defaultRecipes);

    renderComponent();

    expect(screen.getByText('My Recipe Collection')).toBeTruthy();
  });

  it('should display specific recipe names', () => {
    const recipes = [
      buildTestRecipe({ id: '1', name: 'Roasted Chicken' }),
      buildTestRecipe({ id: '2', name: 'Pasta Pesto' }),
    ];
    repository.setRecipes(recipes);

    renderComponent();

    expect(screen.getByText('Roasted Chicken')).toBeTruthy();
    expect(screen.getByText('Pasta Pesto')).toBeTruthy();
  });

  it('should navigate to recipe detail page when a recipe is clicked', () => {
    const recipes = [
      buildTestRecipe({ id: 'recipe-123', name: 'Chocolate Cake' }),
      buildTestRecipe({ id: 'recipe-456', name: 'Apple Pie' }),
    ];
    repository.setRecipes(recipes);

    renderComponent();

    // Find and click on the Chocolate Cake recipe
    const chocolateCakeElement = screen.getByText('Chocolate Cake');
    fireEvent.click(chocolateCakeElement);

    // Verify navigation to the recipe detail page
    expect(window.location.hash).toBe(`#${RECIPES_ROUTE}/recipe-123`);
  });

  it('should navigate to correct recipe when different recipes are clicked', () => {
    const recipes = [
      buildTestRecipe({ id: 'recipe-111', name: 'Banana Bread' }),
      buildTestRecipe({ id: 'recipe-222', name: 'Carrot Cake' }),
    ];
    repository.setRecipes(recipes);

    renderComponent();

    // Click on Carrot Cake
    const carrotCakeElement = screen.getByText('Carrot Cake');
    fireEvent.click(carrotCakeElement);

    // Verify navigation to the correct recipe
    expect(window.location.hash).toBe(`#${RECIPES_ROUTE}/recipe-222`);
  });

  it('should display Add Recipe button', () => {
    repository.setRecipes([]);

    renderComponent();

    expect(screen.getByRole('button', { name: 'Add new recipe' })).toBeTruthy();
    expect(screen.getByText('Add Recipe')).toBeTruthy();
  });

  it('should show modal with form when Add Recipe button is clicked', () => {
    repository.setRecipes([]);

    renderComponent();

    const addButton = screen.getByRole('button', { name: 'Add new recipe' });
    fireEvent.click(addButton);

    expect(screen.getByRole('button', { name: 'Add new recipe' })).toBeTruthy();
    expect(screen.getByRole('textbox', { name: 'Recipe name' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Create recipe' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancel recipe creation' })).toBeTruthy();
  });

  it('should create recipe and navigate when form is submitted with valid name', () => {
    repository.setRecipes([]);

    renderComponent();

    // Open form
    fireEvent.click(screen.getByRole('button', { name: 'Add new recipe' }));

    // Fill in recipe name
    const nameInput = screen.getByRole('textbox', { name: 'Recipe name' });
    fireEvent.change(nameInput, { target: { value: 'New Test Recipe' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Create recipe' }));

    // Verify recipe was created
    const createdRecipes = repository.getAllRecipes();
    expect(createdRecipes).toHaveLength(1);
    expect(createdRecipes[0].name).toBe('New Test Recipe');

    // Verify navigation occurred
    expect(window.location.hash).toMatch(new RegExp(`#${RECIPES_ROUTE}/rcp_`));
  });

  it('should show error when submitting form with empty name', () => {
    repository.setRecipes([]);

    renderComponent();

    // Open form
    fireEvent.click(screen.getByRole('button', { name: 'Add new recipe' }));

    // Submit form without entering name
    fireEvent.click(screen.getByRole('button', { name: 'Create recipe' }));

    // Verify error is shown
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('Recipe name is required')).toBeTruthy();

    // Verify no recipe was created
    expect(repository.getAllRecipes()).toHaveLength(0);
  });

  it('should show error when submitting form with whitespace-only name', () => {
    repository.setRecipes([]);

    renderComponent();

    // Open form
    fireEvent.click(screen.getByRole('button', { name: 'Add new recipe' }));

    // Fill in whitespace-only name
    const nameInput = screen.getByRole('textbox', { name: 'Recipe name' });
    fireEvent.change(nameInput, { target: { value: '   ' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Create recipe' }));

    // Verify error is shown
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('Recipe name is required')).toBeTruthy();

    // Verify no recipe was created
    expect(repository.getAllRecipes()).toHaveLength(0);
  });

  it('should hide form and clear inputs when cancel button is clicked', () => {
    repository.setRecipes([]);

    renderComponent();

    // Open form and enter some text
    fireEvent.click(screen.getByRole('button', { name: 'Add new recipe' }));
    const nameInput = screen.getByRole('textbox', { name: 'Recipe name' });
    fireEvent.change(nameInput, { target: { value: 'Some Recipe' } });

    // Click cancel
    fireEvent.click(screen.getByRole('button', { name: 'Cancel recipe creation' }));

    // Verify form is hidden and Add Recipe button is back
    expect(screen.queryByRole('textbox', { name: 'Recipe name' })).toBeFalsy();
    expect(screen.getByRole('button', { name: 'Add new recipe' })).toBeTruthy();

    // Verify no recipe was created
    expect(repository.getAllRecipes()).toHaveLength(0);
  });

  it('should clear form after successful recipe creation', () => {
    repository.setRecipes([]);

    const { unmount } = renderComponent();

    // Create first recipe
    fireEvent.click(screen.getByRole('button', { name: 'Add new recipe' }));
    const nameInput = screen.getByRole('textbox', { name: 'Recipe name' });
    fireEvent.change(nameInput, { target: { value: 'First Recipe' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create recipe' }));

    // Unmount the component and render again to simulate navigation back
    unmount();
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: 'Add new recipe' }));

    // Verify form is clean
    const newNameInput = screen.getByRole('textbox', { name: 'Recipe name' }) as HTMLInputElement;
    expect(newNameInput.value).toBe('');
  });
});
