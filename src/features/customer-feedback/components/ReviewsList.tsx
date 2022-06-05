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
  Button,
} from '@mui/material';
import {useState} from 'react';

import {
  avatarDarkGrey,
  googleLightGrey,
  offWhite,
} from '../../../shared/styles/colours';

import {Review} from '../types/models';
import Filter from './Filter';

export interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({reviews}: ReviewsListProps) => {
  const [ratingFilterValue, setRatingFilterValue] = useState('');

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

  const filterReviews = (reviews: Review[]): Review[] => {
    const filterAsNumber = Number(ratingFilterValue);
    if (filterAsNumber === 0) return reviews;

    return [...reviews].filter((review) => {
      return review.rating === filterAsNumber;
    });
  };

  const clearFilter = () => {
    setRatingFilterValue('');
  };

  const transformReviews = (reviews: Review[]): Review[] => {
    // Add more array transformation functions to the 'pipeline', e.g. filter.
    const filteredReviews = filterReviews(reviews);
    const sortedReviews = sortReviewsByMostRecentDate(filteredReviews);
    return sortedReviews;
  };

  const reviewsToDisplay: Review[] = transformReviews(reviews);

  return (
    <>
      <Button variant="outlined" onClick={clearFilter}>
        Clear
      </Button>
      <Filter
        ratingFilterValue={ratingFilterValue}
        setRatingFilterValue={setRatingFilterValue}
      />
      {reviewsToDisplay.length ? (
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
      )}
    </>
  );
};

export default ReviewsList;
