describe('Test bugs.', () => {
  before(() => {
    cy.login(false)
  })

  it('Christians table test', () => {
    cy.visit('/church/join/ccc/role')
    cy.get('a[href="/church/join"]').click()
    cy.url().should('equals', '/church/join')
  })
})
