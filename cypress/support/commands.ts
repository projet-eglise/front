/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(isAdmin: boolean, email?: string, password?: string): Chainable<void>
    // fake(what: string): string
  }
}

Cypress.Commands.add('login', (isAdmin: boolean, email?: string, password?: string) => {
  cy.visit(isAdmin ? '/admin/login' : '/login')

  const emailAndPasswordDefined = email !== undefined && password !== undefined

  const credentials = emailAndPasswordDefined
    ? { email: email, password: password }
    : isAdmin
    ? Cypress.env('credentials').admin
    : Cypress.env('credentials').user

  cy.get('input#email').clear().type(credentials.email)
  cy.get('input#password').clear().type(credentials.password)

  cy.get('#submit').click()
  cy.wait(1000)
})

// Cypress.Commands.add('fake', (what: string) => {
//   const faker = require('@faker-js/faker')
//   faker.locale = 'fr'

//   switch (what) {
//     default:
//     case 'firstname':
//       // console.log(faker)
//       return 'aaa'
//       // return faker.faker.name.firstName()
//       break
//       return ''
//   }
// })
