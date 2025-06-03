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
- [x] Expand Recipe model to include all cookbook fields (description, ingredients, steps, cooking time)
- [x] Update RecipeView to display all recipe fields in a structured layout

### Phase 3: Recipe Creation
- [x] Add an Add Recipe button to recipes list page.
- [x] When creating a recipe, the only thing that should be provided is the name.
- [x] Navigate to newly created recipe after creation
- [x] Check that when doing the flow Create Recipe --> Navigate to Recipe --> Navigate back to Recipes List, the new recipe is displayed
- [ ] Clean up and refactor

### Phase 4: Recipe Editing
- [x] Add "Edit Recipe" button to recipe view
- [x] Design recipe edition
- [x] Show updated content immediately after editing

### Phase 5: Recipe Deletion
- [x] Add "Delete Recipe" button to recipe view
- [x] Add confirmation dialog for deletion
- [x] Implement recipe deletion functionality
- [x] Navigate back to recipes list after deletion
- [x] Make sure the recipe is removed from the list

### Phase 6: Local Persistence
- [x] Define a storage solution that leverages electron.
- [ ] Clicking on the add recipe button triggers a console.log on the main process.
- [ ] The recipes are hardcoded in the main process rather than in the in-memory repository
- [ ] It is possible to add / edit / delete recipes using an in-memory repository **running in the main process**
- [ ] The recipes are hard-coded in the sqlite data database rather than in the in-memory repository of the main process
- [ ] It is possible to add / edit / delete recipes through the sqlite data database running in the main process

### Phase 7: Final Polish
- [ ] Verify data persistence across app restarts
- [ ] Use the app and clean the UI where relevant
