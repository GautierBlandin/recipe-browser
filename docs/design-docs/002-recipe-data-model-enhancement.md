# Goal

Expand the Recipe data model to include all cookbook information fields and update the UI to display this structured data.

## Current State

The Recipe model currently only contains:
- `id: string` - unique identifier
- `name: string` - recipe title

The RecipeView displays only the recipe name with placeholder text.

## Steps

### 1. Expand Recipe Model
- [x] Update `Recipe` interface in `libs/web/recipes/src/lib/models/recipe.ts` to include:
  - `description?: string` - longer description of what the recipe is
  - `ingredients?: string[]` - list of ingredients per portion 
  - `steps?: string[]` - step-by-step cooking instructions
  - `cookingTimeMinutes?: number` - expected cooking time
  - `servings?: number` - number of portions this recipe makes

### 2. Update Sample Recipe Builder
- [x] Modify `buildTestRecipe` in `recipe.sample.ts` to optionally include new fields
- [x] Update existing sample function to add default values for the new fields

### 3. Update RecipeView Component
- [x] Enhance `RecipeView` in `recipe-view.tsx` to display all recipe fields:
  - Recipe title (existing)
  - Description section (if provided)
  - Ingredients list (if provided)
  - Cooking steps (if provided) 
  - Cooking time and servings info (if provided)
- [x] Use responsive layout that works well for both populated and sparse recipes

### 4. Update Tests
- [x] Update existing tests to work with expanded Recipe model
- [x] Add tests for RecipeView displaying various combinations of filled/empty fields
- [x] Ensure tests cover edge cases like empty arrays and undefined values

## Design Considerations

### Data Structure
- All fields except `id` and `name` are optional to maintain flexibility
- Use arrays for ingredients and steps to maintain order
- Use simple types (string, number, array) for easy serialization later

### UI Layout
- Group related information (ingredients, steps, metadata)
- Show field labels even when content is empty to indicate capability
- Use consistent spacing and typography
- Responsive design for different screen sizes

### Testing Strategy
- Test with minimal recipe (id + name only)
- Test with fully populated recipe
- Test with partial data combinations
- Verify graceful handling of undefined/empty values
