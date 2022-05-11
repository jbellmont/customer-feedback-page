import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import SelectRating, {SelectRatingProps} from './SelectRating';

const setValueMock = jest.fn();

const baseProps: SelectRatingProps = {
  setValue: setValueMock,
  value: null,
};

describe('SelectRating component', () => {
  it('should render', () => {
    render(<SelectRating {...baseProps} />);
    const ratingElements = screen.getAllByRole('radio');

    // There is one radio button for each star (including 0).
    expect(ratingElements).toHaveLength(6);
  });

  it('should set its value based on the star clicked', () => {
    render(<SelectRating {...baseProps} />);
    const ratingElements = screen.getAllByRole('radio');

    // Click the '2-star' radio button.
    fireEvent.click(ratingElements[1]);

    expect(setValueMock).toHaveBeenCalledWith(2);
  });

  // TODO(jackbellmont): Handle error message when working on Form validation.
});
