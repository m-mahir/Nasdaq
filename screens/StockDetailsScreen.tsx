import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { useActions, useAppState } from "../overmind";
import { RootStackScreenProps } from "../types";

export default function StockDetailsScreen({
  route,
}: RootStackScreenProps<"StockDetails">) {
  const loadingDetails = useAppState().isLoading;
  const loadingAggs = useAppState().isLoadingAggs;
  const stock = useAppState().currentStock;
  const loadDetails = useActions().loadStockDetails;
  const loadAggs = useActions().loadStockAggs;

  useEffect(() => {
    loadDetails(route.params.ticker);
    loadAggs(route.params.ticker);
  }, [route.params.ticker]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.ticker}</Text>
      <Text style={styles.title}>{stock?.description}</Text>
      <Text style={styles.title}>{stock?.industry}</Text>
      <Text style={styles.title}>{stock?.aggregates?.close}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
