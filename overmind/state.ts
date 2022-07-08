export type Stock = {
  ticker: string;
  name: string;
};

export type State = {
  isLoading: boolean;
  stocks: Stock[];
};

export const state: State = {
  isLoading: false,
  stocks: [],
};
