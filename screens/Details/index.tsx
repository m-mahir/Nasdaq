import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Header } from "./Header";
import { Statistics } from "./Statistics";

import { View } from "../../components/Themed";
import { theme } from "../../constants";
import { useActions, useAppState } from "../../overmind";
import { RootStackScreenProps } from "../../types";
import About from "./About";

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
      <ScrollView>
        <Statistics aggregates={aggregates} />
        <About stock={stock} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
  },
});
