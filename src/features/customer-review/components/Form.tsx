import {useState} from 'react';

import Input from './Input';
import SelectRating from './SelectRating';

const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [commentValue, setCommentValue] = useState('');

  return (
    <form>
      Form component
      <Input
        errorText={'Please provide a name'}
        label="Name"
        setValue={setNameValue}
        type="text"
        value={nameValue}
      />
      <Input
        errorText={'Please provide a properly formatted email address'}
        label="Email"
        setValue={setEmailValue}
        type="email"
        value={emailValue}
      />
      <SelectRating setValue={setRatingValue} value={ratingValue} />
      <Input
        errorText={'Please provide a comment'}
        label="Comment"
        multiline
        setValue={setCommentValue}
        type="text"
        value={commentValue}
      />
    </form>
  );
};

export default Form;
