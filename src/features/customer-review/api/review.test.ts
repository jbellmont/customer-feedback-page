// Mocks the uuid library, ensuring it always return a specific uuid.
jest.mock('uuid', () => ({v4: () => MOCK_UUID}));

import {Review} from '../types/models';

import {
  MOCK_UUID,
  MOCK_REVIEW_PAYLOADS,
  MOCK_REVIEWS,
  MOCK_REVIEW_PAYLOAD,
  MOCK_NEW_REVIEW,
} from './mocks';
import {getReviews, createReview} from './review';

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2020, 3, 1));
});

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  MOCK_REVIEW_PAYLOADS.forEach((review) => createReview(review));
});

describe('Review crud operations', () => {
  it('should retrieve all stored Reviews', () => {
    const reviews: Review[] = getReviews();

    expect(reviews).toEqual(MOCK_REVIEWS);
    expect(reviews).toHaveLength(3);
  });

  it('should create and store a new Review', () => {
    createReview(MOCK_REVIEW_PAYLOAD);
    const reviews: Review[] = getReviews();

    expect(reviews[reviews.length - 1]).toEqual(MOCK_NEW_REVIEW);
  });
});
