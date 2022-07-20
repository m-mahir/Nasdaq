import { Context } from "./";

interface Payload {
  search?: string;
  isLoadMore?: boolean;
}

export const loadStocks = async (context: Context, payload: Payload = {}) => {
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
