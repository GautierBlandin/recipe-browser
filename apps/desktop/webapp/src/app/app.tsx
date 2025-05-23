import { Routes, Route, Navigate } from 'react-router-dom';
import { recipesRoute } from '@recipe-browser/recipes';

export function App() {
  return (
    <Routes>
      {recipesRoute}
      <Route path="/" element={<Navigate to="/recipes" replace />} />
    </Routes>
  );
}

export default App;
