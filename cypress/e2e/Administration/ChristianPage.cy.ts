describe('Test the tables of the administrator interface.', () => {
  before(() => {
    cy.login(true)
  })

  it('View christian details', () => {
    cy.get('a[href="/admin/christians"]:visible', { timeout: 5000 }).click()

    cy.shouldBeVisible('.christians-table > div > table')
    cy.get('.christians-table > div > table tbody tr:nth-child(3)').click()

    cy.urlInclude('/admin/christian/')
    cy.shouldBeVisible('.overview-tile')

    cy.shouldBeVisible('.churches-tile')
    cy.shouldBeVisible('.churches-tile .churches-table')
    cy.get('.churches-tile .churches-table tbody tr:first-child').should(
      'not.have.class',
      'v-data-table__empty-wrapper'
    )

    cy.shouldBeVisible('.password-requests-tile')
    cy.shouldBeVisible('.password-requests-tile .password-requests-table')
    cy.get('.password-requests-tile .password-requests-table tbody tr:first-child').should(
      'not.have.class',
      'v-data-table__empty-wrapper'
    )

    cy.shouldBeVisible('.emails-history-tile')
    cy.shouldBeVisible('.emails-history-tile .emails-history-table')
    cy.get('.emails-history-tile .emails-history-table tbody tr:first-child').should(
      'not.have.class',
      'v-data-table__empty-wrapper'
    )

    cy.get('.requests-history-tile').scrollIntoView()
    cy.shouldBeVisible('.requests-history-tile')
    cy.shouldBeVisible('.requests-history-tile .requests-history-table')
    cy.get('.requests-history-tile .requests-history-table tbody tr:first-child').should(
      'not.have.class',
      'v-data-table__empty-wrapper'
    )
  })
})
