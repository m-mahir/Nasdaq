import { StyleSheet, Text, View } from "react-native";
import { useAppState } from "../../overmind";
import { Stock } from "../../overmind/state";

interface Props {
  stock: Stock;
}

export function Header({ stock }: Props) {
  const loadingDetails = useAppState().isLoading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{stock.ticker}</Text>
      <Text>{stock.aggregates?.close}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
