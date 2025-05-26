import { render, screen, fireEvent } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { RecipesList } from './recipes-list';
import { Recipe } from '../recipe/recipe';
import { RecipesRepository } from '../ports';
import { TestContainer } from '../test-infrastructure';
import { RECIPES_ROUTE } from '../recipes-route.constants';

describe('RecipesList Integration', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  const renderIntegrationTest = () => {
    // Set the hash before rendering
    window.location.hash = RECIPES_ROUTE;

    return render(
      <TestContainer recipesRepository={repository}>
        <Routes>
          <Route path={RECIPES_ROUTE} element={<RecipesList />} />
          <Route path={`${RECIPES_ROUTE}/:id`} element={<Recipe />} />
        </Routes>
      </TestContainer>
    );
  };

  it('should create recipe and navigate to detail page showing recipe name', () => {
    // Start with empty recipes
    repository.setRecipes([]);

    // Render starting at recipes route
    renderIntegrationTest();

    // Verify we're on the recipes list page
    expect(screen.getByText('My Recipe Collection')).toBeTruthy();
    expect(screen.getByTestId('add-recipe-button')).toBeTruthy();

    // Open the create form
    fireEvent.click(screen.getByTestId('add-recipe-button'));

    // Fill in recipe name
    const nameInput = screen.getByTestId('recipe-name-input');
    fireEvent.change(nameInput, { target: { value: 'Integration Test Recipe' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-recipe-button'));

    // Verify navigation occurred and recipe name is displayed on detail page
    expect(screen.getByText('Integration Test Recipe')).toBeTruthy();

    // Verify we're no longer on the recipes list page
    expect(screen.queryByText('My Recipe Collection')).toBeFalsy();

    // Verify the URL changed to the recipe detail page
    expect(window.location.hash).toMatch(new RegExp(`#${RECIPES_ROUTE}/rcp_`));
  });
});
