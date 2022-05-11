import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import TextInput, {TextInputProps} from './TextInput';

const setValueMock = jest.fn();

const baseProps: TextInputProps = {
  errorText: 'Error',
  isValid: true,
  label: 'Test',
  setIsValid: setValueMock,
  setValue: setValueMock,
  testId: 'test',
  type: 'text',
  value: 'John Smith',
};

describe('Input component', () => {
  it('should render', () => {
    render(<TextInput {...baseProps} />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<TextInput {...baseProps} label="Name" />);
    const inputElement = screen.getByLabelText(/^Name/i);

    expect(inputElement).toBeInTheDocument();
  });

  it('should show error message when input is invalid', () => {
    render(<TextInput {...baseProps} isValid={false} />);
    const errorElement = screen.getByText(/^Error/i);

    expect(errorElement).toBeInTheDocument();
  });

  // TODO(jackbellmont): Test for invalid email.
});
