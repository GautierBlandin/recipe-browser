import { render, screen } from '@testing-library/react';
import { buildTestRecipe } from '../models/recipe.sample';
import { RecipeContainer } from './recipe-container';
import { RecipesRepository } from '../ports';
import { TestContainer } from '../test-infrastructure';

describe('RecipeContainer', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  const renderComponent = (recipeId?: string) => {
    return render(
      <TestContainer>
        <RecipeContainer recipesRepository={repository} id={recipeId} />
      </TestContainer>
    );
  };

  it('should display recipe not found when recipe does not exist', () => {
    renderComponent('non-existent-id');
    expect(screen.getByText('Recipe not found')).toBeTruthy();
  });

  it('should display recipe view when recipe exists', () => {
    const recipe = buildTestRecipe({ id: '1', name: 'Chocolate Cake' });
    repository.setRecipes([recipe]);

    renderComponent('1');

    expect(screen.getByText('Chocolate Cake')).toBeTruthy();
    expect(screen.getByText('Recipe details for Chocolate Cake will be displayed here.')).toBeTruthy();
  });

  it('should display recipe with default name when not specified', () => {
    const recipe = buildTestRecipe({ id: 'test-123' });
    repository.setRecipes([recipe]);

    renderComponent('test-123');

    expect(screen.getByText('Test Recipe test-123')).toBeTruthy();
    expect(screen.getByText('Recipe details for Test Recipe test-123 will be displayed here.')).toBeTruthy();
  });

  it('should handle multiple recipes and display the correct one', () => {
    const recipes = [
      buildTestRecipe({ id: '1', name: 'Apple Pie' }),
      buildTestRecipe({ id: '2', name: 'Banana Bread' }),
      buildTestRecipe({ id: '3', name: 'Carrot Cake' }),
    ];
    repository.setRecipes(recipes);

    renderComponent('2');

    expect(screen.getByText('Banana Bread')).toBeTruthy();
    expect(screen.queryByText('Apple Pie')).toBeFalsy();
    expect(screen.queryByText('Carrot Cake')).toBeFalsy();
  });
});
