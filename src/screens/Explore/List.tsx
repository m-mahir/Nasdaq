import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import StockListItem from "./StockListItem";
import Loader from "../../components/Loader";

import { theme } from "../../constants";
import { Stock } from "../../overmind/state";
import styled from "styled-components/native";
import Separator from "./Separator";
import { useNavigation } from "@react-navigation/native";

interface Props {
  dataList: Stock[];
  bottomScrollHandler: () => void;
  loading: boolean;
}

const FooterContainer = styled.View`
  background-color: ${theme.colors.primary};
  padding-top: 35px;
  padding-bottom: 45px;
`;

const List = ({ dataList, bottomScrollHandler, loading }: Props) => {
  const navigation = useNavigation();
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
        {dataList && dataList.length >= 10 && loading ? <Loader /> : null}
      </FooterContainer>
    </>
  );

  return (
    <FlatList
      data={dataList}
      renderItem={renderItem}
      onEndReached={bottomScrollHandler}
      ListFooterComponent={Footer}
      ItemSeparatorComponent={Separator}
      testID="list"
    />
  );
};

export default List;
