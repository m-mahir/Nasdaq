import { StyleSheet } from "react-native";
import { ThemeText } from "../ThemeText";
import { Text, View } from "../Themed";
import { theme } from "../../contants";

interface Props {
  stock: {
    ticker: string;
    name: string;
  };
}

export default function StockListItem({ stock }: Props) {
  return (
    <View style={styles.container}>
      <ThemeText style={styles.title}>{stock.ticker}</ThemeText>
      <ThemeText>{stock.name}</ThemeText>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 25,
    height: 1,
  },
});
