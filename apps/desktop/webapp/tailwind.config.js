const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const colors = require("tailwindcss/colors");

const globalColors = {
  brand: colors.blue,
  neutral: colors.slate,
  error: colors.red,
  success: colors.green,
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
        "brand-primary": globalColors.brand[600],
        "brand-primary-hover": globalColors.brand[700],
        "success-primary": globalColors.success[600],
        "success-primary-hover": globalColors.success[700],
        "error-primary": globalColors.error[600],
        "error-primary-hover": globalColors.error[700],
      },
      borderColor: {
        "neutral-primary": globalColors.neutral[200],
      },
      textColor: {
        "neutral-primary": globalColors.neutral[800],
        "neutral-secondary": globalColors.neutral[700],
        "neutral-tertiary": globalColors.neutral[600],
        "neutral-muted": globalColors.neutral[500],
        "brand-onprimary": colors.white,
        "success-onprimary": colors.white,
        "error-onprimary": colors.white,
      },
    },
  },
  plugins: [],
};
