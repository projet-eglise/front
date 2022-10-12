describe('Test the ghost mode.', () => {
  before(() => {
    cy.login(true)
  })

  beforeEach(() => {
    cy.visit('/admin/christians')
  })

  it('Return to administration available and work', () => {
    cy.get('.christians-table tbody tr:first-child td:nth-child(5) button.fa-ghost').click()

    cy.urlInclude('/dashboard')
    cy.shouldBeVisible('#go-to-admin-button');

    cy.get('a[href="/logout"]:visible', { timeout: 5000 }).click()
    cy.urlInclude('/login')
    cy.shouldBeVisible('#go-to-admin-button');

    cy.login(false)
    cy.urlInclude('/church/add-or-join')
    cy.shouldBeVisible('#go-to-admin-button');
    
    cy.get('#go-to-admin-button').click()
    cy.urlInclude('/admin/christians')
  })
})
