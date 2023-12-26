

describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('should display the login form', () => {
    // Assert that the form is present and visible
    cy.get('form').should('be.visible');
  });

  it('should successfully login a user', () => {
    // Fill out the login form
    cy.get('[formControlName=Email]').type('john@example.com');
    cy.get('[formControlName=PasswordHash]').type('password123');

    // Submit the form
    cy.get('[type=submit]').click();




  });

  it('should display error messages for invalid login credentials', () => {
    // Submit the form without filling it out
    cy.get('[type=submit]').click();

    // Assert error messages
    cy.get('[data-cy=email-error]')
      .should('be.visible')
      .and('contain', 'Please enter a valid email address');
    cy.get('[data-cy=password-error]')
      .should('be.visible')
      .and('contain', 'Password must be at least 6 characters long');
  });

  it('should navigate to the registration page when "Sign up" link is clicked', () => {
    // Click on the "Sign up" link
    cy.contains('Sign up').click();

    
  });
});
