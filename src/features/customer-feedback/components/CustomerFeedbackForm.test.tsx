import {MOCK_UUID} from '../api/mocks';
jest.mock('uuid', () => ({v4: () => MOCK_UUID}));

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomerFeedbackForm, {
  COMMENT_TEXT_INPUT_TEST_ID,
  CustomerFeedbackFormProps,
  CUSTOMER_FEEDBACK_FORM_TEST_ID,
  EMAIL_TEXT_INPUT_TEST_ID,
  NAME_TEXT_INPUT_TEST_ID,
} from './CustomerFeedbackForm';
import {SELECT_RATING_TEST_ID} from './SelectRating';

const baseProps: CustomerFeedbackFormProps = {
  fetchReviews: jest.fn(),
};

describe('CustomerFeedbackForm component', () => {
  it('should render', () => {
    render(<CustomerFeedbackForm {...baseProps} />);
    const formElement = screen.getByTestId(CUSTOMER_FEEDBACK_FORM_TEST_ID);

    expect(formElement).toBeInTheDocument();
  });

  // Due to the inability to query and then click on the MUI Rating component,
  // I could not test user interaction with it.
  it('should display a success message on successful form submission', async () => {
    const user = userEvent.setup();
    render(<CustomerFeedbackForm {...baseProps} />);

    const nameTextInput = screen.getByTestId(NAME_TEXT_INPUT_TEST_ID);
    await user.type(nameTextInput, 'John Smith');

    const emailTextInput = screen.getByTestId(EMAIL_TEXT_INPUT_TEST_ID);
    await user.type(emailTextInput, 'valid@gmail.com');

    const commentTextInput = screen.getByTestId(COMMENT_TEXT_INPUT_TEST_ID);
    await user.type(commentTextInput, 'Comment');

    const ratingsComponent = screen.getByTestId(SELECT_RATING_TEST_ID);
    // eslint-disable-next-line testing-library/no-node-access
    const oneStarElement = ratingsComponent.children[0];
    await user.click(oneStarElement);

    const submitButton = screen.getByRole('button', {name: /submit review/i});
    await user.click(submitButton);

    const successMessage = screen.getByText(/review submitted successfully/i);

    expect(successMessage).toBeInTheDocument();
  });

  it('should have disabled submit button when form is not valid', async () => {
    const user = userEvent.setup();
    render(<CustomerFeedbackForm {...baseProps} />);

    const emailTextInput = screen.getByTestId(EMAIL_TEXT_INPUT_TEST_ID);
    await user.type(emailTextInput, 'invalid.com');

    const submitButton = screen.getByRole('button', {name: /submit review/i});
    expect(submitButton).toBeDisabled();
  });
});
