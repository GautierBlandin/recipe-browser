import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RecipeContainer } from './recipe.container';
import { TestContainer } from '../test-infrastructure';
import { buildTestRecipe } from '../models/recipe.sample';
import { Routes } from 'react-router-dom';
import { recipesRoute } from '../recipes-route';
import { RecipesRepository } from '../ports';
import { RECIPES_ROUTE } from '../recipes-route.constants';

describe('Recipe deletion', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  const renderRecipe = (id: string) => {
    return render(
      <TestContainer recipesRepository={repository}>
        <RecipeContainer id={id} />
      </TestContainer>
    );
  };

  it('should display delete button on recipe page', () => {
    const recipe = buildTestRecipe({ id: '1' });
    repository.setRecipes([recipe]);

    renderRecipe('1');

    expect(screen.getByRole('button', { name: 'Delete Recipe' })).toBeTruthy();
  });

  it('should open delete confirmation dialog when delete button is clicked', async () => {
    const user = userEvent.setup();
    const recipe = buildTestRecipe({ id: '1', name: 'Chocolate Cake' });
    repository.setRecipes([recipe]);

    renderRecipe('1');

    const deleteButton = screen.getByRole('button', { name: 'Delete Recipe' });
    await user.click(deleteButton);

    expect(screen.getByRole('dialog', { name: 'Delete Recipe' })).toBeTruthy();
    expect(screen.getByText('Are you sure you want to delete "Chocolate Cake"? This action cannot be undone.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeTruthy();
  });

  it('should close dialog when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const recipe = buildTestRecipe({ id: '1', name: 'Chocolate Cake' });
    repository.setRecipes([recipe]);

    renderRecipe('1');

    await user.click(screen.getByRole('button', { name: 'Delete Recipe' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByRole('dialog', { name: 'Delete Recipe' })).toBeFalsy();
    expect(repository.getRecipe('1')).toBeTruthy();
  });

  it('should delete recipe when delete is confirmed', async () => {
    const user = userEvent.setup();
    const recipe = buildTestRecipe({ id: '1', name: 'Chocolate Cake' });
    repository.setRecipes([recipe]);

    renderRecipe('1');

    await user.click(screen.getByRole('button', { name: 'Delete Recipe' }));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(repository.getRecipe('1')).toBeFalsy();
  });
});

describe('Recipe deletion integration', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
    window.location.hash = `#${RECIPES_ROUTE}`;
  });

  it('should navigate to recipes list and not show deleted recipe after deletion', async () => {
    const user = userEvent.setup();
    const recipes = [
      buildTestRecipe({ id: '1', name: 'Chocolate Cake' }),
      buildTestRecipe({ id: '2', name: 'Apple Pie' }),
      buildTestRecipe({ id: '3', name: 'Banana Bread' })
    ];
    repository.setRecipes(recipes);

    render(
      <TestContainer recipesRepository={repository}>
        <Routes>
          {recipesRoute}
        </Routes>
      </TestContainer>
    );

    expect(screen.getByText('Chocolate Cake')).toBeTruthy();
    expect(screen.getByText('Apple Pie')).toBeTruthy();
    expect(screen.getByText('Banana Bread')).toBeTruthy();

    await user.click(screen.getByText('Chocolate Cake'));
    
    await waitFor(() => {
      expect(window.location.hash).toBe(`#${RECIPES_ROUTE}/1`);
    });

    expect(screen.getByRole('button', { name: 'Delete Recipe' })).toBeTruthy();
    
    await user.click(screen.getByRole('button', { name: 'Delete Recipe' }));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(window.location.hash).toBe(`#${RECIPES_ROUTE}`);
    });

    expect(screen.queryByText('Chocolate Cake')).toBeFalsy();
    expect(screen.getByText('Apple Pie')).toBeTruthy();
    expect(screen.getByText('Banana Bread')).toBeTruthy();
  });
});
