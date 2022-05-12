import {Review} from '../types/models';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({reviews}: ReviewsListProps) => {
  return <div>Reviews List component</div>;
};

export default ReviewsList;
