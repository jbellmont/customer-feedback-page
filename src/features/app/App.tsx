import {Container, Typography} from '@mui/material';

import CustomerFeedbackForm from '../customer-feedback/components/CustomerFeedbackForm';
import {getReviews} from '../customer-feedback/api/reviews';
import {Review} from '../customer-feedback/types/models';
import ReviewsList from '../customer-feedback/components/ReviewsList';
import RatingsChart, {
  RatingsChartData,
  RatingsLabel,
} from '../customer-feedback/components/RatingsChart';

const App = () => {
  const reviews: Review[] = getReviews();

  const generateRatingsChartData = (reviews: Review[]): RatingsChartData[] => {
    const ratingsData: RatingsChartData[] = [
      {
        name: RatingsLabel.ONE_STAR,
        ratings: 0,
      },
      {
        name: RatingsLabel.TWO_STAR,
        ratings: 0,
      },
      {
        name: RatingsLabel.THREE_STAR,
        ratings: 0,
      },
      {
        name: RatingsLabel.FOUR_STAR,
        ratings: 0,
      },
      {
        name: RatingsLabel.FIVE_STAR,
        ratings: 0,
      },
    ];

    return reviews
      .reduce((previous, current) => {
        previous[current.rating - 1].ratings++;
        return previous;
      }, ratingsData)
      .reverse();
  };

  const ratingsChartData = generateRatingsChartData(reviews);

  return (
    <Container maxWidth="lg">
      <header>
        <Typography component="h1" sx={{fontWeight: 500}} variant="h3">
          Customer feedback page
        </Typography>
      </header>
      <CustomerFeedbackForm />
      <RatingsChart chartData={ratingsChartData} />
      {/* TODO(jackbellmont): Handle review list of 0. "No reviews" */}
      <ReviewsList reviews={reviews} />
    </Container>
  );
};

export default App;
