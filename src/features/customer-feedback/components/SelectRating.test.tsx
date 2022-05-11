import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import SelectRating, {SelectRatingProps} from './SelectRating';

const setValueMock = jest.fn();

const baseProps: SelectRatingProps = {
  setValue: setValueMock,
  value: 0,
};

describe('SelectRating component', () => {
  it('should render', () => {
    render(<SelectRating {...baseProps} />);
    const ratingElements = screen.getAllByRole('radio');

    // There is one radio button for each star (including 0).
    expect(ratingElements).toHaveLength(6);
  });

  it('should check a star based on value', () => {
    render(<SelectRating {...baseProps} value={3} />);

    const thirdStarButton = screen.getByRole('radio', {
      name: /3 stars/i,
    });
    const fourthStarButton = screen.getByRole('radio', {
      name: /4 stars/i,
    });

    expect(thirdStarButton).toBeChecked();
    expect(fourthStarButton).not.toBeChecked();
  });
});
