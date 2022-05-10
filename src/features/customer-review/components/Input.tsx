import {useState} from 'react';
import {TextField} from '@mui/material';

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface InputProps {
  errorText: string;
  label: string;
  setValue: (value: string) => void;
  type: 'text' | 'email';
  value: string;
}

export const MAX_CHAR_LENGTH = 255;

const Input = ({errorText, setValue, label, type, value}: InputProps) => {
  const [isValid, setIsValid] = useState(true);

  const isNameValid = (name: string): boolean => {
    return name.length > 0 && name.length <= MAX_CHAR_LENGTH;
  };

  const isEmailValid = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  const validators = {
    email: isEmailValid,
    text: isNameValid,
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setValue(value);

    const isNewValueValid = validators[type](value);

    if (!isValid && isNewValueValid) {
      setIsValid(true);
    } else if (isValid && !isNewValueValid) {
      setIsValid(false);
    }
  };

  return (
    <TextField
      error={!isValid}
      helperText={isValid ? null : errorText}
      id="outlined-basic"
      inputProps={{
        maxLength: MAX_CHAR_LENGTH,
      }}
      label={label}
      onChange={handleOnChange}
      required
      type={type}
      value={value}
      variant="outlined"
    />
  );
};

export default Input;
