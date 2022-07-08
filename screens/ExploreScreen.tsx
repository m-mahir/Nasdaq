import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Button, FlatList, ListRenderItem, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { useActions, useAppState } from "../overmind";
import { Stock } from "../overmind/state";
import { RootStackParamList } from "../types";

export default function ExploreScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Root", "Modal">) {
  const loading = useAppState().isLoading;
  const data = useAppState().stocks;
  const loadData = useActions().loadStocks;

  useEffect(() => {
    loadData("");
  }, []);
  const renderItem: ListRenderItem<Stock> = ({ item }) => {
    return <Text>{item.name}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      {loading ? (
        <Text style={styles.title}>Loading...</Text>
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
      <Button
        title="Go To Details"
        onPress={() => navigation.navigate("StockDetails")}
      />
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
