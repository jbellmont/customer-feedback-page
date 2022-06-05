import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

export interface FilterProps {
  ratingFilterValue: string;
  setRatingFilterValue: (value: string) => void;
}

const Filter = ({ratingFilterValue, setRatingFilterValue}: FilterProps) => {
  const handleOnChange = (event: SelectChangeEvent) => {
    const {value} = event.target;
    setRatingFilterValue(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Filter by rating</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={ratingFilterValue}
        label="Rating"
        onChange={handleOnChange}
      >
        {[
          'One star',
          'Two Stars',
          'Three Stars',
          'Four Stars',
          'Five Stars',
        ].map((value, index) => (
          <MenuItem key={value} value={index + 1}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
