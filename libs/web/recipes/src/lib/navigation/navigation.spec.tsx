import { render, screen, fireEvent } from '@testing-library/react';
import { NavbarLayout } from './navigation';
import { TestContainer } from '../test-infrastructure';
import { RECIPES_ROUTE } from '../recipes-route.constants';

describe('Navigation', () => {
  it('should navigate to recipes page when View Recipes button is clicked', () => {
    render(
      <TestContainer>
        <NavbarLayout>
          <div>Test content</div>
        </NavbarLayout>
      </TestContainer>
    );

    const viewRecipesButton = screen.getByText('View Recipes');
    expect(viewRecipesButton).toBeTruthy();

    // Click the button
    fireEvent.click(viewRecipesButton);

    // Verify navigation occurred by checking the URL hash
    expect(window.location.hash).toBe(`#${RECIPES_ROUTE}`);
  });

  it('should render children content in the main area', () => {
    render(
      <TestContainer>
        <NavbarLayout>
          <div>Child content here</div>
        </NavbarLayout>
      </TestContainer>
    );

    expect(screen.getByText('Child content here')).toBeTruthy();
  });
});
