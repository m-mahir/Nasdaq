import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import StockDetailsScreen from "..";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "../../../overmind";

const overmind = createOvermind(config);
let MockDetails: React.FC;
const navigation = {
  navigate: jest.fn(),
};

describe("Details Screen", () => {
  beforeAll(() => {
    jest.mock("../__mocks__/axios");

    const createTestProps = (props: Object) => ({
      navigation,
      ...props,
    });

    MockDetails = () => {
      let props: any;
      props = createTestProps({});
      return (
        <Provider value={overmind}>
          <StockDetailsScreen
            navigation={props.navigation}
            route={{
              key: "",
              name: "StockDetails",
              path: "",
              params: { ticker: "AAPL" },
            }}
          />
        </Provider>
      );
    };

    afterEach(cleanup);
  });

  it("should show error modal when request fails", () => {
    const { findByTestId } = render(<MockDetails />);

    //The mock axios is configured to return a reject response
    const errorModal = findByTestId("error-modal");
    expect(errorModal).toBeTruthy();
  });
});
