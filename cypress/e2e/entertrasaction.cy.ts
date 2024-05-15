describe("Enter Transaction", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("alan.test@gmail.com", "senha123");
    cy.dataTest("enterTrasaction").click();
  });
  it("Should enter transaction", () => {
    cy.dataTest("newTransaction").click();
    cy.dataTest("input-description").type("Teste");
    cy.get("#basic_date").click();
    cy.get(".ant-picker-today-btn").click();
    cy.dataTest("category").click();
    cy.dataTest("option-newCategory").click();
    cy.dataTest("input-categoryDescription").type("Teste");
    cy.dataTest("input-value").type("100");
    cy.dataTest("button-submit").click();
    cy.get(".ant-message-notice-content").should("contain", "Transação adicionada com sucesso!");
  });
  it.skip("Should show message error to required fields", () => {
    cy.dataTest("newTransaction").click();
    cy.dataTest("button-submit").click();
    cy.get(".ant-form-item-explain-error").should("have.length", 4);
  });
  it.skip("Should be able to edit transaction", () => {
    cy.dataTest("button-editTransaction").click();
    cy.dataTest("input-editDescription").clear().type("Teste Editado");
    cy.dataTest("button-editSubmit").click();
    cy.get(".ant-message-notice-content").should("contain", "Transação atualizada com sucesso!");
  });
  it.skip("Should be able to delete transaction", () => {
    cy.dataTest("button-editTransaction").click();
    cy.dataTest("button-deleteTransaction").click();
    cy.get(".ant-message-notice-content").should("contain", "Transação deletada com sucesso!");
  });
});
