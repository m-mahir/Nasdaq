import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../contants";
import { useAppState } from "../../overmind";
import { Aggregates } from "../../overmind/state";
import { ThemeText } from "../ThemeText";
import Price from "./Price";

interface Props {
  aggregates?: Aggregates;
}

export function Statistics({ aggregates }: Props) {
  const loadingAggs = useAppState().isLoadingAggs;

  return (
    <View style={styles.container}>
      <ThemeText style={styles.title}>{"Statistics"}</ThemeText>
      <View style={styles.pricesContainer}>
        <Price title={"Open"}>{aggregates?.open}</Price>
        <Price title={"Close"}>{aggregates?.close}</Price>
        <Price title={"High"}>{aggregates?.high}</Price>
        <Price title={"Low"}>{aggregates?.low}</Price>
        <Price title={"Volume"}>{aggregates?.volume}</Price>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryDark,
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  pricesContainer: {
    flexDirection: "row",
    marginVertical: 5,
    flexWrap: 'wrap'
  },
});
