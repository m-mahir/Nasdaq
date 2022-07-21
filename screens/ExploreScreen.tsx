import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
} from "react-native";
import Search from "../components/Explore/Search";
import StockListItem from "../components/Explore/StockListItem";
import { Loader } from "../components/Loader";

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

  const [filter, setFilter] = useState("");
  const searchRef = useRef<any>();

  useEffect(() => {
    let timeout;

    if (filter?.length) {
      timeout = setTimeout(() => {
        if (filter === searchRef.current.props.value)
          loadData({ search: filter });
      }, 500);
    } else loadData();
  }, [filter, searchRef]);

  const itemClickedHandler = (ticker: string) =>
    navigation.navigate("StockDetails", { ticker });

  const renderItem: ListRenderItem<Stock> = ({ item }) => {
    return <StockListItem stock={item} onItemClicked={()=>itemClickedHandler(item.ticker)} />;
  };

  const renderFooter = () => {
    let loader = null;
    loader = <Loader />;
    return <View>{data && data.length > 8 ? loader : null}</View>;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Search
            placeholder="Search..."
            onChange={setFilter}
            value={filter}
            inputRef={searchRef}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            onEndReached={() => {
              if (data.length >= 10 && data.length % 10 === 0)
                loadData({ search: filter, isLoadMore: true });
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        </React.Fragment>
      )}
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
