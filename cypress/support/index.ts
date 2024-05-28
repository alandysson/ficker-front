/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable;
      dataTest(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/");
  cy.get('[data-test="button-login"]').click();
  cy.get('[data-test="input-email"]').type(email);
  cy.get('[data-test="input-password"]').type(password);
  cy.get('[data-test="button-submit"]').click();
});
Cypress.Commands.add("dataTest", (value) => {
  return cy.get(`[data-test=${value}]`);
});
