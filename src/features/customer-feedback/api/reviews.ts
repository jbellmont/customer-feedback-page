import {v4 as uuidv4} from 'uuid';

import {jsonDateReviver} from '../../../shared/utils/json';

import {Review} from '../types/models';

export interface ReviewPayload {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export const REVIEWS_STORAGE_KEY = 'reviews';

export const getReviews = (): Review[] => {
  const serializedReviews: string = localStorage.getItem(
    REVIEWS_STORAGE_KEY
  ) as string;
  if (!serializedReviews) return [];

  const parsedReviews: Review[] = JSON.parse(
    serializedReviews,
    jsonDateReviver
  );

  return parsedReviews;
};

export const createReview = (review: ReviewPayload) => {
  const id = uuidv4();
  const date = new Date();
  const newReview: Review = {
    ...review,
    id,
    date,
  };

  const currentReviews: Review[] = getReviews();
  currentReviews.push(newReview);

  const serializedReviews = JSON.stringify(currentReviews);
  localStorage.setItem(REVIEWS_STORAGE_KEY, serializedReviews);
};
