import { Link } from 'react-router-dom';
import { Recipe } from '../models';
import { RECIPES_ROUTE } from '../recipes-route.constants';
import { Main, Card, PageHeading, SmallText } from '@recipe-browser/shared-ui';

interface RecipesListProps {
  recipes: Recipe[];
}

export function RecipesListView(props: RecipesListProps) {
  return (
    <Main>
      <PageHeading>My Recipe Collection</PageHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.recipes.map((recipe) => (
          <Link key={recipe.id} to={`${RECIPES_ROUTE}/${recipe.id}`}>
            <Card className="cursor-pointer hover:bg-neutral-primary-hover transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-neutral-primary mb-2">
                {recipe.name}
              </h3>
              <SmallText>Click to view recipe</SmallText>
            </Card>
          </Link>
        ))}
      </div>
    </Main>
  );
}
