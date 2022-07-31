import React from "react";
import { render } from "@testing-library/react-native";
import Explore from "../index";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "../../../overmind";

const overmind = createOvermind(config);

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

it("should render Explore page when app launches", () => {
  let props: any;
  props = createTestProps({});

  const { getByTestId } = render(
    <Provider value={overmind}>
      <Explore
        navigation={props.navigation}
        route={{ key: "", name: "Root", path: "" }}
      />
    </Provider>
  );

  const loader = getByTestId("loader");
});
