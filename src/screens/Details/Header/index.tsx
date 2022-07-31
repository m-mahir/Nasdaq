import { Image, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import Loader from "../../../components/Loader";
import { ThemeText } from "../../../components/ThemeText";
import { useAppState } from "../../../overmind";
import { Stock } from "../../../overmind/state";
import Logo from "./Logo";

interface Props {
  stock: Stock;
}

const Container = styled.View`
  padding: 15px;
  min-height: 200px;
`;
const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export function Header({ stock }: Props) {
  const loadingDetails = useAppState().isLoading;

  let body;
  if (loadingDetails)
    body = (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  else
    body = (
      <View>
        <Logo url={stock.logo} name={stock.name} />
        <ThemeText style={styles.ticker}>{stock.ticker}</ThemeText>
        <ThemeText style={styles.name}>{stock.name}</ThemeText>
        {stock.aggregates && <ThemeText style={styles.price}>${stock.aggregates.close}</ThemeText>}
      </View>
    );

  return <Container>{body}</Container>;
}

const styles = StyleSheet.create({
  ticker: {
    fontSize: 30,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 40,
  },
});
