import axios from "axios";
import moment from "moment";
import { Aggregates, Stock } from "./state";

const fetchStocksInitialUrl =
  "/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10";
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
        let jsonResponse = await response?.data;
        if (jsonResponse && jsonResponse.next_url) {
          fetchStockURL = jsonResponse.next_url;
          if (search) fetchStockURL += "&search=" + search;
        }
        if (jsonResponse && jsonResponse.status === "OK")
          return jsonResponse.results;
      }
    } catch (err) {
      console.log(err);
      return [];
    }
    return [];
  },
  getStockDetails: async (ticker: string): Promise<Stock | null> => {
    const url = `/v3/reference/tickers/${ticker}`;
    try {
      const response = await axios.get(url);
      let jsonResponse = await response?.data;

      if (jsonResponse && jsonResponse.status === "OK")
        return {
          name: jsonResponse.results.name,
          ticker: jsonResponse.results.ticker,
          logo: jsonResponse.results.branding?.icon_url,
          companyWebsiteURL: jsonResponse.results.homepage_url,
          industry: jsonResponse.results.sic_description,
          description: jsonResponse.results.description,
        };
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getStockAggs: async (ticker: string): Promise<Aggregates | null> => {
    let dayDiff = 0,
      url,
      jsonResponse;
    try {
      do {
        url = getStockAggsURL(ticker, ++dayDiff);
        jsonResponse = await callGetRequest(url);
      } while (
        jsonResponse &&
        (jsonResponse.status === "DELAYED" ||
          (jsonResponse.status === "OK" && !jsonResponse.results))
      );

      if (
        jsonResponse &&
        jsonResponse.status === "OK" &&
        jsonResponse.results &&
        jsonResponse.results.length
      )
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

const getStockAggsURL = (ticker: string, daysDiff: number): string => {
  const previousDayDate = new Date(
    new Date().setDate(new Date().getDate() - daysDiff)
  );
  const date = moment(previousDayDate).format("yyyy-MM-DD");
  return `/v2/aggs/ticker/${ticker}/range/1/day/${date}/${date}?adjusted=true&sort=asc&limit=120`;
};

const callGetRequest = async (url: string) => {
  const response = await axios.get(url);
  return response?.data;
};
