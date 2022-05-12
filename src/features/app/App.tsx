import {Container, Typography} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import {useEffect, useState} from 'react';

import CustomerFeedbackForm from '../customer-feedback/components/CustomerFeedbackForm';
import {getReviews} from '../customer-feedback/api/reviews';
import {Review} from '../customer-feedback/types/models';
import ReviewsList from '../customer-feedback/components/ReviewsList';
import RatingsChart, {
  RatingsChartData,
  RatingsLabel,
} from '../customer-feedback/components/RatingsChart';
import Header from './Header';

const App = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingsChartData, setRatingsChartData] = useState<RatingsChartData[]>(
    []
  );

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

  const fetchReviews = () => {
    const freshReviews: Review[] = getReviews();
    setReviews(freshReviews);

    const freshRatingsChartData = generateRatingsChartData(freshReviews);
    setRatingsChartData(freshRatingsChartData);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{marginTop: 6}}>
        <Typography
          component="h1"
          sx={{
            alignItems: 'center',
            display: 'flex',
            fontWeight: 500,
            marginBottom: 2,
          }}
          variant="h4"
        >
          Customer feedback page
          <RateReviewIcon fontSize="large" sx={{marginLeft: 2}} />
        </Typography>
        <Typography
          component="h2"
          sx={{fontWeight: 400, marginBottom: 4}}
          variant="h6"
        >
          Please fill in the form below to submit a review
        </Typography>
        <CustomerFeedbackForm fetchReviews={fetchReviews} />
        <RatingsChart chartData={ratingsChartData} />
        {/* TODO(jackbellmont): Handle review list of 0. "No reviews" */}
        <ReviewsList reviews={reviews} />
      </Container>
    </>
  );
};

export default App;
