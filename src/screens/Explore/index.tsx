import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import Search from "./Search";
import Loader from "../../components/Loader";

import { theme } from "../../constants";
import { useActions, useAppState } from "../../overmind";
import { RootStackParamList } from "../../../types";
import styled from "styled-components/native";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import NoData from "./NoData";
import List from "./List";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${theme.colors.primary};
`;

const ExploreScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, "Root", "Modal">
> = () => {
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

  const handleBottomScroll = () => {
    if (stockList.length >= 10 && stockList.length % 10 === 0) {
      loadData({ search: filter, isLoadMore: true });
      setIsLoadMore(true);
    }
  };

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
    if (searchRef.current?.props.value && !stockList.length)
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
          <List
            dataList={stockList}
            bottomScrollHandler={handleBottomScroll}
            loading={loading}
          />
        </>
      );
  }

  return <Container>{body}</Container>;
};

export default withErrorHandler(ExploreScreen);
