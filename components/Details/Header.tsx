import { StyleSheet, View } from "react-native";
import { theme } from "../../contants";
import { useAppState } from "../../overmind";
import { Stock } from "../../overmind/state";
import { ThemeText } from "../ThemeText";

interface Props {
  stock: Stock;
}

export function Header({ stock }: Props) {
  const loadingDetails = useAppState().isLoading;

  return (
    <View style={styles.container}>
      <ThemeText style={styles.ticker}>{stock.ticker}</ThemeText>
      <ThemeText style={styles.name}>{stock.name}</ThemeText>
      <ThemeText style={styles.price}>{stock.aggregates?.close}</ThemeText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryLight,
    padding: 10,
    borderRadius: 15
  },
  ticker: {
    fontSize: 30,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 40,
  },
});
