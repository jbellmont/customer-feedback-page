import {Rating} from '@mui/material';

export interface SelectRatingProps {
  setValue: (value: number) => void;
  value: number;
}

const SelectRating = ({setValue, value}: SelectRatingProps) => {
  // TODO(jackbellmont): Handle error message when working on Form validation.
  return (
    <Rating
      name="rating"
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue as number);
      }}
    />
  );
};

export default SelectRating;
