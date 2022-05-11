import {Button} from '@mui/material';
import {SyntheticEvent, useEffect, useState} from 'react';
import {createReview, ReviewPayload} from '../api/reviews';

import SelectRating from './SelectRating';
import TextInput from './TextInput';

export const CUSTOMER_FEEDBACK_FORM_TEST_ID = 'form-test-id';
export const NAME_TEXT_INPUT_TEST_ID = 'name-test-id';
export const EMAIL_TEXT_INPUT_TEST_ID = 'email-test-id';
export const COMMENT_TEXT_INPUT_TEST_ID = 'comment-test-id';

const CustomerFeedbackForm = () => {
  const [nameValue, setNameValue] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [ratingValue, setRatingValue] = useState(0);

  const [commentValue, setCommentValue] = useState('');
  const [isCommentValid, setIsCommentValid] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const textInputsHaveValues = Boolean(
      nameValue && emailValue && commentValue
    );
    const textInputsAreValid = Boolean(
      isNameValid && isEmailValid && isCommentValid
    );

    setIsFormValid(textInputsHaveValues && textInputsAreValid);
  }, [
    nameValue,
    emailValue,
    ratingValue,
    commentValue,
    isNameValid,
    isEmailValid,
    isCommentValid,
  ]);

  const resetFormValues = () => {
    setNameValue('');
    setEmailValue('');
    setRatingValue(0);
    setCommentValue('');
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const submitReview = (event: SyntheticEvent) => {
    event.preventDefault();

    const newReviewPayload: ReviewPayload = {
      name: nameValue,
      email: emailValue,
      rating: ratingValue as number,
      comment: commentValue,
    };

    try {
      createReview(newReviewPayload);
      setShowSuccessMessage(true);
      resetFormValues();
    } catch (error) {
      // TODO(jackbellmont): Handle error message on error.
      console.error(error);
    }
  };

  return (
    <form
      data-testid={CUSTOMER_FEEDBACK_FORM_TEST_ID}
      onSubmit={(event) => submitReview(event)}
      name="customer-feedback"
    >
      Form component
      <TextInput
        errorText={'Please provide a name'}
        isValid={isNameValid}
        label="Name"
        setIsValid={setIsNameValid}
        setValue={setNameValue}
        testId={NAME_TEXT_INPUT_TEST_ID}
        type="text"
        value={nameValue}
      />
      <TextInput
        errorText={'Please provide a properly formatted email address'}
        isValid={isEmailValid}
        label="Email"
        setIsValid={setIsEmailValid}
        setValue={setEmailValue}
        testId={EMAIL_TEXT_INPUT_TEST_ID}
        type="email"
        value={emailValue}
      />
      <SelectRating setValue={setRatingValue} value={ratingValue} />
      <TextInput
        errorText={'Please provide a comment'}
        isValid={isCommentValid}
        label="Comment"
        setIsValid={setIsCommentValid}
        multiline
        setValue={setCommentValue}
        testId={COMMENT_TEXT_INPUT_TEST_ID}
        type="text"
        value={commentValue}
      />
      <Button disabled={!isFormValid} type="submit" variant="contained">
        Submit review
      </Button>
      {showSuccessMessage ? <p>Review submitted successfully</p> : null}
    </form>
  );
};

export default CustomerFeedbackForm;
