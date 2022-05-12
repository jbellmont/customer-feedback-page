import {Container, Typography} from '@mui/material';

import CustomerFeedbackForm from '../customer-feedback/components/CustomerFeedbackForm';

const App = () => (
  <Container maxWidth="lg">
    <header>
      <Typography component="h1" sx={{fontWeight: 500}} variant="h3">
        Customer feedback page
      </Typography>
    </header>
    <CustomerFeedbackForm />
  </Container>
);

export default App;
