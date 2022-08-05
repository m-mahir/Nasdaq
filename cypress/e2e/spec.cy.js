describe("E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:19006/");
  });

  it("displays stock list", () => {
    cy.contains("AA").should("be.visible");
    //   cy.get('.todo-list li').should('have.length', 2)

    //   cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    //   cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  });
});
