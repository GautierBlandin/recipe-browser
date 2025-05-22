import { render } from '@testing-library/react';

import Recipes from './recipes';

describe('Recipes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Recipes />);
    expect(baseElement).toBeTruthy();
  });
});
