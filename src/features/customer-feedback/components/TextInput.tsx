import {TextField} from '@mui/material';

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface TextInputProps {
  errorText: string;
  isValid: boolean;
  label: string;
  multiline?: boolean;
  setIsValid: (isValid: boolean) => void;
  setValue: (value: string) => void;
  testId: string;
  type: 'text' | 'email';
  value: string;
}

export const SINGLE_LINE_CHARACTER_LIMIT = 255;
export const MULTI_LINE_CHARACTER_LIMIT = 1000;

const TextInput = ({
  errorText,
  isValid,
  label,
  multiline,
  setIsValid,
  setValue,
  testId,
  type,
  value,
}: TextInputProps) => {
  const maxCharacters = multiline
    ? MULTI_LINE_CHARACTER_LIMIT
    : SINGLE_LINE_CHARACTER_LIMIT;

  const isNameValid = (name: string): boolean => {
    const isNameWithinCharacterLimit =
      name.length > 0 && name.length <= maxCharacters;
    const doesNameContainMoreThanWhitespace = /.*\S.*/.test(name);

    return isNameWithinCharacterLimit && doesNameContainMoreThanWhitespace;
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
      fullWidth
      id={label}
      inputProps={{
        'data-testid': testId,
        maxLength: maxCharacters,
      }}
      helperText={isValid ? null : errorText}
      label={label}
      name={label}
      multiline={multiline}
      onChange={handleOnChange}
      required
      maxRows={3}
      minRows={multiline ? 3 : 1}
      sx={{height: multiline ? 140 : 75}}
      type={type}
      value={value}
      variant="outlined"
    />
  );
};

export default TextInput;
