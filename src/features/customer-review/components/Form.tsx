import {Button} from '@mui/material';
import {useState} from 'react';

import Input from './Input';
import SelectRating from './SelectRating';

const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const [commentValue, setCommentValue] = useState('');
  const [isCommentValid, setIsCommentValid] = useState(true);

  return (
    <form>
      Form component
      <Input
        errorText={'Please provide a name'}
        isValid={isNameValid}
        label="Name"
        setIsValid={setIsNameValid}
        setValue={setNameValue}
        type="text"
        value={nameValue}
      />
      <Input
        errorText={'Please provide a properly formatted email address'}
        isValid={isEmailValid}
        label="Email"
        setIsValid={setIsEmailValid}
        setValue={setEmailValue}
        type="email"
        value={emailValue}
      />
      <SelectRating setValue={setRatingValue} value={ratingValue} />
      <Input
        errorText={'Please provide a comment'}
        isValid={isCommentValid}
        label="Comment"
        setIsValid={setIsCommentValid}
        multiline
        setValue={setCommentValue}
        type="text"
        value={commentValue}
      />
      <Button variant="contained">Submit review</Button>
    </form>
  );
};

export default Form;
