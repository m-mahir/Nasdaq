import { API_KEY, BASE_URL } from "../../src/config";

describe("E2E", () => {
  it("displays stock list", () => {
    cy.intercept(
      `${BASE_URL}/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=${API_KEY}`
    ).as("stocks");
    cy.visit("/");
    cy.wait("@stocks")
      .its("response.body.results")
      .should("be.an", "Array")
      .and("have.length", 10)
      .then((stocks) => {
        cy.get("[data-testId=item]").should("have.length", stocks.length);
      });
  });

  it("shows loading indicator", () => {
    // slow down the response by 1 second
    // https://on.cypress.io/intercept
    cy.intercept(
      `${BASE_URL}/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=${API_KEY}`,
      (req) => {
        // use bundled Bluebird library
        // which has utility method .delay
        // https://on.cypress.io/promise
        return Cypress.Promise.delay(1000).then(() => req.continue());
      }
    ).as("stocks");
    cy.visit("/");
    cy.get("[data-testid=loader]").should("be.visible");
    cy.get("[data-testid=loader]").should("not.exist");
    cy.wait("@stocks");
  });
});
