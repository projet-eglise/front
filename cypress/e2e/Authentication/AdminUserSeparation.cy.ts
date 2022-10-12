describe('Test the user has access to the correct platform', () => {
  it('The administrator doesn\'t have access to the user\'s platform', () => {
    cy.login(true)

    cy.urlInclude('/admin/dashboard')

    cy.visit('/dashboard')

    cy.urlInclude('/login')
  })

  it('The user doesn\'t have access to the admins\'s platform', () => {
    cy.login(false)

    cy.urlInclude('/church/add-or-join')

    cy.visit('/admin/dashboard')

    cy.urlInclude('/login')
  })

  it('Administrator and user login', () => {
    cy.login(true)

    cy.urlInclude('/admin/dashboard')

    cy.login(false)

    cy.urlInclude('/church/add-or-join')

    cy.visit('/admin/dashboard')
    cy.urlInclude('/admin/dashboard')

    cy.visit('/dashboard')
    cy.urlInclude('/dashboard')
  })


  it('User login after administrator logout', () => {
    cy.login(true)
    
    cy.urlInclude('/admin/dashboard')
    
    cy.get('a[href="/admin/logout"]:visible', { timeout: 5000 }).click()
    
    cy.login(false)
    
    cy.urlInclude('/church/add-or-join')
  })
})