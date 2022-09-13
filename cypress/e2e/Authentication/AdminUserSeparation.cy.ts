describe('Test the user has access to the correct platform', () => {
  it('The administrator doesn\'t have access to the user\'s platform', () => {
    cy.login(true)

    cy.url().should('include', '/admin/dashboard')

    cy.visit('/dashboard')

    cy.url().should('include', '/login')
  })

  it('The user doesn\'t have access to the admins\'s platform', () => {
    cy.login(false)

    cy.url().should('include', '/church/add-or-join')

    cy.visit('/admin/dashboard')

    cy.url().should('include', '/login')
  })

  it('Administrator and user login', () => {
    cy.login(true)

    cy.url().should('include', '/admin/dashboard')

    cy.login(false)

    cy.url().should('include', '/church/add-or-join')

    cy.visit('/admin/dashboard')
    cy.url().should('include', '/admin/dashboard')

    cy.visit('/dashboard')
    cy.url().should('include', '/dashboard')
  })


  it('User login after administrator logout', () => {
    cy.login(true)
    
    cy.url().should('include', '/admin/dashboard')
    
    cy.get('a[href="/admin/logout"]:visible', { timeout: 5000 }).click()
    
    cy.login(false)
    
    cy.url().should('include', '/church/add-or-join')
  })
})