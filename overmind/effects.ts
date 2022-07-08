import { Stock } from "./state";

export const jsonPlacholder = {
  getStocks: async (): Promise<Stock[]> => {
    let url =
      "https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=pTf0LEXOW3sGRJbeQGDM44tUl9tsJpVN";
    const response = await fetch(url);
    let jsonResponse = await response.json();
    return jsonResponse.results;
  },
};
