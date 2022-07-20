import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemeText } from "../ThemeText";
import { View } from "../Themed";
import { theme } from "../../contants";

interface Props {
  stock: {
    ticker: string;
    name: string;
  };
  onItemClicked: () => void
}

export default function StockListItem({ stock, onItemClicked }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onItemClicked}>
      <ThemeText style={styles.title}>{stock.ticker}</ThemeText>
      <ThemeText>{stock.name}</ThemeText>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 25,
    paddingTop: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginTop: 22,
    height: 1,
  },
});
