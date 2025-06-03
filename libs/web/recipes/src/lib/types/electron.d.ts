export interface RecipeAPI {
  onAddRecipeClick: () => void;
}

declare global {
  interface Window {
    recipeAPI: RecipeAPI;
  }
}