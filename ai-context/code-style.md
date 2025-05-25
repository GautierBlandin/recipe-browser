## Code style

- Only use named exports
- Order by importance, not by dependency order

Bad:

```ts
export interface Ingredient {
  name: string;
}

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
}
```

Good:

```ts
export interface Recipe {
  name: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
}
```
