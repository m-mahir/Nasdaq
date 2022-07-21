import { StyleSheet, Text, View } from "react-native";
import { useAppState } from "../../overmind";
import { Aggregates } from "../../overmind/state";

interface Props {
  aggregates?: Aggregates;
}

export function Statistics({ aggregates }: Props) {
  const loadingAggs = useAppState().isLoadingAggs;

  return (
    <View style={styles.container}>
      <Text>{aggregates?.open}</Text>
      <Text>{aggregates?.close}</Text>
      <Text>{aggregates?.high}</Text>
      <Text>{aggregates?.low}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
