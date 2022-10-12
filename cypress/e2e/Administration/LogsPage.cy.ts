describe('Test of the error handling page.', () => {
  before(() => {
    cy.login(true)
  })

  beforeEach(() => {
    cy.get('a[href="/admin/errors"]:visible', { timeout: 5000 }).click()
    cy.get('.main-container:visible', { timeout: 5000 })
  })

  it('The button changes the display of the divs', () => {
    cy.get('.switch-known .choice-2').click()
    cy.shouldBeVisible('.known-errors')

    cy.get('.switch-known .choice-1').click()
    cy.shouldBeVisible('.unknown-errors-unsee')
  })

  it('View unknown errors tiles', () => {
    cy.get('.unknown-errors-unsee > div').should('have.length.gte', 1)
  })

  it('Can see and unseen', () => {
    cy.get('.unknown-errors-unsee > div:first-child .see-button').click()
    cy.get('.unknown-errors-see > div').should('have.length.gte', 1)
    cy.get('.unknown-errors-see > div:first-child .see-button').click()
  })

  it('Check card', () => {
    cy.get('.unknown-errors-unsee > div:first-child > *').should('have.length', 4)
    cy.get('.unknown-errors-unsee > div:first-child > div:first-child > *').should('have.length', 2)
    cy.get('.unknown-errors-unsee > div:first-child > div:first-child > div:first-child > *').should('have.length', 4)
    cy.shouldBeVisible('.unknown-errors-unsee > div:first-child > div:first-child > div:last-child button > span > i')

    cy.get('.unknown-errors-unsee > div:first-child > div:nth-child(3) > div > *').should('have.length', 48)
    
    cy.shouldBeVisible('.unknown-errors-unsee > div:last-child > div:last-child a[href^="/admin/error/"]')
  })


  it('View requests click', () => {
    cy.get('.unknown-errors-unsee > div:last-child > div:last-child a[href^="/admin/error/"]').click()
    cy.urlInclude('/admin/error/')
  })
})
