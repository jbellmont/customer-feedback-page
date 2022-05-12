import '@testing-library/jest-dom';
import {render, screen, within} from '@testing-library/react';
import {MOCK_REVIEWS_FOR_LIST} from '../api/mocks';

import ReviewsList, {ReviewsListProps} from './ReviewsList';

const baseProps: ReviewsListProps = {
  reviews: MOCK_REVIEWS_FOR_LIST,
};

describe('ReviewsList component', () => {
  it('should render', () => {
    render(<ReviewsList {...baseProps} />);
    const reviewsListElement = screen.getByRole('list');

    expect(reviewsListElement).toBeInTheDocument();
  });

  it('should render all reviews', () => {
    render(<ReviewsList {...baseProps} />);
    const reviewElements = screen.getAllByRole('listitem');

    expect(reviewElements).toHaveLength(3);
  });

  it('should build avatar using initials of name', () => {
    render(<ReviewsList {...baseProps} />);
    // Test case 'John Smith'.
    const avatarElement = screen.getByText(/JS/);

    expect(avatarElement).toBeInTheDocument();
  });

  it('should render the latest review details', () => {
    render(<ReviewsList {...baseProps} />);

    const reviewElements = screen.getAllByRole('listitem');
    const latestReview = reviewElements[0];
    const {getByLabelText, getByText} = within(latestReview);

    expect(getByText(/Perry McGee/i)).toBeInTheDocument();
    expect(getByText(/Molto bene/i)).toBeInTheDocument();
    expect(getByText(/PM/)).toBeInTheDocument();
    // As date uses toLocalString(), we have to test UK and US date formats,
    // thanks to CI / CD tests running on non UK server.
    expect(getByText(/(01\/06\/2022)|(6\/1\/2022)/)).toBeInTheDocument();
    expect(getByLabelText(/5 Stars/i)).toBeInTheDocument();
  });

  it('should sort reviews by latest date first', () => {
    render(<ReviewsList {...baseProps} />);

    const reviewElements = screen.getAllByRole('listitem');

    // Test case 'Perry McGee'.
    const newestReview = reviewElements[0];
    // Test case 'John Smith'.
    const oldestReview = reviewElements[2];

    const {getByText: getByTextNewest} = within(newestReview);
    const {getByText: getByTextOldest} = within(oldestReview);

    expect(getByTextNewest(/Perry McGee/i)).toBeInTheDocument();
    expect(getByTextOldest(/John Smith/i)).toBeInTheDocument();
  });
});
