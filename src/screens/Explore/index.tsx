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
  padding-vertical: 35px;
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
    let timeout: ReturnType<typeof setTimeout>;

    if (filter?.length) {
      timeout = setTimeout(() => {
        if (filter === searchRef.current.props.value)
          loadData({ search: filter });
      }, 500);
    } else loadData();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
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

  const Footer = (
    <FooterContainer>
      {data && data.length >= 10 ? <Loader /> : null}
    </FooterContainer>
  );

  let body, search;
  if (loading) body = <Loader />;
  else {
    search = (
      <Search
        placeholder="Search..."
        onChange={setFilter}
        value={filter}
        inputRef={searchRef}
      />
    );
    if (filter && !data.length)
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
            data={data}
            renderItem={renderItem}
            onEndReached={() => {
              if (data.length >= 10 && data.length % 10 === 0)
                loadData({ search: filter, isLoadMore: true });
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
