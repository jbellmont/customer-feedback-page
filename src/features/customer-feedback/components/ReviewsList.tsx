import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
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
  // TODO(jackbellmont): Format date nicely, e.g. Tues 15th March.
  return (
    <List sx={{width: '100%', maxWidth: 600}}>
      {reviewsToDisplay.map((review: Review) => {
        return (
          <ListItem
            alignItems="flex-start"
            key={review.id}
            sx={{borderBottom: 1, borderColor: '#dbdbdb'}}
          >
            <ListItemAvatar>
              <Avatar>{createAvatarNameInitials(review.name)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack>
                  <Rating name="read-only" readOnly value={review.rating} />
                  <Box>
                    <Typography
                      sx={{display: 'inline'}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {review.name} - {review.date.toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>
              }
              secondary={review.comment}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ReviewsList;
