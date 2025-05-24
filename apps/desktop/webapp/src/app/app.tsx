import { Routes, Route, Navigate } from 'react-router-dom';
import { RECIPES_ROUTE, recipesRoute } from '@recipe-browser/recipes';

export function App() {
  return (
    <Routes>
      {recipesRoute}
      <Route path="/" element={<Navigate to={RECIPES_ROUTE} replace />} />
    </Routes>
  );
}

export default App;
