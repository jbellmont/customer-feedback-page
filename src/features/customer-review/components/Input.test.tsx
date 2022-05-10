import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Input, {InputProps, MAX_CHAR_LENGTH} from './Input';

const setValueMock = jest.fn();

const baseProps: InputProps = {
  errorText: 'Error',
  label: 'Test',
  setValue: setValueMock,
  type: 'text',
  value: 'John Smith',
};

describe('Input component', () => {
  it('should render', () => {
    render(<Input {...baseProps} />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<Input {...baseProps} label="Name" />);
    const inputElement = screen.getByLabelText(/^Name/i);

    expect(inputElement).toBeInTheDocument();
  });

  it('should show error message when max-character limit is exceeded', () => {
    render(<Input {...baseProps} value="" />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, {
      target: {value: 'a'.repeat(MAX_CHAR_LENGTH + 1)},
    });
    const errorElement = screen.getByText(/^Error/i);

    expect(errorElement).toBeInTheDocument();
  });

  it('should show error message when invalid email is provided', () => {
    render(<Input {...baseProps} type="email" />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, {
      target: {value: 'invalid.o'},
    });
    const errorElement = screen.getByText(/^Error/i);

    expect(errorElement).toBeInTheDocument();
  });
});
