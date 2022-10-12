describe('Test bugs.', () => {
  before(() => {
    cy.login(false)
  })

  it('Christians table test', () => {
    cy.visit('/church/join/ccc/role')
    cy.get('a[href="/church/join"]').click()
    cy.urlEquals('/church/join')
  })
})
