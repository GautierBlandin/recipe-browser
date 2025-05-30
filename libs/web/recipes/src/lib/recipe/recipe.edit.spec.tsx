import { render, screen, fireEvent } from '@testing-library/react';
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
});