import {Rating} from '@mui/material';

export interface SelectRatingProps {
  setValue: (value: number) => void;
  value: number;
}

export const SELECT_RATING_TEST_ID = 'select-rating-test-id';

const SelectRating = ({setValue, value}: SelectRatingProps) => {
  return (
    <Rating
      data-testid={SELECT_RATING_TEST_ID}
      name="rating"
      value={value}
      onChange={(event, newValue) => {
        const targetElementValue = Number(
          (event.target as HTMLInputElement).value
        );

        // Ensures we don't set 'value' as null and that the value is
        // correctly being emitted in our userevent tests.
        setValue(newValue === null ? 0 : targetElementValue);
      }}
    />
  );
};

export default SelectRating;
