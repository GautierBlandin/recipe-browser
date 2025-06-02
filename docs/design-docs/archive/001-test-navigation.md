# Goal

Properly test navigation in the app.

## Steps

[X] Create a test-container component in test-infrastructure. The test container should contain the providers needed for the app to run. Currently, this means the HashRouter and the Routes.
[X] Refactor the tests recipes-list.spec.tsx to use the test-container component.
[X] Refactor the tests recipe.spec.tsx to use the test-container component.
[X] Add tests that verify that: when clicking on the "View Recipes" button, the user is navigated to the recipes page.
[X] Add tests that verify that: when clicking on a recipe from the recipes list, the user is navigated to the recipe page.
