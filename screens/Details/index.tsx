import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Header } from "./Header";
import { Statistics } from "./Statistics";

import { theme } from "../../constants";
import { useActions, useAppState } from "../../overmind";
import { RootStackScreenProps } from "../../types";
import About from "./About";
import styled from "styled-components/native";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const StyledView = styled.View`
  flex: 1;
  background-color: ${theme.colors.primaryLight};
`;

function StockDetailsScreen({ route }: RootStackScreenProps<"StockDetails">) {
  const ticker = route.params.ticker;

  let currentStock = useAppState().currentStock;
  const [stock, setStock] = useState(currentStock);
  const stockHistory = useAppState().stockDetailsHistory;
  const loadDetails = useActions().loadStockDetails;
  const loadAggs = useActions().loadStockAggs;

  const aggregates = stock?.aggregates;

  useEffect(() => {
    setStock(currentStock);
  }, [currentStock]);

  useEffect(() => {
    if (ticker !== stock.ticker) {
      let historyStock = stockHistory.find((s) => s.ticker === ticker);
      if (historyStock) {
        setStock(historyStock);
      } else {
        loadDetails(ticker);
        loadAggs(ticker);
      }
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

export default withErrorHandler(StockDetailsScreen);
