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

import {
  avatarDarkGrey,
  googleLightGrey,
  offWhite,
} from '../../../shared/styles/colours';

import {Review} from '../types/models';

export interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({reviews}: ReviewsListProps) => {
  const createAvatarNameInitials = (name: string): string => {
    // Split the string on any length of whitespace.
    return name.split(/\s+/).reduce((previous, current) => {
      return previous + current[0].toUpperCase();
    }, '');
  };

  const sortReviewsByMostRecentDate = (reviews: Review[]): Review[] => {
    return [...reviews].sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  };

  const transformReviews = (reviews: Review[]): Review[] => {
    // Add more array transformation functions to the 'pipeline', e.g. filter.
    return sortReviewsByMostRecentDate(reviews);
  };

  const reviewsToDisplay: Review[] = transformReviews(reviews);

  return reviewsToDisplay.length ? (
    <List sx={{width: '100%'}}>
      {reviewsToDisplay.map((review: Review) => {
        return (
          <ListItem
            alignItems="flex-start"
            key={review.id}
            sx={{
              borderBottom: 1,
              borderColor: googleLightGrey,
              '&.MuiListItem-root': {
                transition: 'all 100ms',
                '&:hover': {
                  backgroundColor: offWhite,
                },
              },
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{background: avatarDarkGrey}}>
                {createAvatarNameInitials(review.name)}
              </Avatar>
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
              secondary={
                <span style={{display: 'inline-block', maxWidth: '750px'}}>
                  {review.comment}
                </span>
              }
            />
          </ListItem>
        );
      })}
    </List>
  ) : (
    <p>No reviews</p>
  );
};

export default ReviewsList;
