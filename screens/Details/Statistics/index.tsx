import { StyleSheet, View } from "react-native";
import { Loader } from "../../../components/Loader";
import { ThemeText } from "../../../components/ThemeText";
import { theme } from "../../../constants";
import { useAppState } from "../../../overmind";
import { Aggregates } from "../../../overmind/state";
import Price from "./price";

interface Props {
  aggregates?: Aggregates;
}

export function Statistics({ aggregates }: Props) {
  const loadingAggs = useAppState().isLoadingAggs;

  return (
    <View style={styles.container}>
      {loadingAggs ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <View>
          <ThemeText style={styles.title}>Statistics</ThemeText>
          <View style={styles.pricesContainer}>
            <Price title={"Open"}>{aggregates?.open}</Price>
            <Price title={"Close"}>{aggregates?.close}</Price>
            <Price title={"High"}>{aggregates?.high}</Price>
            <Price title={"Low"}>{aggregates?.low}</Price>
            <Price title={"Volume"}>{aggregates?.volume}</Price>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    minHeight: 200,
  },
  loader: { flex: 1, justifyContent: "center" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  pricesContainer: {
    flexDirection: "row",
    marginVertical: 5,
    flexWrap: "wrap",
  },
});
