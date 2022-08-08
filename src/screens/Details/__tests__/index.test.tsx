import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import { numFormatter } from "../../../helper";
import * as Statistics from "../Statistics/Section";
import * as About from "../About/Section";
import { Chance } from "chance";
import Logo from "../Header/Logo";
import { API_KEY } from "../../../config";

describe("Explore Screen", () => {
  afterEach(cleanup);

  it("renders logo image correctly", () => {
    let iconUrl = `https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-05-01_icon.png?apiKey=${API_KEY}`;
    const { getByTestId } = render(<Logo url={iconUrl} name="Apple Inc." />);
    expect(getByTestId("logo-image")).toBeTruthy();
    expect(() => getByTestId("logo-text")).toThrow(
      "Unable to find an element with testID: logo-text"
    );
  });

  it("renders logo text correctly", () => {
    const { getByTestId } = render(<Logo url="" name="Apple Inc." />);
    expect(getByTestId("logo-text")).toBeTruthy();
    expect(() => getByTestId("logo-image")).toThrow(
      "Unable to find an element with testID: logo-image"
    );
  });

  it("renders statistics data correctly", () => {
    const chance = new Chance();
    const title = chance.string({ length: 4 });
    let price = chance.floating({ fixed: 2 });
    let priceText = "$" + price;
    const { getByTestId } = render(
      <Statistics.Section title={title}>{priceText}</Statistics.Section>
    );
    expect(getByTestId("statistics-title").props.children).toEqual(title);
    expect(getByTestId("statistics-price").props.children).toEqual(priceText);
  });

  it("fomats the price correctly", () => {
    let price = numFormatter(6652654235465);
    expect(price).toEqual("6652.7B");
    price = numFormatter(4000000);
    expect(price).toEqual("4.0M");
    price = numFormatter(5632);
    expect(price).toEqual("5.6K");
    price = numFormatter(197);
    expect(price).toEqual("197");
  });

  it("renders about data correctly", () => {
    const chance = new Chance();
    const title = chance.string({ length: 4 });
    const desc = chance.string({ length: 60 });
    const { getByTestId } = render(
      <About.Section title={title}>{desc}</About.Section>
    );
    expect(getByTestId("about-title").props.children).toEqual(title);
    expect(getByTestId("about-desc").props.children).toEqual(desc);
  });
});
