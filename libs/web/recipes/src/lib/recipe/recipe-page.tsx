import { useParams } from 'react-router-dom';
import { Recipe } from './recipe';
import { NavbarLayout } from '../navigation';

export function RecipePage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="max-w-4xl mx-auto p-6">Recipe ID not provided</div>;
  }

  return (
    <NavbarLayout>
      <Recipe id={id} />
    </NavbarLayout>
  );
}
