import { Card, CardTitle } from '@recipe-browser/shared-ui';

interface RecipeDescriptionViewProps {
  description?: string;
}

export function RecipeDescriptionView({ description }: RecipeDescriptionViewProps) {
  if (!description) {
    return null;
  }

  return (
    <Card className="md:col-span-2">
      <CardTitle className="mb-2">Description</CardTitle>
      <p className="text-neutral-secondary">{description}</p>
    </Card>
  );
}