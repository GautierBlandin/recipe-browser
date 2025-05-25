# Recipe Creation

## Context

Phase 3 of the MVP roadmap requires implementing recipe creation functionality. Users need to be able to add new recipes to their collection from the recipes list page. The creation flow should be simple - requiring only a recipe name initially - and should seamlessly integrate with the existing navigation flow.

## Investigation

Current relevant files and components:
- `libs/web/recipes/src/lib/recipes-list/recipes-list.tsx` - Main recipes list component that needs the "Add Recipe" button
- `libs/web/recipes/src/lib/ports/recipes.repository.ts` - Repository interface that needs a create method
- `libs/web/recipes/src/lib/models/recipe.ts` - Recipe model with expanded fields from Phase 2
- `libs/web/recipes/src/lib/navigation/navigation.tsx` - Navigation component for routing

The recipes list currently displays existing recipes and provides navigation to individual recipe views. The repository interface needs to be extended to support creating new recipes.

## Solution

Add recipe creation capability through:

1. **Repository Enhancement**: Extend the RecipesRepository interface with a `createRecipe(name: string)` method that generates a new recipe with a unique ID and minimal required data.

2. **UI Addition**: Add a prominent "Add Recipe" button to the recipes list page that captures the recipe name through a simple form.

3. **Navigation Flow**: After successful creation, automatically navigate to the newly created recipe's detail page, allowing immediate editing if desired.

4. **State Management**: Ensure the new recipe appears in the recipes list when navigating back, maintaining consistency across the application.

## Testing Strategy

Test the complete creation flow:
- Button renders correctly on recipes list page
- Form submission creates recipe with unique ID and provided name
- Navigation to new recipe works correctly  
- New recipe appears in list after navigating back
- Form validation prevents empty/invalid names
- Multiple recipes can be created without conflicts

Test repository behavior:
- `createRecipe` generates unique IDs for each recipe
- Created recipes are immediately available via `getRecipe` and `getRecipes`
- Default values are properly applied to optional fields

## Steps

### 1. Extend Repository Interface
- [ ] Add `createRecipe(name: string): Recipe` method to `RecipesRepository` interface
- [ ] Update in-memory repository implementation to generate unique IDs and store new recipes. The IDs should use the object id pattern (e.g rcp_unique-id)

### 2. Add Creation UI to Recipes List
- [ ] Add "Add Recipe" button to recipes list component
- [ ] Implement simple form (input field + submit button) for capturing recipe name
- [ ] Add form validation to ensure name is provided and not empty
- [ ] Handle form submission to call repository and navigate to new recipe

### 3. Update Navigation Integration
- [ ] Ensure navigation from recipes list to new recipe works correctly
- [ ] Verify return navigation shows the new recipe in the list
- [ ] Test the complete flow: Create → View → Back to List

### 4. Update Tests
- [ ] Add tests for new repository method
- [ ] Add tests for recipes list creation UI and form behavior
- [ ] Add integration tests for the complete creation flow
- [ ] Verify edge cases like duplicate names and empty inputs