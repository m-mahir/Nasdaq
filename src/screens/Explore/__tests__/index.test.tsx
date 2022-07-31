import React from "react";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react-native";
import Explore from "..";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "../../../overmind";

const overmind = createOvermind(config);
let MockExplore: React.FC;

describe("Explore Screen", () => {
  beforeAll(() => {
    jest.mock("../__mocks__/axios");

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

    afterEach(cleanup);
  });

  it("should render loader on the screen when the explore screen launches", () => {
    const { getByTestId } = render(<MockExplore />);

    const loader = getByTestId("loader");
    expect(loader).toBeDefined();
  });

  it("should renders the stocks data", () => {
    const { findByTestId, debug } = render(<MockExplore />);
    const item = findByTestId("item");
    expect(item).toBeDefined();
  });
});
