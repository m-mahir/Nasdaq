import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { About } from "../components/Details/About";
import { Header } from "../components/Details/Header";
import { Statistics } from "../components/Details/Statistics";

import { View } from "../components/Themed";
import { useActions, useAppState } from "../overmind";
import { RootStackScreenProps } from "../types";

export default function StockDetailsScreen({
  route,
}: RootStackScreenProps<"StockDetails">) {
  const ticker = route.params.ticker;

  const stock = useAppState().currentStock;
  const loadDetails = useActions().loadStockDetails;
  const loadAggs = useActions().loadStockAggs;

  const aggregates = stock?.aggregates;

  useEffect(() => {
    loadDetails(ticker);
    loadAggs(ticker);
  }, [ticker]);

  return (
    <View style={styles.container}>
      <Header stock={stock} />
      <Statistics aggregates={aggregates} />
      <About stock={stock} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
