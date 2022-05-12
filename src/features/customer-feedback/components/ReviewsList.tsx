import {Review} from '../types/models';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({reviews}: ReviewsListProps) => {
  const sortReviewsByLatestDate = (reviews: Review[]): Review[] => {
    return [...reviews].sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  };

  const transformReviews = (reviews: Review[]): Review[] => {
    // Add more array transformation functions to the 'pipeline', e.g. filter.
    return sortReviewsByLatestDate(reviews);
  };

  const reviewsToDisplay: Review[] = transformReviews(reviews);

  // TODO(jackbellmont): Handle no reviews (e.g. 'No reviews submitted yet').
  // TODO(jackbellmont): Handle JB avatar.
  // TODO(jackbellmont): Format date nicely, e.g. Tues 15th March.
  return (
    <ul>
      {reviewsToDisplay.map((review: Review) => {
        return (
          <li key={review.id}>
            {review.name} - {review.date.toLocaleDateString()}
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewsList;
