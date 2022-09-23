describe('Test the tables of the administrator interface.', () => {
  before(() => {
    cy.login(true)
  })

  it('View christian details', () => {
    cy.get('a[href="/admin/christians"]:visible', { timeout: 5000 }).click()

    cy.get('.christians-table > div > table').should('be.visible')
    cy.get('.christians-table > div > table tbody tr:nth-child(3)').click()

    cy.url().should('include', '/admin/christian/')
    cy.get('.overview-tile').should('be.visible')

    cy.get('.churches-tile').should('be.visible')
    cy.get('.churches-tile .churches-table').should('be.visible')
    cy.get('.churches-tile .churches-table tbody tr:first-child').should(
      'not.have.class',
      'v-data-table__empty-wrapper'
    )

    cy.get('.password-requests-tile').should('be.visible')
    cy.get('.password-requests-tile .password-requests-table').should('be.visible')
    cy.get('.password-requests-tile .password-requests-table tbody tr:first-child').should(
      'not.have.class',
      'v-data-table__empty-wrapper'
    )

    cy.get('.emails-history-tile').should('be.visible')
    cy.get('.emails-history-tile .emails-history-table').should('be.visible')
    cy.get('.emails-history-tile .emails-history-table tbody tr:first-child').should(
      'not.have.class',
      'v-data-table__empty-wrapper'
    )

    cy.get('.requests-history-tile').scrollIntoView()
    cy.get('.requests-history-tile').should('be.visible')
    cy.get('.requests-history-tile .requests-history-table').should('be.visible')
    cy.get('.requests-history-tile .requests-history-table tbody tr:first-child').should(
      'not.have.class',
      'v-data-table__empty-wrapper'
    )
  })
})
