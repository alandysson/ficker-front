describe("Output Transaction", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("alan.test@gmail.com", "senha123");
    cy.dataTest("outputTrasaction").click();
  });
  it("Should show message error to required fields", () => {
    cy.dataTest("newTransaction").click();
    cy.dataTest("button-finish").click();
    cy.get(".ant-form-item-explain-error").should("have.length", 5);
  });
  it("Should create a new transaction with a new category", () => {
    cy.dataTest("newTransaction").click();
    cy.dataTest("input-description").type("Teste");
    cy.get("#basic_date").click();
    cy.get(".ant-picker-today-btn").click();
    cy.dataTest("payment-methodId").click();
    cy.dataTest("option-1").click();
    cy.dataTest("category").click();
    cy.dataTest("option-0").click();
    cy.dataTest("input-categoryDescription").type("Teste");
    cy.dataTest("input-value").type("100");
    cy.dataTest("button-finish").click();
    cy.get(".ant-message-notice-content").should("contain", "Transação adicionada com sucesso!");
  });
  it("Should create a transaction that already has a category", () => {
    cy.dataTest("newTransaction").click();
    cy.dataTest("input-description").type("Testando Saída com categoria");
    cy.get("#basic_date").click();
    cy.get(".ant-picker-today-btn").click();
    cy.dataTest("payment-methodId").click();
    cy.dataTest("option-1").click();
    cy.dataTest("category").click();
    cy.dataTest("categoryOption-1").click();
    cy.dataTest("input-value").type("100");
    cy.dataTest("button-finish").click();
    cy.get(".ant-message-notice-content").should("contain", "Transação adicionada com sucesso!");
  });
  it("Should edit a transaction", () => {
    cy.dataTest("button-editTransaction-0").click();
    cy.dataTest("input-editDescription").clear().type("Teste Editado");
    cy.dataTest("button-editSubmit").click();
    cy.get(".ant-message-notice-content").should("contain", "Transação atualizada com sucesso!");
  });
  it("Should delete a transaction", () => {
    cy.dataTest("button-editTransaction-0").click();
    cy.dataTest("button-deleteTransaction").click();
    cy.get(".ant-message-notice-content").should("contain", "Transação deletada com sucesso!");
  });
  it("Should create a transaction with a card", () => {
    const random = Math.floor(Math.random() * 1000);
    describe("Create a new card", () => {
      cy.dataTest("cards").click();
      cy.dataTest("button-newCard").click();
      cy.dataTest("flag-id").click();
      cy.dataTest("card-mastercard").click();
      cy.dataTest("card-description").type(`Cartão de teste ${random}`);
      cy.dataTest("card-expiration").click();
      cy.dataTest("card-expiration-day-7").click();
      cy.dataTest("card-closure").click();
      cy.dataTest("card-closure-day-31").click();
      cy.dataTest("button-finish").click();
      cy.get(".ant-message-notice-content").should("contain", "Cartão cadastrado com sucesso!");
    });
    describe("Create a transaction with a card", () => {
      cy.dataTest("outputTrasaction").click();
      cy.dataTest("newTransaction").click();
      cy.dataTest("input-description").type(`Teste com cartão ${random}`);
      cy.get("#basic_date").click();
      cy.get(".ant-picker-today-btn").click();
      cy.dataTest("payment-methodId").click();
      cy.dataTest("option-4").click();
      cy.dataTest("card-id").click();
      cy.dataTest("card-0").click();
      cy.dataTest("installments").click();
      cy.dataTest("installments-1").click();
      cy.dataTest("category").click();
      cy.dataTest("categoryOption-1").click();
      cy.dataTest("input-value").type("100");
      cy.dataTest("button-finish").click();
      cy.get(".ant-message-notice-content").should("contain", "Transação adicionada com sucesso!");
    });
  });
});
