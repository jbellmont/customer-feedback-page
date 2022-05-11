import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Input, {
  InputProps,
  MULTI_LINE_CHARACTER_LIMIT,
  SINGLE_LINE_CHARACTER_LIMIT,
} from './Input';

const setValueMock = jest.fn();

const baseProps: InputProps = {
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
    render(<Input {...baseProps} />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<Input {...baseProps} label="Name" />);
    const inputElement = screen.getByLabelText(/^Name/i);

    expect(inputElement).toBeInTheDocument();
  });

  it(
    'should show error message when single-line max-character limit is ' +
      'exceeded',
    () => {
      const {rerender} = render(<Input {...baseProps} value="" />);
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, {
        target: {value: 'a'.repeat(SINGLE_LINE_CHARACTER_LIMIT + 1)},
      });
      const setValueSpy = jest.spyOn(baseProps, 'setIsValid');

      expect(setValueSpy).toBeCalledWith(false);

      // As isValid is handled by the parent Form component, we need to mock
      // when it sets the state to false.
      rerender(<Input {...baseProps} isValid={false} />);
      const errorElement = screen.getByText(/^Error/i);

      expect(errorElement).toBeInTheDocument();
    }
  );

  it(
    'should show error message when multi-line max-character limit is ' +
      'exceeded',
    () => {
      const {rerender} = render(<Input {...baseProps} multiline value="" />);
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, {
        target: {value: 'a'.repeat(MULTI_LINE_CHARACTER_LIMIT + 1)},
      });

      const setValueSpy = jest.spyOn(baseProps, 'setIsValid');
      expect(setValueSpy).toBeCalledWith(false);

      // As isValid is handled by the parent Form component, we need to mock
      // when it sets the state to false.
      rerender(<Input {...baseProps} isValid={false} multiline />);
      const errorElement = screen.getByText(/^Error/i);

      expect(errorElement).toBeInTheDocument();
    }
  );

  it('should show error message when invalid email is provided', () => {
    const {rerender} = render(<Input {...baseProps} type="email" />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, {
      target: {value: 'invalid.o'},
    });

    const setValueSpy = jest.spyOn(baseProps, 'setIsValid');
    expect(setValueSpy).toBeCalledWith(false);

    // As isValid is handled by the parent Form component, we need to mock
    // when it sets the state to false.
    rerender(<Input {...baseProps} isValid={false} type="email" />);
    const errorElement = screen.getByText(/^Error/i);

    expect(errorElement).toBeInTheDocument();
  });
});
