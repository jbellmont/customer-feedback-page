import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import TextInput, {
  MULTI_LINE_CHARACTER_LIMIT,
  SINGLE_LINE_CHARACTER_LIMIT,
  TextInputProps,
} from './TextInput';

const setValueMock = jest.fn();

const baseProps: TextInputProps = {
  errorText: 'Error',
  isValid: true,
  label: 'Test',
  setIsValid: setValueMock,
  setValue: setValueMock,
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

  it(
    'should show error message when single-line max-character limit is ' +
      'exceeded',
    () => {
      const {rerender} = render(<TextInput {...baseProps} value="" />);
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, {
        target: {value: 'a'.repeat(SINGLE_LINE_CHARACTER_LIMIT + 1)},
      });
      const setValueSpy = jest.spyOn(baseProps, 'setIsValid');

      expect(setValueSpy).toBeCalledWith(false);

      // As isValid is handled by the parent Form component, we need to mock
      // when it sets the state to false.
      rerender(<TextInput {...baseProps} isValid={false} />);
      const errorElement = screen.getByText(/^Error/i);

      expect(errorElement).toBeInTheDocument();
    }
  );

  it(
    'should show error message when multi-line max-character limit is ' +
      'exceeded',
    () => {
      const {rerender} = render(
        <TextInput {...baseProps} multiline value="" />
      );
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, {
        target: {value: 'a'.repeat(MULTI_LINE_CHARACTER_LIMIT + 1)},
      });

      const setValueSpy = jest.spyOn(baseProps, 'setIsValid');
      expect(setValueSpy).toBeCalledWith(false);

      // As isValid is handled by the parent Form component, we need to mock
      // when it sets the state to false.
      rerender(<TextInput {...baseProps} isValid={false} multiline />);
      const errorElement = screen.getByText(/^Error/i);

      expect(errorElement).toBeInTheDocument();
    }
  );

  it('should show error message when invalid email is provided', () => {
    const {rerender} = render(<TextInput {...baseProps} type="email" />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, {
      target: {value: 'invalid.o'},
    });

    const setValueSpy = jest.spyOn(baseProps, 'setIsValid');
    expect(setValueSpy).toBeCalledWith(false);

    // As isValid is handled by the parent Form component, we need to mock
    // when it sets the state to false.
    rerender(<TextInput {...baseProps} isValid={false} type="email" />);
    const errorElement = screen.getByText(/^Error/i);

    expect(errorElement).toBeInTheDocument();
  });
});
