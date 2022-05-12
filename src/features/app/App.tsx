import {Container, Typography} from '@mui/material';

import CustomerFeedbackForm from '../customer-feedback/components/CustomerFeedbackForm';
import {getReviews} from '../customer-feedback/api/reviews';
import {Review} from '../customer-feedback/types/models';
import ReviewsList from '../customer-feedback/components/ReviewsList';

const App = () => {
  const reviews: Review[] = getReviews();

  return (
    <Container maxWidth="lg">
      <header>
        <Typography component="h1" sx={{fontWeight: 500}} variant="h3">
          Customer feedback page
        </Typography>
      </header>
      <CustomerFeedbackForm />
      {/* TODO(jackbellmont): Handle review list of 0. "No reviews" */}
      <ReviewsList reviews={reviews} />
    </Container>
  );
};

export default App;
