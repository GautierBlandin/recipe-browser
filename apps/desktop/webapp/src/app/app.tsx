import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { RECIPES_ROUTE, recipesRoute, RecipesInfrastructureProvider } from '@recipe-browser/recipes';

export function App() {
  return (
    <HashRouter>
      <RecipesInfrastructureProvider>
        <Routes>
          {recipesRoute}
          <Route path="/" element={<Navigate to={RECIPES_ROUTE} replace />} />
        </Routes>
      </RecipesInfrastructureProvider>
    </HashRouter>
  );
}

export default App;
