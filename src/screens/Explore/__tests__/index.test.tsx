import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import Explore from "..";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "../../../overmind";

const overmind = createOvermind(config);
let MockExplore: React.FC;
const navigation = {
  navigate: jest.fn(),
};

describe("Explore Screen", () => {
  beforeAll(() => {
    jest.mock("../__mocks__/axios");

    const createTestProps = (props: Object) => ({
      navigation,
      ...props,
    });

    MockExplore = () => {
      let props: any;
      props = createTestProps({});
      return (
        <Provider value={overmind}>
          <Explore
            navigation={props.navigation}
            route={{ key: "", name: "Root", path: "" }}
          />
        </Provider>
      );
    };

    afterEach(cleanup);
  });

  it("should render loader on the screen when the explore screen launches", () => {
    const { getByTestId } = render(<MockExplore />);

    const loader = getByTestId("loader");
    expect(loader).toBeTruthy();
  });

  it("should render the stocks data and navigate on press or no data message if the response data is empty", async () => {
    const { findByTestId, findAllByTestId } = render(<MockExplore />);
    const noDataScreen = findByTestId("no-data");
    const searchInput = await findByTestId("search");
    expect(noDataScreen).toBeTruthy();
    expect(searchInput).toBeTruthy();

    /* Change the search here will reload the component and call the get request again.
       The mocked axios get function is meant to return an empty array of results on the second call
       to be used to test the 'no result found' case.
    */
    fireEvent.changeText(searchInput, "a");
    let items = await findAllByTestId("item");
    expect(items.length).toBe(10);
    const tickers = await findAllByTestId("ticker");
    const names = await findAllByTestId("name");
    expect(tickers[0].props.children).toEqual("AAPL");
    expect(names[0].props.children).toEqual("Apple Inc.");
    expect(searchInput).toBeTruthy();

    //Navigation
    fireEvent(items[0], "press");
    expect(navigation.navigate).toBeCalledWith("StockDetails", {
      ticker: "AAPL",
    });
  });
});
