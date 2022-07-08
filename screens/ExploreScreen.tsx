import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Button, FlatList, ListRenderItem, StyleSheet } from "react-native";
import StockListItem from "../components/Explore/StockListItem";

import { Text, View } from "../components/Themed";
import { theme } from "../contants";
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
    return <StockListItem stock={item} />;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
      {/* <Button
        title="Go To Details"
        onPress={() => navigation.navigate("StockDetails")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 25,
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  }
});
