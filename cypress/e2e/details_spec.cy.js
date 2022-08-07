import { API_KEY, BASE_URL } from "../../src/config";

const ticker = "AAPL";

const url = `${BASE_URL}/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=${API_KEY}`;
const detailsUrl = `${BASE_URL}/v3/reference/tickers/${ticker}?apiKey=${API_KEY}`;

describe("E2E", () => {
  it("shows loading indicators", () => {
    cy.intercept(detailsUrl, {
      fixture: "details.json",
    });
    cy.visit("/details?ticker=AAPL");
    cy.get("[data-testid=loader]").should("have.length", 2);
    cy.get("[data-testid=loader]").should("not.exist");
  });

  it("displays details correctly", () => {
    //Commented parts will work if only the part handling the weeked request is activated.
    cy.intercept(detailsUrl, {
      fixture: "details.json",
    });
    // cy.intercept(
    //   `${BASE_URL}/v2/aggs/ticker/${ticker}/range/1/day/2022-08-06/2022-08-06?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`,
    //   {
    //     fixture: "aggregates.json",
    //   }
    // );

    cy.visit(`/details?ticker=${ticker}`);
    // cy.get("[data-testid=price]").should("contain", "$165.35");
    cy.contains("Statistics");
    cy.contains("About");
    // cy.contains("56.7M");
  });

  it("opens web browser", () => {
    cy.intercept(url, { fixture: "stocks.json" });
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

  it("caches the stock details", () => {
    cy.intercept(url, { fixture: "stocks.json" });
    cy.visit("/");
    cy.contains(ticker).click();
    cy.go("back");
    cy.contains(ticker).click();
    cy.get("[data-testid=loader]").should("not.exist");
  });

  it("shows/hides error modal", () => {
    cy.intercept(url).as("stocks");
    cy.visit("/");
    cy.visit("/");
    cy.visit("/");
    cy.visit("/");
    cy.visit("/");
    cy.wait("@stocks").then((_) => {
      cy.get("[data-testid=error-modal]").should("be.visible");
      cy.get("[data-testid=try-again]").click();
      cy.get("[data-testid=loader]").should("be.visible");
      cy.get("[data-testid=error-modal]").should("not.exist");
    });
  });
});
