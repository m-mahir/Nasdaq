import { Context } from ".";
import { Stock } from "./state";

interface loadStocksPayload {
  search?: string;
  isLoadMore?: boolean;
}

export const loadStocks = async (
  context: Context,
  payload: loadStocksPayload = {}
) => {
  context.state.isLoading = true;
  try {
    const newStocks = await context.effects.jsonPlacholder.getStocks(
      payload.search
    );
    if (payload.isLoadMore)
      context.state.stocks = [...context.state.stocks, ...newStocks];
    else context.state.stocks = newStocks;
  } catch (err) {
    console.log(err);
  }

  context.state.isLoading = false;
};

export const loadStockDetails = async (context: Context, ticker: string) => {
  context.state.isLoading = true;
  try {
    let newStock;
    const stockDetails = await context.effects.jsonPlacholder.getStockDetails(
      ticker
    );

    if (stockDetails) {
      newStock = {
        ...stockDetails,
        aggregates: context.state.currentStock.aggregates,
      };
      context.state.currentStock = newStock;
      addToHistory(context, newStock);
    }
  } catch (err) {
    console.log(err);
  }

  context.state.isLoading = false;
};

export const loadStockAggs = async (context: Context, ticker: string) => {
  context.state.isLoadingAggs = true;
  try {
    let newStock;
    const stockAggs = await context.effects.jsonPlacholder.getStockAggs(ticker);

    if (stockAggs) {
      newStock = {
        ...context.state.currentStock,
        aggregates: stockAggs,
      };
      context.state.currentStock = newStock;
      addToHistory(context, newStock);
    }
  } catch (err) {
    console.log(err);
  }

  context.state.isLoadingAggs = false;
};

const addToHistory = (context: Context, stock: Stock) => {
  let stockIndex = context.state.stockDetailsHistory.findIndex(
    (s) => s.ticker === stock.ticker
  );
  if (stockIndex != -1) context.state.stockDetailsHistory[stockIndex] = stock;
  else context.state.stockDetailsHistory.push(stock);
};
