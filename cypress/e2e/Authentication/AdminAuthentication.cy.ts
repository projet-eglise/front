describe('Test the administrator login portal.', () => {
  beforeEach(() => {
    cy.visit('/admin/login')
  })

  it('Good credentials redirects to dashboard', () => {
    cy.get('input#email').clear().type(Cypress.env('credentials').admin.email)
    cy.get('input#password').clear().type(Cypress.env('credentials').admin.password)

    cy.get('#submit').click()

    cy.url().should('include', '/admin/dashboard')
  })

  it('Bad credentials gives error', () => {
    cy.get('input#email').clear().type(Cypress.env('credentials').admin.email)
    cy.get('input#password').clear().type('azeazeaze')

    cy.get('#submit').click()

    cy.get('.alert-widget .v-alert', { timeout: 1000 }).should('be.visible');

    cy.url().should('include', '/admin/login')
  })

  it('Not admin user gives error', () => {
    cy.get('input#email').clear().type(Cypress.env('credentials').user.email)
    cy.get('input#password').clear().type(Cypress.env('credentials').user.password)

    cy.get('#submit').click()

    cy.get('.alert-widget .v-alert', { timeout: 1000 }).should('be.visible');

    cy.url().should('include', '/admin/login')
  })

  it('Reconnect after disconnect', () => {
    cy.get('input#email').clear().type(Cypress.env('credentials').admin.email)
    cy.get('input#password').clear().type(Cypress.env('credentials').admin.password)

    cy.get('#submit').click()

    cy.url().should('include', '/admin/dashboard')

    cy.get('a[href="/admin/login"]:visible', { timeout: 5000 }).click()

    cy.get('input#email').clear().type(Cypress.env('credentials').admin.email)
    cy.get('input#password').clear().type(Cypress.env('credentials').admin.password)

    cy.get('#submit').click()

    cy.url().should('include', '/admin/dashboard')
  })
})