import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import Search from "./Search";
import StockListItem from "./StockListItem";
import Loader from "../../components/Loader";

import { theme } from "../../constants";
import { useActions, useAppState } from "../../overmind";
import { Stock } from "../../overmind/state";
import { RootStackParamList } from "../../../types";
import styled from "styled-components/native";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import NoData from "./NoData";
import Separator from "./Separator";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${theme.colors.primary};
`;

const FooterContainer = styled.View`
  background-color: ${theme.colors.primary};
  padding-top: 35px;
  padding-bottom: 45px;
`;

const ExploreScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, "Root", "Modal">
> = ({ navigation }) => {
  const loading = useAppState().isLoading;
  const stockList = useAppState().stocks;
  const loadData = useActions().loadStocks;

  const [isLoadMore, setIsLoadMore] = useState(false);
  const [filter, setFilter] = useState("");
  const searchRef = useRef<any>();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    setIsLoadMore(false);

    if (filter?.length) {
      timeout = setTimeout(() => {
        if (filter === searchRef.current.props.value)
          loadData({ search: filter });
      }, 500);
    } else loadData();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [filter]);

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

  const Footer = (
    <>
      <Separator />
      <FooterContainer>
        {stockList && stockList.length >= 10 && loading ? <Loader /> : null}
      </FooterContainer>
    </>
  );

  let body, search;
  if (loading && !isLoadMore) body = <Loader />;
  else {
    search = (
      <Search
        placeholder="Search..."
        onChange={setFilter}
        value={filter}
        inputRef={searchRef}
      />
    );
    if (filter && !stockList.length)
      body = (
        <>
          {search}
          <Container>
            <NoData />
          </Container>
        </>
      );
    else
      body = (
        <>
          {search}
          <FlatList
            data={stockList}
            renderItem={renderItem}
            onEndReached={() => {
              if (stockList.length >= 10 && stockList.length % 10 === 0) {
                loadData({ search: filter, isLoadMore: true });
                setIsLoadMore(true);
              }
            }}
            ListFooterComponent={Footer}
            ItemSeparatorComponent={Separator}
            testID="list"
          />
        </>
      );
  }

  return <Container>{body}</Container>;
};

export default withErrorHandler(ExploreScreen);
