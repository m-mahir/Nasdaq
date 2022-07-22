import axios from "axios";
import moment from "moment";
import { API_KEY, BASE_URL } from "../config";
import { Aggregates, Stock } from "./state";

const fetchStocksInitialUrl =
  BASE_URL +
  "/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&" +
  API_KEY;
let fetchStockURL = fetchStocksInitialUrl;

export const jsonPlacholder = {
  getStocks: async (search?: string): Promise<Stock[]> => {
    try {
      if (fetchStockURL) {
        if (
          (fetchStockURL.includes("&search=") && (!search || !search.length)) ||
          (!fetchStockURL.includes("&search=") && search && search.length)
        )
          fetchStockURL = fetchStocksInitialUrl;
        if (search) {
          if (fetchStockURL.includes("&search="))
            fetchStockURL = fetchStockURL.substring(
              0,
              fetchStockURL.indexOf("&search=")
            );
          fetchStockURL += "&search=" + search;
        }
        const response = await axios.get(fetchStockURL);
        let jsonResponse = await response.data;
        if (jsonResponse.next_url) {
          fetchStockURL = jsonResponse.next_url + "&" + API_KEY;
          if (search) fetchStockURL += "&search=" + search;
        }
        return jsonResponse.results;
      }
    } catch (err) {
      console.log(err);
      return [];
    }
    return [];
  },
  getStockDetails: async (ticker: string): Promise<Stock | null> => {
    const url = `${BASE_URL}/v3/reference/tickers/${ticker}?${API_KEY}`;
    try {
      const response = await axios.get(url);
      let jsonResponse = await response.data;

      return {
        name: jsonResponse.results.name,
        ticker: jsonResponse.results.ticker,
        logo: jsonResponse.results.branding?.icon_url,
        companyWebsiteURL: jsonResponse.results.homepage_url,
        industry: jsonResponse.results.sic_description,
        description: jsonResponse.results.description,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getStockAggs: async (ticker: string): Promise<Aggregates | null> => {
    const previousDayDate = new Date(
      new Date().setDate(new Date().getDate() - 1)
    );
    const date = moment(previousDayDate).format("yyyy-MM-DD");
    const url = `${BASE_URL}/v2/aggs/ticker/${ticker}/range/1/day/${date}/${date}?adjusted=true&sort=asc&limit=120&${API_KEY}`;
    try {
      const response = await axios.get(url);
      let jsonResponse = await response.data;

      if (jsonResponse.results && jsonResponse.results.length)
        return {
          open: jsonResponse.results[0].o,
          close: jsonResponse.results[0].c,
          high: jsonResponse.results[0].h,
          low: jsonResponse.results[0].l,
          volume: jsonResponse.results[0].v,
        };
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
