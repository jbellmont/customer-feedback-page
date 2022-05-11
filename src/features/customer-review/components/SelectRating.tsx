import {Rating} from '@mui/material';

export interface SelectRatingProps {
  setValue: (value: number | null) => void;
  value: number | null;
}

const SelectRating = ({setValue, value}: SelectRatingProps) => {
  // TODO(jackbellmont): Handle error message when working on Form validation.
  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    />
  );
};

export default SelectRating;
