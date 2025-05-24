import { render, screen } from '@testing-library/react';
import { buildTestRecipe } from '../models/recipe.sample';
import { RecipesListContainer } from './recipes-list';
import { RecipesRepository } from '../ports';
import { TestContainer } from '../test-infrastructure';

describe('RecipesContainer', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  it('should render successfully', () => {
    const defaultRecipes = [
      buildTestRecipe({ id: '1', name: 'Recipe 1' }),
      buildTestRecipe({ id: '2', name: 'Recipe 2' }),
    ];
    repository.setRecipes(defaultRecipes);

    const { baseElement } = render(
      <TestContainer>
        <RecipesListContainer recipesRepository={repository} />
      </TestContainer>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display the recipe collection title', () => {
    const defaultRecipes = [
      buildTestRecipe({ id: '1', name: 'Recipe 1' }),
      buildTestRecipe({ id: '2', name: 'Recipe 2' }),
    ];
    repository.setRecipes(defaultRecipes);

    render(
      <TestContainer>
        <RecipesListContainer recipesRepository={repository} />
      </TestContainer>
    );
    expect(screen.getByText('My Recipe Collection')).toBeTruthy();
  });

  it('should display specific recipe names', () => {
    const recipes = [
      buildTestRecipe({ id: '1', name: 'Roasted Chicken' }),
      buildTestRecipe({ id: '2', name: 'Pasta Pesto' }),
    ];
    repository.setRecipes(recipes);

    render(
      <TestContainer>
        <RecipesListContainer recipesRepository={repository} />
      </TestContainer>
    );

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

    render(
      <TestContainer>
        <RecipesListContainer recipesRepository={repository} />
      </TestContainer>
    );

    const clickInstructions = screen.getAllByText('Click to view recipe');
    expect(clickInstructions).toHaveLength(3);
  });
});
