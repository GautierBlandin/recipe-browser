import { render, screen } from '@testing-library/react';
import { buildTestRecipe } from '../../models/recipe.sample';
import { RecipeContainer } from '../recipe.container';
import { RecipesRepository } from '../../ports';
import { TestContainer } from '../../test-infrastructure';

describe('RecipeContainer', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  const renderComponent = (recipeId: string) => {
    return render(
      <TestContainer recipesRepository={repository}>
        <RecipeContainer id={recipeId} />
      </TestContainer>
    );
  };

  it('should display recipe not found when recipe does not exist', () => {
    renderComponent('non-existent-id');
    expect(screen.getByText('Recipe not found')).toBeTruthy();
  });

  it('should display recipe view when recipe exists', () => {
    const recipe = buildTestRecipe({
      id: '1',
      name: 'Chocolate Cake',
      description: 'A rich chocolate cake',
      ingredients: [
        { name: 'flour', portion: { quantity: 2, unit: 'cups' } },
        { name: 'sugar', portion: { quantity: 1, unit: 'cup' } }
      ],
      steps: ['Mix ingredients', 'Bake for 30 minutes'],
      cookingTimeMinutes: 45,
      servings: 8
    });
    repository.setRecipes([recipe]);

    renderComponent('1');

    expect(screen.getByText('Chocolate Cake')).toBeTruthy();
    expect(screen.getByText('A rich chocolate cake')).toBeTruthy();
    expect(screen.getByText('2 cups flour')).toBeTruthy();
    expect(screen.getByText('1 cup sugar')).toBeTruthy();
    expect(screen.getByText('Mix ingredients')).toBeTruthy();
    expect(screen.getByText('Bake for 30 minutes')).toBeTruthy();
    expect(screen.getByText('45 minutes')).toBeTruthy();
    expect(screen.getByText('8')).toBeTruthy();
  });

  it('should handle multiple recipes and display the correct one', () => {
    const recipes = [
      buildTestRecipe({ id: '1' }),
      buildTestRecipe({ id: '2', name: 'Banana Bread' }),
      buildTestRecipe({ id: '3' }),
    ];
    repository.setRecipes(recipes);

    renderComponent('2');

    expect(screen.getByText('Banana Bread')).toBeTruthy();
  });

  it('should display ingredients without portions', () => {
    const recipe = buildTestRecipe({
      id: '1',
      name: 'No Portion Recipe',
      ingredients: [
        { name: 'salt' },
        { name: 'pepper' }
      ]
    });
    repository.setRecipes([recipe]);

    renderComponent('1');

    expect(screen.getByText('salt')).toBeTruthy();
    expect(screen.getByText('pepper')).toBeTruthy();
  });

  it('should display edit recipe button', () => {
    const recipe = buildTestRecipe({
      id: '1',
    });
    repository.setRecipes([recipe]);

    renderComponent('1');

    expect(screen.getByRole('button', { name: 'Edit Recipe' })).toBeTruthy();
  });
});
