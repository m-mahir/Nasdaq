import { Stock } from "./state";

const API_KEY = "&apiKey=pTf0LEXOW3sGRJbeQGDM44tUl9tsJpVN";

let url =
  "https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10" +
  API_KEY;

export const jsonPlacholder = {
  getStocks: async (): Promise<Stock[]> => {
    try {
      if (url) {
        const response = await fetch(url);
        let jsonResponse = await response.json();
        url = jsonResponse.next_url + API_KEY;
        return jsonResponse.results;
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  },
};
