import { Image, StyleSheet, View } from "react-native";
import { Loader } from "../../../components/Loader";
import { ThemeText } from "../../../components/ThemeText";
import { API_KEY } from "../../../config";
import { theme } from "../../../constants";
import { useAppState } from "../../../overmind";
import { Stock } from "../../../overmind/state";

interface Props {
  stock: Stock;
}

export function Header({ stock }: Props) {
  const loadingDetails = useAppState().isLoading;
  console.log(stock.logo);

  return (
    <View style={styles.container}>
      {loadingDetails ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <View>
          {stock.logo ? (
            <Image
              style={styles.logo}
              source={{
                uri: stock.logo + "?" + API_KEY,
              }}
            />
          ) : (
            <ThemeText style={[styles.logo, styles.initials]}>
              {stock.name.substring(0, 2)}
            </ThemeText>
          )}

          <ThemeText style={styles.ticker}>{stock.ticker}</ThemeText>
          <ThemeText style={styles.name}>{stock.name}</ThemeText>
          <ThemeText style={styles.price}>{stock.aggregates?.close}</ThemeText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    minHeight: 200,
  },
  loader: { flex: 1, justifyContent: "center" },
  ticker: {
    fontSize: 30,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 40,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
  },
  initials: {
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
});
