import { json } from "overmind";
import { Stock } from "./state";

const API_KEY = "&apiKey=pTf0LEXOW3sGRJbeQGDM44tUl9tsJpVN";
const initialUrl =
  "https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10" +
  API_KEY;

let url = initialUrl;

export const jsonPlacholder = {
  getStocks: async (search?: string): Promise<Stock[]> => {
    try {
      if (url) {
        if (
          (url.includes("&search=") && !search) ||
          (!url.includes("&search=") && search)
        )
          url = initialUrl;
        if (search) {
          if (url.includes("&search="))
            url = url.substring(0, url.indexOf("&search="));
          url += "&search=" + search;
        }
        const response = await fetch(url);
        let jsonResponse = await response.json();
        if (jsonResponse.next_url) {
          url = jsonResponse.next_url + API_KEY;
          if (search) url += "&search=" + search;
        }
        return jsonResponse.results;
      }
    } catch (err) {
      console.log(err);
      return [];
    }
    return [];
  },
};
