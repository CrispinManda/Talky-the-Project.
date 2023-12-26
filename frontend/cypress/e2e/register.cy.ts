// cypress/integration/register.spec.js

describe('Registration Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/'); // Update the URL accordingly
  });

  it('should display the registration form', () => {
    // Assert that the form is present and visible
    cy.get('form').should('be.visible');
  });

  it('should display the "Sign up" heading', () => {
    // Assert that the "Sign up" heading is present and contains the correct text
    cy.get('h1').should('have.text', 'Sign up');
  });

  it('should navigate to the login page when "Sign in" link is clicked', () => {
    // Click on the "Sign in" link
    cy.get('[data-cy=sign-in-link]').click();

    // Assert that the URL navigates to the login page
    cy.url().should('include', '/login');
  });

  it('should clear the form fields after successful registration', () => {
    // Fill out the registration form
    cy.get('[data-cy=name]').type('Peter Doe');
    cy.get('[data-cy=email]').type('peter@example.com');
    cy.get('[data-cy=password]').type('password123');

    // Submit the form
    cy.get('[data-cy=submit]').click();

    // Assert that form fields are cleared
    cy.get('[data-cy=name]').should('have.value', '');
    cy.get('[data-cy=email]').should('have.value', '');
    cy.get('[data-cy=password]').should('have.value', '');
  });

  it('should prevent form submission with invalid input', () => {
    // Fill out the registration form with invalid input
    cy.get('[data-cy=name]').type(''); // Empty name
    cy.get('[data-cy=email]').type('invalid-email'); // Invalid email
    cy.get('[data-cy=password]').type('short'); // Short password

    // Try to submit the form
    cy.get('[data-cy=submit]').click();

    // Assert that the form is not submitted (e.g., URL doesn't change)
    cy.url().should('not.include', '/success-page');
  });
});
