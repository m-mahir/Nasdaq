import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import Search from "../Search";
import Chance from "chance";
import StockListItem from "../StockListItem";

describe("Explore Screen", () => {
  afterEach(cleanup);

  it("handles search field correctly", () => {
    const chance = new Chance();
    const searchVal = chance.string({ length: 5 });
    const { getByTestId } = render(
      <Search placeholder="Search..." onChange={() => {}} value={searchVal} />
    );
    expect(getByTestId("search").props.value).toBe(searchVal);
  });

  it("displays stock item correctly", () => {
    const ticker = "AAPL";
    const name = "Apple Inc.";
    const { getByTestId } = render(
      <StockListItem stock={{ ticker, name }} onItemClicked={() => {}} />
    );
    expect(getByTestId("name").props.children).toEqual(name);
    expect(getByTestId("ticker").props.children).toEqual(ticker);
  });
});
