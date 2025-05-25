# MVP Roadmap

## MVP Functional Requirements
- A recipes list page that enable the user to see all their recipes (no pagination or anything)
- A recipe page that enable the user to view a single recipe
- Ability to navigate back to the recipes page from anywhere
- Recipes enable the user to store typical cookbook information in a structured but flexible form (apart from the title, nothing should be required)
- A user can create a recipe from the recipes list
- The user can edit the recipe the recipe view
- The user can delete the recipe from the recipe view
- The recipes are persisted locally
### MVP Technical Requirements
- The app uses Electron. For the webapp part, React + react-router are used.

## Steps to MVP

### Phase 1: Basic Structure ✅
- [x] I have an app that I can open and see "Hello world"
- [x] Inside the app, I can see a list of recipes, that only have a name
- [x] Recipes have a dedicated page (very basic)
- [x] enable navigation from recipes list to recipe and from recipe to recipes list

### Phase 2: Recipe Data Model & UI Enhancement
- [ ] Expand Recipe model to include all cookbook fields (description, ingredients, steps, cooking time)
- [ ] Update RecipeView to display all recipe fields in a structured layout
- [ ] Add placeholder content for empty fields to show the structure

### Phase 3: Recipe Creation
- [ ] Add "Create Recipe" button to recipes list page
- [ ] Create recipe creation form with all cookbook fields
- [ ] Implement form submission to create new recipe
- [ ] Navigate to newly created recipe after creation
- [ ] Update recipes list to show new recipe

### Phase 4: Recipe Editing
- [ ] Add "Edit Recipe" button to recipe view
- [ ] Create recipe edit form (can reuse creation form components)
- [ ] Implement form submission to update existing recipe
- [ ] Show updated content immediately after editing

### Phase 5: Recipe Deletion
- [ ] Add "Delete Recipe" button to recipe view
- [ ] Add confirmation dialog for deletion
- [ ] Implement recipe deletion functionality
- [ ] Navigate back to recipes list after deletion
- [ ] Update recipes list to remove deleted recipe

### Phase 6: Local Persistence
- [ ] Define and implement a storage solution that leverages electron (probably some sort of file storage). Make sure the solution is compatible with a webapp (file API)
- [ ] Replace in memory repository with persistent storage repository

### Phase 7: Final Polish
- [ ] Test all CRUD operations work correctly
- [ ] Ensure navigation works from all states
- [ ] Verify data persistence across app restarts
- [ ] Basic error handling for edge cases
