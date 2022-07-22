import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Loader } from "../../../components/Loader";
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
  min-height: 200;
`;
const PricesContainer = styled.View`
  flex-direction: row;
  margin-vertical: 5;
  flex-wrap: wrap;
`;
const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export function Statistics({ aggregates }: Props) {
  const loadingAggs = useAppState().isLoadingAggs;

  return (
    <Container>
      {loadingAggs ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <View>
          <ThemeText style={styles.title}>Statistics</ThemeText>
          <PricesContainer>
            <Price title={"Open"}>{aggregates?.open}</Price>
            <Price title={"Close"}>{aggregates?.close}</Price>
            <Price title={"High"}>{aggregates?.high}</Price>
            <Price title={"Low"}>{aggregates?.low}</Price>
            <Price title={"Volume"}>{aggregates?.volume}</Price>
          </PricesContainer>
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
