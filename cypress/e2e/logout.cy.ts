describe("Logout", () => {
  it("Should logout", () => {
    cy.visit("/");
    cy.login("alan.test@gmail.com", "senha123");
    cy.get('[data-test="button-logout"]').click();
    cy.url().should("eq", "http://localhost:3000/login");
  });
});
