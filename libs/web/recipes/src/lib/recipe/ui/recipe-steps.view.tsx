import { Card, CardTitle } from '@recipe-browser/shared-ui';

interface RecipeStepsViewProps {
  steps?: string[];
}

export function RecipeStepsView({ steps }: RecipeStepsViewProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Card className="md:col-span-2">
      <CardTitle className="mb-2">Cooking Instructions</CardTitle>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="text-neutral-secondary flex">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}