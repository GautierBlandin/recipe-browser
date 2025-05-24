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
        <TestContainer>
          <RecipesListContainer recipesRepository={repository} />
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

  it('should display click instructions for each recipe', () => {
    const recipes = [
      buildTestRecipe({ id: '1', name: 'Recipe 1' }),
      buildTestRecipe({ id: '2', name: 'Recipe 2' }),
      buildTestRecipe({ id: '3', name: 'Recipe 3' }),
    ];
    repository.setRecipes(recipes);

    renderComponent();

    const clickInstructions = screen.getAllByText('Click to view recipe');
    expect(clickInstructions).toHaveLength(3);
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
});
