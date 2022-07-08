import { Context } from "./";

export const loadStocks = async (context: Context, value: string) => {
  context.state.isLoading = true;
  context.state.stocks = await context.effects.jsonPlacholder.getStocks();
  context.state.isLoading = false;
};
