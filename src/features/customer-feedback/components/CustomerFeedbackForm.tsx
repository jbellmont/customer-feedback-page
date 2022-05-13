import {Button, Stack} from '@mui/material';
import {Box} from '@mui/system';
import {SyntheticEvent, useEffect, useState} from 'react';

import {googleGreen} from '../../../shared/styles/colours';

import {createReview, ReviewPayload} from '../api/reviews';

import SelectRating from './SelectRating';
import TextInput from './TextInput';

export const CUSTOMER_FEEDBACK_FORM_TEST_ID = 'form-test-id';
export const NAME_TEXT_INPUT_TEST_ID = 'name-test-id';
export const EMAIL_TEXT_INPUT_TEST_ID = 'email-test-id';
export const COMMENT_TEXT_INPUT_TEST_ID = 'comment-test-id';

export interface CustomerFeedbackFormProps {
  fetchReviews: () => void;
}

const CustomerFeedbackForm = ({fetchReviews}: CustomerFeedbackFormProps) => {
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
    const ratingIsValid: boolean = ratingValue > 0;

    setIsFormValid(textInputsHaveValues && textInputsAreValid && ratingIsValid);
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
      fetchReviews();
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      data-testid={CUSTOMER_FEEDBACK_FORM_TEST_ID}
      onSubmit={submitReview}
      name="customer-feedback"
      style={{position: 'relative'}}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{alignItems: 'center', paddingInlineStart: '14px', height: 50}}
        >
          <label htmlFor="rating">Rating</label>
          <SelectRating setValue={setRatingValue} value={ratingValue} />
        </Stack>
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
      </Stack>
      <Button
        disabled={!isFormValid}
        sx={{position: 'relative'}}
        type="submit"
        variant="contained"
      >
        Submit review
      </Button>
      {showSuccessMessage ? (
        <Box
          sx={{
            bottom: -70,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            color: 'white',
            borderRadius: 2,
            background: googleGreen,
            fontWeight: 500,
            padding: 2,
            position: 'absolute',
          }}
        >
          Review submitted successfully
        </Box>
      ) : null}
    </form>
  );
};

export default CustomerFeedbackForm;
