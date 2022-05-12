import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Header from './Header';

describe('Header component', () => {
  it('should render with company text', () => {
    render(<Header />);
    const headerElement = screen.getByText(/checkout\.com/i);

    expect(headerElement).toBeInTheDocument();
  });
});
