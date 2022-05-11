import {TextField} from '@mui/material';

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface InputProps {
  errorText: string;
  isValid: boolean;
  label: string;
  multiline?: boolean;
  setIsValid: (isValid: boolean) => void;
  setValue: (value: string) => void;
  type: 'text' | 'email';
  value: string;
}

export const SINGLE_LINE_CHARACTER_LIMIT = 255;
export const MULTI_LINE_CHARACTER_LIMIT = 1000;

const Input = ({
  errorText,
  isValid,
  label,
  multiline,
  setIsValid,
  setValue,
  type,
  value,
}: InputProps) => {
  const maxCharacters = multiline
    ? MULTI_LINE_CHARACTER_LIMIT
    : SINGLE_LINE_CHARACTER_LIMIT;

  const isNameValid = (name: string): boolean => {
    return name.length > 0 && name.length <= maxCharacters;
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
        maxLength: maxCharacters,
      }}
      label={label}
      multiline={multiline}
      onChange={handleOnChange}
      required
      minRows={multiline ? 3 : 1}
      type={type}
      value={value}
      variant="outlined"
    />
  );
};

export default Input;
