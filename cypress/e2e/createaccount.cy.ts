describe("Create Account", () => {
  it("Fields should be required", () => {
    cy.visit("/");
    cy.get('[data-test="button-newAccount"]').click();
    cy.get('[data-test="button-submit"]').click();
    cy.get('[data-test="input-name"]').should("have.attr", "required");
    cy.get('[data-test="input-name"]').type("Alan");
    cy.get('[data-test="input-email"]').should("have.attr", "required");
    cy.get('[data-test="input-email"]').type("testando@testando.com");
    cy.get('[data-test="input-password"]').should("have.attr", "required");
    cy.get('[data-test="input-password"]').type("senha123");
    cy.get('[data-test="input-confirmPassword"]').should("have.attr", "required");
  });
  it("Password should be equal", () => {
    cy.visit("/");
    cy.get('[data-test="button-newAccount"]').click();
    cy.get('[data-test="button-submit"]').click();
    cy.get('[data-test="input-name"]').type("Alan");
    cy.get('[data-test="input-email"]').type("testando@testando.com");
    cy.get('[data-test="input-password"]').type("senha123");
    cy.get('[data-test="input-confirmPassword"]').type("senha1234");
    cy.get('[data-test="button-submit"]').click();
    cy.get('[data-test="text-alert"]').should("contain", "*As senhas precisam ser iguais");
  });
  it("Should create account", () => {
    const random = Math.floor(Math.random() * 1000);
    cy.visit("/");
    cy.get('[data-test="button-newAccount"]').click();
    cy.get('[data-test="input-name"]').type("Alan");
    cy.get('[data-test="input-email"]').type(`testando${random}@testando.com`);
    cy.get('[data-test="input-password"]').type("senha123");
    cy.get('[data-test="input-confirmPassword"]').type("senha123");
    cy.get('[data-test="button-submit"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
