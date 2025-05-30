# Recipe Editing

## Context

Phase 4 of the MVP roadmap requires implementing recipe editing functionality. Users need to be able to modify existing recipes from the recipe view page. The editing experience should be intuitive, provide immediate feedback, and handle all recipe fields including name, description, ingredients, steps, cooking time, and servings.

## Investigation

Current relevant files and components:
- `libs/web/recipes/src/lib/recipe/recipe.view.tsx` - Recipe view that needs edit functionality
- `libs/web/recipes/src/lib/recipe/ui/` - Individual recipe section components that could be made editable
- `libs/web/recipes/src/lib/ports/recipes.repository.ts` - Repository that needs an update method
- `libs/web/recipes/src/lib/models/recipe.ts` - Complete recipe model with all fields
- `libs/web/shared-ui/src/lib/modal.tsx` - Modal component for potential edit forms
- `libs/web/shared-ui/src/lib/button.tsx` - Button component for edit triggers

The recipe view currently displays all recipe data in a structured, read-only format using dedicated UI components for each section. The repository supports creation and reading but lacks update functionality.

## Chosen Approach: Modal-Based Editing

We will implement **Modal-Based Editing** using a comprehensive form modal containing all recipe fields. This approach:

- Aligns with successful recipe applications (BigOven, Yummly)
- Provides familiar UX patterns users expect
- Leverages existing modal component from shared-ui
- Handles medium-complexity forms effectively
- Works well on both desktop and mobile devices

## Alternatives Considered

### Alternative 1: Inline Editing Mode
Transform the recipe view into an editable state where each section becomes an inline form.

**Why not chosen**: Complex state management with each section needing edit/view modes, potential UI layout issues between forms and display elements, and risk of accidental edits. Better suited for simpler content like task names.

### Alternative 3: Dedicated Edit Page  
Navigate to a separate `/recipes/:id/edit` route with a full-page edit form.

**Why not chosen**: Adds navigation overhead and context switching that breaks the user flow. More appropriate for highly complex forms with 10+ fields. The MVP recipe editing doesn't require this level of complexity.

## Technical Implementation

### Repository Enhancement
Extend `RecipesRepository` class with:

```typescript
updateRecipe(id: string, updates: Partial<Recipe>): Recipe | undefined {
  const existingRecipe = this.recipes.find(recipe => recipe.id === id);
  if (!existingRecipe) return undefined;
  
  const updatedRecipe = { ...existingRecipe, ...updates };
  const index = this.recipes.findIndex(recipe => recipe.id === id);
  this.recipes[index] = updatedRecipe;
  return updatedRecipe;
}
```

### Component Architecture

1. **RecipeEditModal** (`libs/web/recipes/src/lib/recipe/recipe-edit-modal.tsx`)
   - Main modal component containing the edit form
   - Uses shared Modal component from shared-ui
   - Manages form state and validation

2. **Dynamic Form Fields**:
   - **IngredientsInput**: Array field with add/remove buttons, supports RecipeIngredient format
   - **StepsInput**: Array field with add/remove buttons, maintains step order
   - **BasicFields**: Name (required), description, cooking time, servings

3. **Recipe Container Updates**:
   - Add `isEditing` state to manage modal visibility
   - Add `updateRecipe` handler that calls repository and refreshes data
   - Connect edit button to open modal

### Form Data Structure
```typescript
interface EditFormData {
  name: string;
  description?: string;
  ingredients?: RecipeIngredient[];
  steps?: string[];
  cookingTimeMinutes?: number;
  servings?: number;
}
```

### State Flow
1. User clicks "Edit Recipe" button in recipe view
2. Modal opens with form pre-populated with current recipe data
3. User modifies fields (ingredients/steps use dynamic arrays)
4. Form validation ensures name is required
5. Save calls `repository.updateRecipe()` with form data
6. Modal closes and recipe view refreshes with updated data

### Error Handling
- Form validation for required fields
- Repository returns undefined for invalid IDs
- Display error messages for failed updates
- Cancel restores original form state

## Testing Strategy

### Repository Tests
- Test `updateRecipe` with various partial updates
- Verify non-existent recipe handling
- Test that original recipe data is preserved for unspecified fields

### Component Tests
- Test edit button renders and opens modal
- Test form validation (required name, optional fields)
- Test form submission calls repository correctly
- Test cancel behavior restores original state

### Integration Tests
- Test complete edit flow: open modal → edit → save → view updated recipe
- Test editing each recipe field type individually
- Test editing recipes with missing optional fields
- Test concurrent editing scenarios

### User Experience Tests
- Test with recipes containing all fields vs minimal recipes
- Test form behavior with very long ingredient lists
- Test modal behavior on different screen sizes

## Steps

### 1. Extend Repository Interface
- [x] Add `updateRecipe(id: string, updates: Partial<Recipe>): Recipe | undefined` to interface
- [x] Implement in RecipesRepository class with proper ID validation and partial updates
- [x] Add comprehensive tests for update functionality

### 2. Integrate Edit Functionality
- [ ] Add "Edit Recipe" button to recipe view with proper styling

### 3. Create Edit Modal Component
- [ ] Design RecipeEditModal with form for all recipe fields
- [ ] Implement dynamic ingredient list editing (add/remove/reorder)
- [ ] Implement dynamic steps list editing (add/remove/reorder)
- [ ] Add form validation with proper error handling
- [ ] Add save/cancel actions with loading states

### 4. Update Recipe View Integration
- [ ] Ensure recipe view refreshes after successful edit
- [ ] Test that all recipe fields display correctly after updates
- [ ] Verify navigation flow remains smooth

### 5. Comprehensive Testing
- [ ] Add unit tests for new repository method
- [ ] Add component tests for edit modal and form behavior
- [ ] Add integration tests for complete edit workflow
- [ ] Test edge cases: empty fields, very long content, special characters

### 6. Polish and Edge Cases
- [ ] Add proper loading states during save operations
- [ ] Implement optimistic updates for better UX
- [ ] Handle network errors and validation failures gracefully
- [ ] Ensure accessibility compliance for edit modal and forms
