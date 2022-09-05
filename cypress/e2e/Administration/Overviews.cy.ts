describe('Test the tables of the administrator interface.', () => {
  beforeEach(() => {
    cy.login(true)
  })

  it('Christians table test', () => {
    cy.get('a[href="/admin/christians"]:visible', { timeout: 5000 }).click()

    cy.get('.christians-table > div > table').should('be.visible')
    cy.get('.christians-table tbody tr:first-child td:not(.d-none)').should('have.length', 4)

    // Avatar
    cy.get('.christians-table tbody tr:first-child td:nth-child(1) .v-avatar').should('be.visible')

    // Name
    cy.get('.christians-table tbody tr:first-child td:nth-child(2)')
      .invoke('text')
      .should('match', /^[A-Z'][a-z ']* [A-Z' ]*$/)

    // Email
    cy.get('.christians-table tbody tr:first-child td:nth-child(3)')
      .invoke('text')
      .should(
        'match',
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    // Phone
    cy.get('.christians-table tbody tr:first-child td:nth-child(4)')
      .invoke('text')
      .should('match', /^\+\d{2} \d \d{2} \d{2} \d{2} \d{2}$/)
  })

  it('Mailing table test', () => {
    cy.get('a[href="/admin/emails"]:visible', { timeout: 5000 }).click()

    cy.get('.emails-table > div > table').should('be.visible')
    cy.get('.emails-table tbody tr:first-child td:not(.d-none)').should('have.length', 5)

    // Code
    cy.get('.emails-table tbody tr:first-child td:nth-child(1)').invoke('text').should('match', /\d{3}/)

    // Date
    cy.get('.emails-table tbody tr:first-child td:nth-child(2)')
      .invoke('text')
      .should('match', /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2} \(\d{3}\)/)

    // Subject
    cy.get('.emails-table tbody tr:first-child td:nth-child(3)')
      .invoke('text')
      .should(
        'match',
        /\w*/
      )

    // From
    cy.get('.emails-table tbody tr:first-child td:nth-child(4)')
      .invoke('text')
      .should(
        'match',
        /<(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/
      )

    // To
    cy.get('.emails-table tbody tr:first-child td:nth-child(5)')
      .invoke('text')
      .should(
        'match',
        /^\w* <(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>$/
      )
  })
})
