import { describe, it, expect, beforeEach } from 'vitest';
import { RecipesRepository } from './recipes.repository';
import { buildTestRecipe } from '../models/recipe.sample';

describe('RecipesRepository', () => {
  let repository: RecipesRepository;

  beforeEach(() => {
    repository = new RecipesRepository();
  });

  describe('getAllRecipes', () => {
    it('should return default recipes when no custom recipes are set', () => {
      const recipes = repository.getAllRecipes();
      
      expect(recipes).toHaveLength(4);
      expect(recipes[0].name).toBe('Pasta Carbonara');
      expect(recipes[1].name).toBe('Pasta Pesto');
    });
  });

  describe('getRecipe', () => {
    it('should return recipe when it exists', () => {
      const customRecipes = [
        buildTestRecipe({ id: 'test-123', name: 'Test Recipe' })
      ];
      repository.setRecipes(customRecipes);

      const recipe = repository.getRecipe('test-123');

      expect(recipe).toBeDefined();
      expect(recipe?.id).toBe('test-123');
      expect(recipe?.name).toBe('Test Recipe');
    });

    it('should return undefined when recipe does not exist', () => {
      repository.setRecipes([]);
      
      const recipe = repository.getRecipe('non-existent-id');

      expect(recipe).toBeUndefined();
    });
  });

  describe('setRecipes', () => {
    it('should return custom recipes after setRecipes is called', () => {
      const customRecipes = [
        buildTestRecipe({ id: '1', name: 'Custom Recipe 1' }),
        buildTestRecipe({ id: '2', name: 'Custom Recipe 2' })
      ];
      repository.setRecipes(customRecipes);

      const recipes = repository.getAllRecipes();

      expect(recipes).toHaveLength(2);
      expect(recipes[0].name).toBe('Custom Recipe 1');
      expect(recipes[1].name).toBe('Custom Recipe 2');
    });
  });

  describe('createRecipe', () => {
    beforeEach(() => {
      repository.setRecipes([]);
    });

    it('should create a new recipe with provided name', () => {
      const recipeName = 'New Test Recipe';
      
      const createdRecipe = repository.createRecipe(recipeName);

      expect(createdRecipe.name).toBe(recipeName);
      expect(createdRecipe.id).toBeDefined();
      expect(createdRecipe.id).toMatch(/^rcp_/);
    });

    it('should generate unique IDs for multiple recipes', () => {
      const recipe1 = repository.createRecipe('Recipe 1');
      const recipe2 = repository.createRecipe('Recipe 2');

      expect(recipe1.id).not.toBe(recipe2.id);
      expect(recipe1.id).toMatch(/^rcp_/);
      expect(recipe2.id).toMatch(/^rcp_/);
    });

    it('should be retrievable by getRecipe after creation', () => {
      const createdRecipe = repository.createRecipe('Retrievable Recipe');
      
      const retrievedRecipe = repository.getRecipe(createdRecipe.id);
      
      expect(retrievedRecipe).toBeDefined();
      expect(retrievedRecipe?.name).toBe('Retrievable Recipe');
      expect(retrievedRecipe?.id).toBe(createdRecipe.id);
    });

    it('should create minimal recipe with only id and name', () => {
      const createdRecipe = repository.createRecipe('Minimal Recipe');

      expect(createdRecipe).toEqual({
        id: expect.stringMatching(/^rcp_/),
        name: 'Minimal Recipe'
      });
    });
  });

  describe('deleteRecipe', () => {
    it('should delete recipe when it exists', () => {
      const testRecipe = buildTestRecipe({ id: 'delete-test-1', name: 'Recipe to Delete' });
      repository.setRecipes([testRecipe]);

      const result = repository.deleteRecipe('delete-test-1');

      expect(result).toEqual({ deleted: true });
      expect(repository.getRecipe('delete-test-1')).toBeUndefined();
      expect(repository.getAllRecipes()).toHaveLength(0);
    });

    it('should return deleted false when recipe does not exist', () => {
      repository.setRecipes([]);

      const result = repository.deleteRecipe('non-existent-id');

      expect(result).toEqual({ deleted: false });
    });

    it('should only delete the specified recipe', () => {
      const recipe1 = buildTestRecipe({ id: 'keep-1', name: 'Keep Recipe 1' });
      const recipe2 = buildTestRecipe({ id: 'delete-2', name: 'Delete Recipe' });
      const recipe3 = buildTestRecipe({ id: 'keep-3', name: 'Keep Recipe 3' });
      repository.setRecipes([recipe1, recipe2, recipe3]);

      const result = repository.deleteRecipe('delete-2');

      expect(result).toEqual({ deleted: true });
      expect(repository.getAllRecipes()).toHaveLength(2);
      expect(repository.getRecipe('keep-1')).toBeDefined();
      expect(repository.getRecipe('delete-2')).toBeUndefined();
      expect(repository.getRecipe('keep-3')).toBeDefined();
    });
  });
});