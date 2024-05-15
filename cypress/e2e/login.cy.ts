describe("Login", () => {
  it("Should login", () => {
    cy.visit("/");
    cy.get('[data-test="button-login"]').click();
    cy.get('[data-test="input-email"]').type("alan.test@gmail.com");
    cy.get('[data-test="input-password"]').type("senha123");
    cy.get('[data-test="button-submit"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("Inputs should be required", () => {
    cy.visit("/");
    cy.get('[data-test="button-login"]').click();
    cy.get('[data-test="button-submit"]').click();
    cy.get('[data-test="input-email"]').should("have.attr", "required");
    cy.get('[data-test="input-password"]').should("have.attr", "required");
  });
  it("Should show error message", async () => {
    cy.visit("/");
    cy.get('[data-test="button-login"]').click();
    cy.get('[data-test="input-email"]').type("alan@alan.com");
    cy.get('[data-test="input-password"]').type("senha123");
    cy.get('[data-test="button-submit"]').click();
    cy.get(".ant-message-notice-content").should("contain", "Senha ou email incorreto!");
  });
});
