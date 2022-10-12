describe('Checks the operation of the error details page', () => {
    before(() => {
      cy.login(true)
    })
  
    it('View christian details', () => {
      cy.get('a[href="/admin/errors"]:visible', { timeout: 5000 }).click()
      cy.get('.error-card [href^="/admin/error/"]').first().click()

      cy.urlInclude('/admin/error/')
  
      cy.shouldBeVisible('#requests-datatable table')
      cy.get('#requests-datatable tr').should('have.length.gte', 1)
      
      cy.shouldBeVisible('#error-summary')
      cy.get('#error-summary >').should('have.length', 4)

      cy.get('#show-traces-button').click()
      cy.get('#error-summary >').should('have.length', 5)

      cy.get('#hide-traces-button').click()
      cy.get('#error-summary >').should('have.length', 4)
    })
  })
  