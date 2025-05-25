import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '@recipe-browser/shared-ui';
import { RECIPES_ROUTE } from '../recipes-route.constants';

function Navigation() {
  return (
    <nav className="bg-neutral-primary shadow-sm border-b border-neutral-primary px-4 py-3">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-neutral-primary mr-6">Recipe Browser</h1>
        <Link to={RECIPES_ROUTE}>
          <button
            className="px-4 py-2 text-sm font-medium text-neutral-secondary bg-neutral-secondary hover:bg-neutral-secondary-hover rounded-md transition-colors"
          >
            View Recipes
          </button>
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
