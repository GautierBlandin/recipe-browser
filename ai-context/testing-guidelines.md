# Testing Guidelines

When writing tests, follow these key principles:

## Use Behavior-Driven testing

- Test behaviors, not methods
- Name tests after the specific behavior being tested

## Test Scope

- Always write the smallest test possible for the behavior being tested - this refers to minimizing the code being validated, not the code being executed
- It's good to exercise a lot of code (e.g., a whole use case), if the specific behavior being validated is small and focused
- Shared setup should be used to avoid including irrelevant details in each test

## Test Size

- Prefer small tests (single process) over medium (single machine) over large tests (distributed)
- Small tests should have no I/O operations, no sleeping, and no blocking calls

## Test Quality

- Make tests concise and complete: included all relevant information, exclude any unnecessary information
```
export interface Recipe {
  id: string;
  name: string;
  description?: string;
  cookingTimeMinutes?: number;
}

export function buildTestRecipe({
    id,
    name,
    description,
    cookingTimeMinutes,
  }: {
  id: string;
  name?: string;
  description?: string;
  cookingTimeMinutes?: number;
}): Recipe {
  return {
    id,
    name: name ?? `Test Recipe ${id}`,
    description: description ?? `A delicious test recipe for ${name ?? `Test Recipe ${id}`}`,
    cookingTimeMinutes: cookingTimeMinutes ?? 45,
  };
}

// Bad (not concise, the doesn't specify anything about name and cookingTimeMinutes, yet they are declared in the test)
it('should display the description', () => {
  const recipe = buildTestRecipe({
    id: '1',
    name: 'Chocolate Cake', // unnecessary information
    description: 'A rich chocolate cake',
    cookingTimeMinutes: 45, // unnecessary information
  });
  repository.setRecipes([recipe]);

  renderRecipe('1');

  expect(screen.getByText('A rich chocolate cake')).toBeTruthy();
});

// Bad (not complete, description is set implicitly)
it('should display the description', () => {
  const recipe = buildTestRecipe({
    id: '1',
  });
  repository.setRecipes([recipe]);

  renderRecipe('1');

  expect(screen.getByText('A delicious test recipe for Test Recipe 1')).toBeTruthy(); // it is unclear where the description comes from
});

// Good (exacly what is needed is present)
it('should display the description', () => {
  const recipe = buildTestRecipe({
    id: '1',
    description: 'A rich chocolate cake',
  });
  repository.setRecipes([recipe]);

  renderRecipe('1');

  expect(screen.getByText('A rich chocolate cake')).toBeTruthy();
});
```
- Tests should be hermetic: assume as little as possible about the outside environment
- Tests should be obvious  (easy to understand exactly what we test and why the test works / fails)

## Test API Boundaries

- Test via public APIs. Public APIs do not refer to public methods / functions, but to what the users of the system have access to.
- Test state, not interactions - focus on what the result is, not how it was achieved

## Test Logic and Sharing

- Avoid logic in tests - tests should be trivially correct upon inspection
- Follow DAMP (Descriptive And Meaningful Phrases) over DRY for test code
