describe('Test the tables of the administrator interface.', () => {
  before(() => {
    cy.login(true)
  })

  it('Christians table test', () => {
    cy.get('a[href="/admin/christians"]:visible', { timeout: 5000 }).click()

    cy.get('.christians-table > div > table').should('be.visible')
    cy.get('.christians-table tbody tr:first-child td:not(.d-none)').should('have.length', 5)

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

    // Ghost mode
    cy.get('.christians-table tbody tr:first-child td:nth-child(5) button.fa-ghost').should('be.visible')
  })

  it('Churches table test', () => {
    cy.get('a[href="/admin/churches"]:visible', { timeout: 5000 }).click()

    cy.get('.churches-table > div > table').should('be.visible')
    cy.get('.churches-table tbody tr:first-child td:not(.d-none)').should('have.length', 4)

    // Church name
    cy.get('.churches-table tbody tr:first-child td:nth-child(1)').invoke('text').should('match', /^.+$/)

    // Address
    cy.get('.churches-table tbody tr:first-child td:nth-child(2)').invoke('text').should('match', /^.+$/)

    // Administrator fullname
    cy.get('.churches-table tbody tr:first-child td:nth-child(3)')
      .invoke('text')
      .should('match', /^[A-Z'][a-zé ']* [A-Z' ]*$/)

    // Pastor fullname
    cy.get('.churches-table tbody tr:first-child td:nth-child(4)')
      .invoke('text')
      .should('match', /^[A-Z'][a-zé ']* [A-Z' ]*$/)
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
    cy.get('.emails-table tbody tr:first-child td:nth-child(3)').invoke('text').should('match', /\w*/)

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

  it.only('Logs table test', () => {
    cy.get('a[href="/admin/logs"]:visible', { timeout: 5000 }).click()

    cy.get('.logs-table > div > table').should('be.visible')
    cy.get('.logs-table tbody tr:first-child td:not(.d-none)').should('have.length', 5)

    // Date
    cy.get('.logs-table tbody tr:first-child td:nth-child(1)')
      .invoke('text')
      .should('match', /\d{2}\/\d{2}\/\d{4}\d{2}:\d{2}:\d{2} \(\d{3}\)/)

    // User
    cy.get('.logs-table tbody tr:first-child td:nth-child(2) > a > div > div.v-avatar')
    cy.get('.logs-table tbody tr:first-child td:nth-child(2) > a > div > div:last-child > p')

    // Code
    cy.get('.logs-table tbody tr:first-child td:nth-child(3) span span.v-chip')

    // Method
    cy.get('.logs-table tbody tr:first-child td:nth-child(4) span').should('be.visible')

    // Route
    cy.get('.logs-table tbody tr:first-child td:nth-child(5)')
      .invoke('text')
      .should('match', /^\/([a-z]*)/)

    cy.get('.logs-table tbody tr:first-child').click()
    cy.get('.request-details-modal', { timeout: 1000 }).should('be.visible')
  })
})
