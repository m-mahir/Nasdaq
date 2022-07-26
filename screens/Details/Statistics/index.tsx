import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import Loader from "../../../components/Loader";
import { ThemeText } from "../../../components/ThemeText";
import { theme } from "../../../constants";
import { useAppState } from "../../../overmind";
import { Aggregates } from "../../../overmind/state";
import Price from "./price";

interface Props {
  aggregates?: Aggregates;
}

const Container = styled.View`
  background-color: ${theme.colors.primary};
  padding: 15px;
  min-height: 200px;
`;
const PricesContainer = styled.View`
  flex-direction: row;
  margin-vertical: 5px;
  flex-wrap: wrap;
`;
const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export function Statistics({ aggregates }: Props) {
  const loadingAggs = useAppState().isLoadingAggs;

  if (loadingAggs)
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );

  let body;
  if (aggregates?.open)
    body = (
      <PricesContainer>
        <Price title={"Open"}>{aggregates?.open}</Price>
        <Price title={"Close"}>{aggregates?.close}</Price>
        <Price title={"High"}>{aggregates?.high}</Price>
        <Price title={"Low"}>{aggregates?.low}</Price>
        <Price title={"Volume"}>{aggregates?.volume}</Price>
      </PricesContainer>
    );
  else body = <ThemeText style={styles.text}>No data avaiable for yesterday</ThemeText>;

  return (
    <Container>
      <View>
        <ThemeText style={styles.title}>Statistics</ThemeText>
        {body}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  }
});
