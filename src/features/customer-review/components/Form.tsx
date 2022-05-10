import {useState} from 'react';

import Input from './Input';

const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

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
    </form>
  );
};

export default Form;
