import { render, screen } from '@testing-library/react';

import Recipes from './recipes';

describe('Recipes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Recipes />);
    expect(baseElement).toBeTruthy();
  });

  it('should display the recipe collection title', () => {
    render(<Recipes />);
    expect(screen.getByText('My Recipe Collection')).toBeTruthy();
  });

  it('should display hardcoded recipes', () => {
    render(<Recipes />);

    expect(screen.getByText('Roasted Chicken')).toBeTruthy();
  });

  it('should display click instructions for each recipe', () => {
    render(<Recipes />);

    const clickInstructions = screen.getAllByText('Click to view recipe');
    expect(clickInstructions).toHaveLength(8);
  });
});
