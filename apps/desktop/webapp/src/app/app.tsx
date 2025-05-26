import { Routes, Route, Navigate } from 'react-router-dom';
import { RECIPES_ROUTE, recipesRoute, RecipesInfrastructureProvider } from '@recipe-browser/recipes';

export function App() {
  return (
    <RecipesInfrastructureProvider>
      <Routes>
        {recipesRoute}
        <Route path="/" element={<Navigate to={RECIPES_ROUTE} replace />} />
      </Routes>
    </RecipesInfrastructureProvider>
  );
}

export default App;
