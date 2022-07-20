import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function StockDetailsScreen({
  route,
}: RootStackScreenProps<"StockDetails">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.ticker}</Text>
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
