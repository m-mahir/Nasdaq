import { API_KEY, BASE_URL } from "../../src/config";

const url = `${BASE_URL}/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=${API_KEY}`;

describe("E2E", () => {
  // it("displays stock list", () => {
  //   cy.intercept(
  //     url
  //   ).as("stocks");
  //   cy.visit("/");
  //   cy.wait("@stocks")
  //     .its("response.body.results")
  //     .should("be.an", "Array")
  //     .and("have.length", 10)
  //     .then((stocks) => {
  //       cy.get("[data-testId=item]").should("have.length", stocks.length);
  //     });
  // });

  // it("shows loading indicator", () => {
  //   // slow down the response by 1 second
  //   // https://on.cypress.io/intercept
  //   cy.intercept(
  //     url,
  //     (req) => {
  //       // use bundled Bluebird library
  //       // which has utility method .delay
  //       // https://on.cypress.io/promise
  //       return Cypress.Promise.delay(1000).then(() => req.continue());
  //     }
  //   ).as("stocks");
  //   cy.visit("/");
  //   cy.get("[data-testid=loader]").should("be.visible");
  //   cy.get("[data-testid=loader]").should("not.exist");
  //   cy.wait("@stocks");
  // });

  it("shows mock data", () => {
    cy.intercept(url, { fixture: "stocks.json" }).as("stocks");
    cy.visit("/");
    cy.get("[data-testId=item]").should("have.length", 5);
  });

  it("shows loading indicator (mock)", () => {
    cy.intercept(url, {
      fixture: "stocks.json",
      delay: 1000,
    }).as("stocks");
    cy.visit("/");
    cy.get("[data-testid=loader]").should("be.visible");
    cy.get("[data-testid=loader]").should("not.exist");
    cy.get("[data-testid=item]").should("have.length", 5);
  });

  it("handles network error", () => {
    cy.intercept(url, { forceNetworkError: true });
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.spy(win.console, "error").as("logError");
      },
    });
    cy.get("@logError").should("have.been.called");
    // confirm the loading indicator goes away
    cy.get("[data-testid=loader]").should("not.exist");
  });

  it("handles search data", () => {
    const ticker = "AAPL";
    cy.intercept(url, { fixture: "stocks.json" }).as("stocks");
    cy.visit("/");
    cy.get("[data-testid=item]").should("have.length", 5);
    cy.get("[data-testid=search]").type(ticker);
    cy.get("[data-testId=item]")
      .should("have.length", 1)
      .should("contain", ticker);
  });

  it.only("navigate to details", () => {
    const ticker = "AAPL";
    cy.intercept(url, { fixture: "stocks.json" }).as("stocks");
    cy.visit("/");
    cy.title().should("equal", "Explore");
    cy.contains(ticker).click();
    cy.title().should("equal", "Stock Details");
    cy.get("[data-testId=details-ticker]").should("contain", ticker);
  });
});
