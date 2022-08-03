import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react-native";
import StockDetailsScreen from "..";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "../../../overmind";
import { fireEvent } from "react-native-testing-library";

const overmind = createOvermind(config);
let MockDetails: React.FC;
const navigation = {
  navigate: jest.fn(),
};

describe("Details Screen", () => {
  beforeEach(() => {
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

  it("should display/hide error modal correctly", async () => {
    const { getByTestId, debug } = render(<MockDetails />);

    //The mock axios is configured to return a reject response
    
    await waitFor(() => getByTestId("error-modal")) //modal is now visible
    // const errorModal = findByTestId("error-modal");
    // expect(errorModal).toBeTruthy();
    // debug();

    // const tryAgainButton = findByTestId("try-again");
    // fireEvent(tryAgainButton, "press");
    // const loader = findByTestId("loader");
    // expect(errorModal).toBeFalsy();
    // expect(loader).toBeTruthy();
  });
});
