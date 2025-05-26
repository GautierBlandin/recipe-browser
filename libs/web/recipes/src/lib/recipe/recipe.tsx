import { useParams } from 'react-router-dom';
import { RecipeContainer } from './recipe.container';
import { NavbarLayout } from '../navigation';

export function Recipe() {
  const { id } = useParams<{ id: string }>();

  return (
    <NavbarLayout>
      <RecipeContainer id={id} />
    </NavbarLayout>
  );
}
