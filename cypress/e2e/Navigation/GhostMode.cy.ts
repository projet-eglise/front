describe('Test the ghost mode.', () => {
  before(() => {
    cy.login(true)
  })

  beforeEach(() => {
    cy.visit('/admin/christians')
  })

  it('Return to administration available and work', () => {
    cy.get('.christians-table tbody tr:first-child td:nth-child(5) button.fa-ghost').click()

    cy.url().should('include', '/dashboard')
    cy.get('#go-to-admin-button').should('be.visible');

    cy.get('a[href="/logout"]:visible', { timeout: 5000 }).click()
    cy.url().should('include', '/login')
    cy.get('#go-to-admin-button').should('be.visible');

    cy.login(false)
    cy.url().should('include', '/church/add-or-join')
    cy.get('#go-to-admin-button').should('be.visible');
    
    cy.get('#go-to-admin-button').click()
    cy.url().should('include', '/admin/christians')
  })
})
