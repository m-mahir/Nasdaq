import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import Search from "../Search";
import Chance from "chance";
import StockListItem from "../StockListItem";
import List from "../List";

const ticker = "AAPL";
const name = "Apple Inc.";

const mockedUsedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedUsedNavigate,
    }),
  };
});

describe("Explore - Unit Tests", () => {
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
    const { getByTestId } = render(
      <StockListItem stock={{ ticker, name }} onItemClicked={() => {}} />
    );
    expect(getByTestId("name").props.children).toEqual(name);
    expect(getByTestId("ticker").props.children).toEqual(ticker);
  });
});

describe("Explore - Integration Tests", () => {
  afterEach(cleanup);

  it("renders list correctly", () => {
    const { getByTestId, getAllByTestId } = render(
      <List
        dataList={[{ ticker, name }]}
        bottomScrollHandler={() => {}}
        loading={false}
      />
    );
    const items = getAllByTestId("item");
    expect(items.length).toBe(1);
    expect(getByTestId("name").props.children).toEqual(name);
    expect(getByTestId("ticker").props.children).toEqual(ticker);

    //Navigation
    fireEvent(items[0], "press");
    expect(mockedUsedNavigate).toBeCalledWith("StockDetails", {
      ticker: "AAPL",
    });
  });
});
