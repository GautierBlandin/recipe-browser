import { Card, CardTitle } from '@recipe-browser/shared-ui';

interface RecipeInfoViewProps {
  cookingTimeMinutes?: number;
  servings?: number;
}

export function RecipeInfoView({ cookingTimeMinutes, servings }: RecipeInfoViewProps) {
  if (!cookingTimeMinutes && !servings) {
    return null;
  }

  return (
    <Card aria-label="Recipe information section">
      <CardTitle className="mb-2">Recipe Info</CardTitle>
      <div className="space-y-2">
        {cookingTimeMinutes && (
          <div className="flex justify-between">
            <span className="text-neutral-tertiary">Cooking Time:</span>
            <span className="text-neutral-primary">{cookingTimeMinutes} minutes</span>
          </div>
        )}
        {servings && (
          <div className="flex justify-between">
            <span className="text-neutral-tertiary">Servings:</span>
            <span className="text-neutral-primary">{servings}</span>
          </div>
        )}
      </div>
    </Card>
  );
}