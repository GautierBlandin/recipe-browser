import { Link } from 'react-router-dom';
import { Recipe } from '../models';
import { RECIPES_ROUTE } from '../recipes-route.constants';
import { Card, CardTitle, PageHeading } from '@recipe-browser/shared-ui';

interface RecipesListProps {
  recipes: Recipe[];
}

export function RecipesListView(props: RecipesListProps) {
  return (
    <>
      <PageHeading>My Recipe Collection</PageHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.recipes.map((recipe) => (
          <Link key={recipe.id} to={`${RECIPES_ROUTE}/${recipe.id}`}>
            <Card className="cursor-pointer hover:bg-neutral-primary-hover transition-shadow duration-200">
              <CardTitle className="mb-2">
                {recipe.name}
              </CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
