import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Rating,
  Box,
  Stack,
} from '@mui/material';

import {Review} from '../types/models';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({reviews}: ReviewsListProps) => {
  const createAvatarNameInitials = (name: string): string => {
    return name.split(' ').reduce((previous, current) => {
      return previous + current[0].toUpperCase();
    }, '');
  };

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
    <List sx={{width: '100%', maxWidth: 600}}>
      {reviewsToDisplay.map((review: Review) => {
        return (
          <>
            <ListItem alignItems="flex-start" key={review.id}>
              <ListItemAvatar>
                <Avatar>{createAvatarNameInitials(review.name)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Rating name="read-only" readOnly value={review.rating} />
                }
                secondary={
                  <Stack>
                    <Box>
                      <Typography
                        sx={{display: 'inline'}}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.name}
                      </Typography>
                      {` - ${review.date.toLocaleDateString()}`}
                    </Box>
                    <Box>{review.comment}</Box>
                  </Stack>
                }
              />
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
};

export default ReviewsList;
