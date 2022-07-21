import { StyleSheet, Text, View } from "react-native";
import { useAppState } from "../../overmind";
import { Stock } from "../../overmind/state";

interface Props {
  stock: Stock;
}

export function About({ stock }: Props) {
  const loadingDetails = useAppState().isLoading;

  return (
    <View style={styles.container}>
      <Text>{stock?.description}</Text>
      <Text>{stock?.industry}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
