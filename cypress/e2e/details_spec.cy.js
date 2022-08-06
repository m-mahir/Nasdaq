import { API_KEY, BASE_URL } from "../../src/config";

const ticker = "AAPL";

const url = `${BASE_URL}/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=${API_KEY}`;

describe("E2E", () => {
  it("shows loading indicators", () => {
    cy.intercept(url, {
      fixture: "stocks.json",
    }).as("stocks");
    cy.visit("/");
    cy.contains(ticker).click();
    cy.get("[data-testid=loader]").should("have.length", 2);
    cy.get("[data-testid=loader]").should("not.exist");
  });

  it("opens web browser", () => {
    cy.intercept(url, { fixture: "stocks.json" }).as("stocks");
    cy.visit("/").then((win) => {
      cy.stub(win, "open").as("open");
    });
    cy.contains(ticker).click();
    cy.contains("Visit Website").click();
    cy.get("@open").should(
      "have.been.calledOnceWith",
      "https://www.apple.com/",
      "_blank"
    );
  });
});
