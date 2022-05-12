import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ScrollToTopButton from './ScrollToTopButton';

describe('ScrollToTopButton component', () => {
  it('should render with text', () => {
    render(<ScrollToTopButton />);
    const scrollToButtonElement = screen.getByLabelText(/scroll to top/i);

    expect(scrollToButtonElement).toBeInTheDocument();
  });
});
