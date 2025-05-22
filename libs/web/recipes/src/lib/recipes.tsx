const hardcodedRecipes = [
  { id: 1, name: 'Roasted Chicken' },
  { id: 2, name: 'Pasta Pesto' },
  { id: 3, name: 'Pasta Carbonara' },
  { id: 4, name: 'Pasta Salmon' },
  { id: 5, name: 'Beef Stir Fry' },
  { id: 6, name: 'Chicken Curry' },
  { id: 7, name: 'Mediterranean Salad' },
  { id: 8, name: 'Mushroom Risotto' },
];

export function Recipes() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Recipe Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hardcodedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {recipe.name}
            </h3>
            <div className="text-sm text-gray-500">
              Click to view recipe
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
