import {useState} from 'react';

import Input from './Input';

const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
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
