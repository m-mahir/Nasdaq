import { API_KEY, BASE_URL } from "../../src/config";

const ticker = "AAPL";
const name = "Apple Inc.";

const url = `${BASE_URL}/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=${API_KEY}`;

const stocksCount = 10;

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

  it("shows loading indicator (mock)", () => {
    cy.intercept(url, {
      fixture: "stocks.json",
      delay: 1000,
    });
    cy.visit("/");
    cy.get("[data-testid=loader]").should("be.visible");
    cy.get("[data-testid=loader]").should("not.exist");
    cy.get("[data-testid=item]").should("have.length", stocksCount);
  });

  it("shows mock data and concat it load more", () => {
    cy.intercept(url, { fixture: "stocks.json" });
    cy.visit("/");
    cy.get("[data-testId=item]").should("have.length", stocksCount);
    cy.get("[data-testid=list]").scrollTo("bottom");
    cy.get("[data-testId=item]").should("have.length", stocksCount * 2);
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
    cy.intercept(url, { fixture: "stocks.json" });
    cy.visit("/");
    cy.get("[data-testid=item]").should("have.length", stocksCount);
    cy.intercept(
      `${BASE_URL}/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&search=AAPL&apiKey=${API_KEY}`,
      {
        results: [
          {
            ticker: "AAPL",
            name: "Apple Inc.",
          },
        ],
        status: "OK",
      }
    );
    cy.get("[data-testid=search]").type(ticker);
    cy.get("[data-testId=item]")
      .should("have.length", 1)
      .should("contain", ticker);
  });

  it("displays no data found message", () => {
    const notFoundTicker = "ABCXYZ";
    cy.intercept(url, { fixture: "stocks.json" });
    cy.visit("/");
    cy.get("[data-testid=item]").should("have.length", stocksCount);
    cy.intercept(
      `${BASE_URL}/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&search=${notFoundTicker}&apiKey=${API_KEY}`,
      {
        results: [],
        status: "OK",
      }
    );
    cy.get("[data-testid=search]").type(notFoundTicker);
    cy.contains("No Results Found");
  });

  it("navigate to details", () => {
    cy.intercept(url, { fixture: "stocks.json" });
    cy.visit("/");
    cy.title().should("equal", "Explore");
    cy.contains(ticker).click();
    cy.title().should("equal", "Stock Details");
    cy.get("[data-testId=details-ticker]").should("contain", ticker);
    cy.get("[data-testId=stock-name]").should("contain", name);
  });
});
