import { render, screen } from '@testing-library/react';
import { Recipe } from './models/recipe';
import { RecipesContainer } from './recipes';
import { RecipesRepository } from './recipes.repository';

describe('RecipesContainer', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  it('should render successfully', () => {
    const defaultRecipes: Recipe[] = [
      { id: '1', name: 'Recipe 1' },
      { id: '2', name: 'Recipe 2' },
    ];
    repository.setRecipes(defaultRecipes);
    
    const { baseElement } = render(<RecipesContainer recipesRepository={repository} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display the recipe collection title', () => {
    const defaultRecipes: Recipe[] = [
      { id: '1', name: 'Recipe 1' },
      { id: '2', name: 'Recipe 2' },
    ];
    repository.setRecipes(defaultRecipes);
    
    render(<RecipesContainer recipesRepository={repository} />);
    expect(screen.getByText('My Recipe Collection')).toBeTruthy();
  });

  it('should display specific recipe names', () => {
    const recipes: Recipe[] = [
      { id: '1', name: 'Roasted Chicken' },
      { id: '2', name: 'Pasta Pesto' },
    ];
    repository.setRecipes(recipes);
    
    render(<RecipesContainer recipesRepository={repository} />);

    expect(screen.getByText('Roasted Chicken')).toBeTruthy();
    expect(screen.getByText('Pasta Pesto')).toBeTruthy();
  });

  it('should display click instructions for each recipe', () => {
    const recipes: Recipe[] = [
      { id: '1', name: 'Recipe 1' },
      { id: '2', name: 'Recipe 2' },
      { id: '3', name: 'Recipe 3' },
    ];
    repository.setRecipes(recipes);
    
    render(<RecipesContainer recipesRepository={repository} />);

    const clickInstructions = screen.getAllByText('Click to view recipe');
    expect(clickInstructions).toHaveLength(3);
  });
});
