import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react-native";
import Explore from "../index";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "../../../overmind";

const overmind = createOvermind(config);
let MockExplore: React.FC;

describe("Explore Screen", () => {
  beforeAll(() => {
    jest.mock("../../../__mocks__/axios");

    const createTestProps = (props: Object) => ({
      navigation: {
        navigate: jest.fn(),
      },
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
  });

  it("should render loader on the screen when the explore screen launches", () => {
    const { getByTestId } = render(<MockExplore />);

    const loader = getByTestId("loader");
    expect(loader).toBeDefined();
  });

  it("should renders the stocks data", async () => {
    const { getByTestId, debug } = render(<MockExplore />);
    await waitFor(() => {
      const item = getByTestId("item");
      expect(item).toBeDefined();
    });
  });
});
