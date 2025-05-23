import { render, screen } from '@testing-library/react';
import { Recipe } from './models/recipe';
import { RecipesList } from './recipes-list';

describe('RecipesList', () => {
  const defaultRecipes: Recipe[] = [
    { id: 1, name: 'Recipe 1' },
    { id: 2, name: 'Recipe 2' },
  ];

  it('should render successfully', () => {
    const { baseElement } = render(<RecipesList recipes={defaultRecipes} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display the recipe collection title', () => {
    render(<RecipesList recipes={defaultRecipes} />);
    expect(screen.getByText('My Recipe Collection')).toBeTruthy();
  });

  it('should display specific recipe names', () => {
    const recipes: Recipe[] = [
      { id: 1, name: 'Roasted Chicken' },
      { id: 2, name: 'Pasta Pesto' },
    ];
    render(<RecipesList recipes={recipes} />);

    expect(screen.getByText('Roasted Chicken')).toBeTruthy();
    expect(screen.getByText('Pasta Pesto')).toBeTruthy();
  });

  it('should display click instructions for each recipe', () => {
    const recipes: Recipe[] = [
      { id: 1, name: 'Recipe 1' },
      { id: 2, name: 'Recipe 2' },
      { id: 3, name: 'Recipe 3' },
    ];
    render(<RecipesList recipes={recipes} />);

    const clickInstructions = screen.getAllByText('Click to view recipe');
    expect(clickInstructions).toHaveLength(3);
  });
});
