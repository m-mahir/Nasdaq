import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, ListRenderItem, StyleSheet } from "react-native";
import Search from "../components/Explore/Search";
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
    loadData();
  }, []);
  const renderItem: ListRenderItem<Stock> = ({ item }) => {
    return <StockListItem stock={item} />;
  };

  const renderFooter = () => {
    let loader = null;
    loader = <ActivityIndicator size="large" color={theme.colors.secondary} />;
    return <View>{data.length > 8 ? loader : null}</View>;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      ) : (
        <React.Fragment>
          <Search placeholder="Search..." />
          <FlatList
            data={data}
            renderItem={renderItem}
            onEndReached={loadData || null}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        </React.Fragment>
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
    paddingTop: 25,
    paddingBottom: 15,
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
});
