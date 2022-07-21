export type Stock = {
  ticker?: string;
  name?: string;
  logo?: string;
  aggregates?: Aggregates;
  companyWebsiteURL?: string;
  industry?: string;
  description?: string;
};

export type Aggregates = {
  open?: number;
  close?: number;
  high?: number;
  low?: number;
  volume?: number;
}

export type State = {
  isLoading: boolean;
  isLoadingAggs: boolean;
  stocks: Stock[];
  currentStock: Stock;
};

export const state: State = {
  isLoading: false,
  isLoadingAggs: false,
  stocks: [],
  currentStock: {}
};
