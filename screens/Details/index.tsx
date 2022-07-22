import { useEffect } from "react";
import { ScrollView } from "react-native";
import { Header } from "./Header";
import { Statistics } from "./Statistics";

import { theme } from "../../constants";
import { useActions, useAppState } from "../../overmind";
import { RootStackScreenProps } from "../../types";
import About from "./About";
import styled from "styled-components/native";

const StyledView = styled.View`
  flex: 1;
  background-color: ${theme.colors.primaryLight};
`;

export default function StockDetailsScreen({
  route,
}: RootStackScreenProps<"StockDetails">) {
  const ticker = route.params.ticker;

  const stock = useAppState().currentStock;
  const loadDetails = useActions().loadStockDetails;
  const loadAggs = useActions().loadStockAggs;

  const aggregates = stock?.aggregates;

  useEffect(() => {
    if (ticker !== stock.ticker) {
      loadDetails(ticker);
      loadAggs(ticker);
    }
  }, [ticker]);

  return (
    <StyledView>
      <Header stock={stock} />
      <ScrollView>
        <Statistics aggregates={aggregates} />
        <About stock={stock} />
      </ScrollView>
    </StyledView>
  );
}
