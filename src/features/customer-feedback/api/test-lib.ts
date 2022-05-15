import {Review} from '../types/models';

import {ReviewPayload} from './reviews';

export const MOCK_UUID = '00000000-0000-0000-0000-000000000000';
export const MOCK_DATE = new Date(2020, 3, 1);

export const MOCK_REVIEW_PAYLOADS: ReviewPayload[] = [
  {
    name: 'John Smith',
    email: 'john@email.com',
    rating: 4,
    comment: 'Molto bene!',
  },
  {
    name: 'Jane Brown',
    email: 'jane@email.com',
    rating: 1,
    comment: 'Not great.',
  },
  {
    name: 'Perry McGee',
    email: 'perry@email.com',
    rating: 4,
    comment: 'Molto bene!',
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: MOCK_UUID,
    date: MOCK_DATE,
    name: 'John Smith',
    email: 'john@email.com',
    rating: 4,
    comment: 'Molto bene!',
  },
  {
    id: MOCK_UUID,
    date: MOCK_DATE,
    name: 'Jane Brown',
    email: 'jane@email.com',
    rating: 1,
    comment: 'Not great.',
  },
  {
    id: MOCK_UUID,
    date: MOCK_DATE,
    name: 'Perry McGee',
    email: 'perry@email.com',
    rating: 4,
    comment: 'Molto bene!',
  },
];

export const MOCK_REVIEWS_FOR_LIST: Review[] = [
  {
    id: '123',
    date: new Date(2020, 2, 1),
    name: 'John Smith',
    email: 'john@email.com',
    rating: 4,
    comment: 'Molto bene!',
  },
  {
    id: '456',
    date: new Date(2022, 2, 1),
    name: 'Jane Brown',
    email: 'jane@email.com',
    rating: 1,
    comment: 'Not great.',
  },
  {
    id: '789',
    date: new Date(2022, 5, 1),
    name: 'Perry McGee',
    email: 'perry@email.com',
    rating: 5,
    comment: 'Molto bene!',
  },
];

export const MOCK_REVIEW_PAYLOAD: ReviewPayload = {
  name: 'New Guy',
  email: 'new@email.com',
  rating: 5,
  comment: 'Best.',
};

export const MOCK_NEW_REVIEW: Review = {
  id: MOCK_UUID,
  date: MOCK_DATE,
  name: 'New Guy',
  email: 'new@email.com',
  rating: 5,
  comment: 'Best.',
};
