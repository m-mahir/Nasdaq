import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
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
  beforeEach(() => {
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

  it("should render the stocks data - handle item pressed - show no data message in case of empty response", async () => {
    const { getByTestId, getAllByTestId } = render(<MockExplore />);

    getByTestId("loader");

    await waitFor(() => {
      const items = getAllByTestId("item");
      expect(items.length).toBe(10);
      const tickers = getAllByTestId("ticker");
      const names = getAllByTestId("name");
      expect(tickers[0].props.children).toEqual("AAPL");
      expect(names[0].props.children).toEqual("Apple Inc.");

      //Navigation
      fireEvent(items[0], "press");
      expect(navigation.navigate).toBeCalledWith("StockDetails", {
        ticker: "AAPL",
      });
    });

    /* Change the search here will reload the component and call the get request again.
       The mocked axios get function is meant to return an empty array of results on the second call
       to be used to test the 'no result found' case.
    */
    const searchInput = getByTestId("search");
    fireEvent.changeText(searchInput, "a");

    await waitFor(() => {
      getByTestId("no-data");
      expect(searchInput).toBeTruthy();
    });
  });
});
