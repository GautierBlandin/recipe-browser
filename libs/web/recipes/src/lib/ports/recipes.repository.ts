import { Recipe } from '../models';

export class RecipesRepository {
  private recipes: Recipe[] = [
    {
      id: '1',
      name: 'Pasta Carbonara',
      description: 'Classic Italian pasta dish with eggs, cheese, and guanciale',
      cookingTimeMinutes: 20,
      servings: 4,
      ingredients: [
        { name: 'spaghetti', portion: { quantity: 400, unit: 'g' } },
        { name: 'guanciale or pancetta', portion: { quantity: 150, unit: 'g' } },
        { name: 'large eggs', portion: { quantity: 3, unit: 'pieces' } },
        { name: 'egg yolk', portion: { quantity: 1, unit: 'piece' } },
        { name: 'Pecorino Romano cheese, grated', portion: { quantity: 80, unit: 'g' } },
        { name: 'freshly ground black pepper', portion: { quantity: 1, unit: 'tsp' } },
        { name: 'sea salt', portion: { quantity: 1, unit: 'pinch' } }
      ],
      steps: [
        'Bring a large pot of salted water to boil and cook spaghetti until al dente',
        'Cut guanciale into small cubes and cook in a large pan until crispy',
        'In a bowl, whisk together eggs, egg yolk, grated Pecorino, and black pepper',
        'Drain pasta, reserving 250ml of pasta water',
        'Add hot pasta to the pan with guanciale, remove from heat',
        'Quickly mix in egg mixture, adding pasta water gradually to create a creamy sauce',
        'Serve immediately with extra Pecorino and black pepper'
      ]
    },
    {
      id: '2',
      name: 'Pasta Pesto',
      description: 'Fresh basil pesto with pine nuts and Parmesan',
      cookingTimeMinutes: 15,
      servings: 4,
      ingredients: [
        { name: 'pasta (linguine or spaghetti)', portion: { quantity: 400, unit: 'g' } },
        { name: 'fresh basil leaves', portion: { quantity: 60, unit: 'g' } },
        { name: 'pine nuts', portion: { quantity: 30, unit: 'g' } },
        { name: 'garlic cloves', portion: { quantity: 2, unit: 'pieces' } },
        { name: 'Parmesan cheese, grated', portion: { quantity: 60, unit: 'g' } },
        { name: 'extra virgin olive oil', portion: { quantity: 120, unit: 'ml' } },
        { name: 'sea salt', portion: { quantity: 1, unit: 'tsp' } },
        { name: 'freshly ground black pepper', portion: { quantity: 0.5, unit: 'tsp' } }
      ],
      steps: [
        'Toast pine nuts in a dry pan until lightly golden, let cool',
        'In a food processor, pulse garlic until minced',
        'Add basil, pine nuts, and salt, pulse until roughly chopped',
        'With processor running, slowly add olive oil until smooth',
        'Stir in grated Parmesan and season with pepper',
        'Cook pasta in salted boiling water until al dente',
        'Reserve 125ml pasta water, then drain pasta',
        'Toss pasta with pesto, adding pasta water if needed for consistency'
      ]
    },
    {
      id: '3',
      name: 'Chicken and Fries',
      description: 'Crispy roasted chicken with golden homemade chips',
      cookingTimeMinutes: 60,
      servings: 4,
      ingredients: [
        { name: 'chicken thighs, bone-in', portion: { quantity: 8, unit: 'pieces' } },
        { name: 'large potatoes', portion: { quantity: 1, unit: 'kg' } },
        { name: 'olive oil', portion: { quantity: 4, unit: 'tbsp' } },
        { name: 'garlic powder', portion: { quantity: 1, unit: 'tsp' } },
        { name: 'paprika', portion: { quantity: 1, unit: 'tsp' } },
        { name: 'dried thyme', portion: { quantity: 1, unit: 'tsp' } },
        { name: 'sea salt', portion: { quantity: 2, unit: 'tsp' } },
        { name: 'freshly ground black pepper', portion: { quantity: 1, unit: 'tsp' } },
        { name: 'lemon', portion: { quantity: 1, unit: 'piece' } }
      ],
      steps: [
        'Preheat oven to 220°C',
        'Wash and cut potatoes into thick chips, pat dry',
        'Toss chips with 2 tbsp olive oil and 1 tsp salt, spread on baking tray',
        'Season chicken with remaining oil, garlic powder, paprika, thyme, salt, and pepper',
        'Place chicken on separate baking tray',
        'Roast chips for 45 minutes, turning once halfway through',
        'Roast chicken for 35-40 minutes until golden and cooked through',
        'Squeeze lemon over chicken before serving with chips'
      ]
    },
    {
      id: '4',
      name: 'Steak Tartare and Fries',
      description: 'Classic French raw beef dish with crispy fries',
      cookingTimeMinutes: 30,
      servings: 4,
      ingredients: [
        { name: 'beef fillet, very fresh', portion: { quantity: 600, unit: 'g' } },
        { name: 'large potatoes', portion: { quantity: 800, unit: 'g' } },
        { name: 'egg yolks', portion: { quantity: 4, unit: 'pieces' } },
        { name: 'capers, drained', portion: { quantity: 2, unit: 'tbsp' } },
        { name: 'cornichons, finely chopped', portion: { quantity: 2, unit: 'tbsp' } },
        { name: 'shallot, finely minced', portion: { quantity: 1, unit: 'piece' } },
        { name: 'Dijon mustard', portion: { quantity: 1, unit: 'tbsp' } },
        { name: 'Worcestershire sauce', portion: { quantity: 1, unit: 'tsp' } },
        { name: 'Tabasco sauce', portion: { quantity: 0.5, unit: 'tsp' } },
        { name: 'olive oil for frying', portion: { quantity: 500, unit: 'ml' } },
        { name: 'sea salt', portion: { quantity: 1, unit: 'tsp' } },
        { name: 'freshly ground black pepper', portion: { quantity: 0.5, unit: 'tsp' } },
        { name: 'fresh parsley, chopped', portion: { quantity: 2, unit: 'tbsp' } }
      ],
      steps: [
        'Cut potatoes into thin fries and soak in cold water for 30 minutes',
        'Heat oil to 160°C and blanch fries for 4 minutes, drain well',
        'Finely chop beef with a sharp knife (do not use food processor)',
        'Mix beef with shallot, capers, cornichons, mustard, Worcestershire, and Tabasco',
        'Season with salt, pepper, and parsley',
        'Heat oil to 180°C and fry chips until golden and crispy',
        'Form tartare into 4 portions and make a well in each center',
        'Place an egg yolk in each well and serve immediately with hot fries'
      ]
    }
  ];

  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: string): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
  }

  createRecipe(name: string): Recipe {
    const id = this.generateUniqueId();
    const newRecipe: Recipe = {
      id,
      name
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  updateRecipe(id: string, updates: Partial<Recipe>): Recipe | undefined {
    const existingRecipe = this.recipes.find(recipe => recipe.id === id);
    if (!existingRecipe) return undefined;
    
    const updatedRecipe = { ...existingRecipe, ...updates };
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    this.recipes[index] = updatedRecipe;
    return updatedRecipe;
  }

  deleteRecipe(id: string): { deleted: boolean } {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index === -1) {
      return { deleted: false };
    }
    
    this.recipes.splice(index, 1);
    return { deleted: true };
  }

  private generateUniqueId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `rcp_${timestamp}-${randomPart}`;
  }
}