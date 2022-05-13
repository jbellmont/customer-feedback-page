const muiListClassName = '.MuiList-root';

describe('Customer Feedback Page', () => {
  it('Adds a new review on submit', () => {
    cy.visit('/');
    const nameText = 'John Smith';
    const emailText = 'john@email.com';
    const commentText = 'Test';

    // Enter form values.
    cy.findByTestId('select-rating-test-id').click();
    cy.findByRole('textbox', {name: /name/i}).type(nameText);
    cy.findByRole('textbox', {name: /email/i}).type(emailText);
    cy.findByRole('textbox', {name: /comment/i}).type(commentText);
    cy.findByRole('button', {name: /submit review/i}).click();

    // Check if Success Message appears.
    cy.findByText(/review submitted successfully/i).should('exist');

    // Check length of reviews.
    cy.get(muiListClassName).find('li').should('have.length', 1);

    // Check correct review is added.
    cy.get(muiListClassName)
      .find('li')
      .findByText(new RegExp(nameText, 'i'))
      .should('exist');

    cy.get(muiListClassName)
      .find('li')
      .findByText(new RegExp(commentText, 'i'))
      .should('exist');

    // Check correct avatar is displayed.
    cy.get(muiListClassName).find('li').findByText(/JS/i).should('exist');

    // Check today's date is displayed.
    const dateNow = new Date().toLocaleDateString();
    cy.get(muiListClassName)
      .find('li')
      .findByText(new RegExp(dateNow))
      .should('exist');

    // Check a rating of 3 stars is displayed.
    cy.get(muiListClassName)
      .find('li')
      .findByLabelText(/3 Stars/i)
      .should('exist');
  });

  it('Unable to add a new review on submit with invalid form', () => {
    cy.visit('/');

    // Enter form values.
    cy.findByRole('textbox', {name: /name/i}).type('a');
    cy.findByRole('textbox', {name: /name/i}).clear();
    cy.findByText(/please provide a name/i).should('exist');

    cy.findByRole('textbox', {name: /email/i}).type('a');
    cy.findByRole('textbox', {name: /email/i}).clear();
    cy.findByText(/please provide a properly formatted email address/i).should(
      'exist'
    );

    cy.findByRole('textbox', {name: /comment/i}).type('a');
    cy.findByRole('textbox', {name: /comment/i}).clear();
    cy.findByText(/please provide a comment/i).should('exist');

    cy.findByRole('button', {name: /submit review/i}).should('be.disabled');
  });
});
