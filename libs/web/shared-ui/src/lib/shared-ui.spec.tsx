import { render } from '@testing-library/react';

import { Main, Card, PageHeading } from '../index';

describe('SharedUi Components', () => {
  it('should render Main successfully', () => {
    const { baseElement } = render(<Main>Test content</Main>);
    expect(baseElement).toBeTruthy();
  });

  it('should render Card successfully', () => {
    const { baseElement } = render(<Card>Test content</Card>);
    expect(baseElement).toBeTruthy();
  });

  it('should render PageHeading successfully', () => {
    const { baseElement } = render(<PageHeading>Test heading</PageHeading>);
    expect(baseElement).toBeTruthy();
  });
});
