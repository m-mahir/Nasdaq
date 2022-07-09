import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from "react-native";
import Search from "../components/Explore/Search";
import StockListItem from "../components/Explore/StockListItem";

import { View } from "../components/Themed";
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
  }, [loadData]);
  const renderItem: ListRenderItem<Stock> = ({ item }) => {
    return <StockListItem stock={item} />;
  };

  const renderFooter = () => {
    let loader = null;
    loader = <ActivityIndicator size="large" color={theme.colors.secondary} />;
    return <View>{data && data.length > 8 ? loader : null}</View>;
  };

  const [searchInputText, setSearchInputText] = useState("");
  const timeOutRef: { current: NodeJS.Timeout | null } = useRef(null);

  const updateSearch = (val: string) => {
    setSearchInputText(val);
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(function () {
      loadData({ search: val });
    }, 500);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      ) : (
        <React.Fragment>
          <Search
            placeholder="Search..."
            onChange={updateSearch}
            value={searchInputText}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            onEndReached={() => {
              if (data.length >= 10 && data.length % 10 === 0)
                loadData({ search: searchInputText, isLoadMore: true }) || null;
            }}
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
