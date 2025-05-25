import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  const handleNavigateToRecipes = () => {
    navigate('/recipes');
  };

  return (
    <nav className="bg-neutral-primary shadow-sm border-b border-neutral-primary px-4 py-3">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-neutral-primary mr-6">Recipe Browser</h1>
        <button
          onClick={handleNavigateToRecipes}
          className="px-4 py-2 text-sm font-medium text-neutral-secondary bg-neutral-secondary hover:bg-neutral-secondary-hover rounded-md transition-colors"
        >
          View Recipes
        </button>
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
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}