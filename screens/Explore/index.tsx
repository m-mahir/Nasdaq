import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import Search from "./search";
import StockListItem from "./stockListItem";
import Loader from "../../components/Loader";

import { View } from "../../components/Themed";
import { theme } from "../../constants";
import { useActions, useAppState } from "../../overmind";
import { Stock } from "../../overmind/state";
import { RootStackParamList } from "../../types";
import styled from "styled-components/native";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Container = styled.View`
  flex: 1;
  padding-top: 25px;
  padding-bottom: 15px;
  justify-content: center;
  background-color: ${theme.colors.primary};
`;

const ExploreScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, "Root", "Modal">
> = ({ navigation }) => {
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
    return (
      <StockListItem
        stock={item}
        onItemClicked={() => itemClickedHandler(item.ticker)}
      />
    );
  };

  const renderFooter = () => {
    let loader = null;
    loader = <Loader />;
    return <View>{data && data.length > 8 ? loader : null}</View>;
  };

  let body;
  if (loading) body = <Loader />;
  else
    body = (
      <>
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
      </>
    );

  return <Container>{body}</Container>;
};

export default withErrorHandler(ExploreScreen);
