import { Context } from "./";

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
    const stockDetails = await context.effects.jsonPlacholder.getStockDetails(
      ticker
    );

    if (stockDetails)
      context.state.currentStock = {
        ...stockDetails,
        aggregates: context.state.currentStock.aggregates,
      };
  } catch (err) {
    console.log(err);
  }

  context.state.isLoading = false;
};

export const loadStockAggs = async (context: Context, ticker: string) => {
  context.state.isLoadingAggs = true;
  try {
    const stockAggs = await context.effects.jsonPlacholder.getStockAggs(ticker);

    if (stockAggs)
      context.state.currentStock = {
        ...context.state.currentStock,
        aggregates: stockAggs,
      };
  } catch (err) {
    console.log(err);
  }

  context.state.isLoadingAggs = false;
};
