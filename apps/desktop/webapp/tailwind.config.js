const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const colors = require("tailwindcss/colors");

const globalColors = {
  neutral: colors.slate,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundColor: {
        "neutral-primary": colors.white,
        "neutral-primary-hover": globalColors.neutral[50],
        "neutral-secondary": globalColors.neutral[100],
        "neutral-secondary-hover": globalColors.neutral[200],
      },
      borderColor: {
        "neutral-primary": globalColors.neutral[200],
      },
      textColor: {
        "neutral-primary": globalColors.neutral[800],
        "neutral-secondary": globalColors.neutral[700],
        "neutral-tertiary": globalColors.neutral[600],
        "neutral-muted": globalColors.neutral[500],
      },
    },
  },
  plugins: [],
};
