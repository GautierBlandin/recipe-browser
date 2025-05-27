import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Main, Button } from '@recipe-browser/shared-ui';
import { RECIPES_ROUTE } from '../recipes-route.constants';

function Navigation() {
  return (
    <nav className="bg-neutral-primary shadow-sm border-b border-neutral-primary px-4 py-3">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-neutral-primary mr-6">Recipe Browser</h1>
        <Link to={RECIPES_ROUTE}>
          <Button
            variant="neutral"
            aria-label="Navigate to recipes list"
          >
            View Recipes
          </Button>
        </Link>
      </div>
    </nav>
  );
}

interface NavbarLayoutProps {
  children: ReactNode;
}

export function NavbarLayout({ children }: NavbarLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <Main>
        {children}
      </Main>
    </div>
  );
}
