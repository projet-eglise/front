describe('Test the signin portal', () => {
  beforeEach(() => {
    cy.visit('/signin')
  })

  it('Signin success', () => {
    const faker = require('@faker-js/faker').faker
    const firstname = faker.name.firstName()
    const lastname = faker.name.lastName()
    cy.get('input#firstname').clear().type(firstname)
    cy.get('input#lastname').clear().type(lastname)
    cy.get('input#email').clear().type(faker.internet.email(firstname, lastname))
    cy.get('input[id$="_phone_number"]').clear().type('600000000')

    cy.get('#birthdate-input').click()
    cy.wait(500)
    cy.get('#birthdate-modal .v-date-picker-years li:nth-child(22)').click()
    cy.get('#birthdate-modal .v-date-picker-table--month tr:first-child td:first-child').click()
    cy.get('#birthdate-modal .v-date-picker-table--date tr:nth-child(2) td:nth-child(2) button').click()
    cy.get('#birthdate-modal .v-card__actions button:last-child').click()
    
    cy.get('input#password').clear().type('@Zertyu1p23')
    cy.get('input#confirm-password').clear().type('@Zertyu1p23')

    cy.get('#submit').click()

    cy.url().should('include', '/church/add-or-join')
  })
  
  it('Signin error open a toast', () => {
    const faker = require('@faker-js/faker').faker
    cy.get('input#firstname').clear().type(faker.name.firstName())
    cy.get('input#lastname').clear().type(faker.name.lastName())
    cy.get('input#email').clear().type(Cypress.env('credentials').admin.email)
    cy.get('input[id$="_phone_number"]').clear().type('600000000')
    
    cy.get('#birthdate-input').click()
    cy.wait(500)
    cy.get('#birthdate-modal .v-date-picker-years li:nth-child(22)').click()
    cy.get('#birthdate-modal .v-date-picker-table--month tr:first-child td:first-child').click()
    cy.get('#birthdate-modal .v-date-picker-table--date tr:nth-child(2) td:nth-child(2) button').click()
    cy.get('#birthdate-modal .v-card__actions button:last-child').click()

    cy.get('input#password').clear().type('@Zertyu1p23')
    cy.get('input#confirm-password').clear().type('@Zertyu1p23')

    cy.get('#submit').click()

    cy.get('.alert-widget .v-alert', { timeout: 1000 }).should('be.visible')

    cy.url().should('include', '/signin')
  })
})
