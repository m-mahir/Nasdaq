import { Context } from "./";

export const loadStocks = async (context: Context) => {
  context.state.isLoading = true;
  const newStocks = await context.effects.jsonPlacholder.getStocks();
  context.state.stocks = [...context.state.stocks, ...newStocks];
  context.state.isLoading = false;
};
