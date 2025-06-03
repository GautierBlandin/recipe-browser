# Renderer to Main Process IPC Communication

## Context

We need to establish communication between the renderer process (React app) and the main process (Electron) when the user clicks the "Add Recipe" button. This is the first step in implementing cross-process communication that will eventually handle recipe creation in the backend. For now, we'll simply log to the console in the main process to verify the communication channel works.

## Investigation

Current state:
- The AddRecipe component (libs/web/recipes/src/lib/recipes-list/add-recipe/add-recipe.tsx) handles the UI for creating recipes
- When clicked, it shows a modal and calls `onCreateRecipe` when the form is submitted
- The preload script (apps/desktop/electron/src/preload.ts) is set up but doesn't expose any IPC APIs yet
- The main process (apps/desktop/electron/src/main.ts) doesn't have any IPC handlers

Electron's IPC architecture:
- Renderer process cannot directly access Node.js APIs for security
- Communication happens through contextBridge in the preload script
- Main process listens for IPC events using ipcMain
- Renderer sends events using the exposed API

## Solution

We'll implement a secure IPC channel that:
1. Exposes a `recipeAPI` through the preload script using contextBridge
2. Provides a method `onAddRecipeClick()` that sends an IPC message to main
3. Main process listens for the 'recipe:add-clicked' event and logs to console
4. The renderer will call this API when the "Add Recipe" button is clicked (not when the form is submitted)

This approach:
- Maintains security by using contextBridge properly
- Establishes a pattern for future IPC communications
- Keeps the API surface minimal and focused
- Separates the button click event from the actual recipe creation logic

## Testing strategy

1. Manual testing:
   - Click the "Add Recipe" button
   - Verify console.log appears in the main process terminal
   - Ensure the modal still opens as expected

No unit tests are planned for this proof of concept

## Steps

1. Update preload script to expose recipeAPI with onAddRecipeClick method
2. Add IPC handler in main process for 'recipe:add-clicked' event
3. Create TypeScript declarations for the window.recipeAPI
4. Update AddRecipe component to call window.recipeAPI.onAddRecipeClick()
5. Test the implementation manually
6. Add unit tests for the new functionality