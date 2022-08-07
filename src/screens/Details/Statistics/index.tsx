import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import Loader from "../../../components/Loader";
import { ThemeText } from "../../../components/ThemeText";
import { theme } from "../../../constants";
import { useAppState } from "../../../overmind";
import { Aggregates } from "../../../overmind/state";
import Section from "./Section";

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
  margin-top: 5px;
  flex-wrap: wrap;
`;
const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export function Statistics({ aggregates }: Props) {
  const loadingAggs = useAppState().isLoadingAggs;

  const numFormatter = (num?: number) => {
    if (num) {
      if (num > 999 && num < 1000000) return (num / 1000).toFixed(1) + "K";
      else if (num > 1000000 && num < 1000000000)
        return (num / 1000000).toFixed(1) + "M";
      else if (num > 1000000000) return (num / 1000000000).toFixed(1) + "B";
      return num;
    }
    return;
  };

  const getStatisticsBody = () => {
    if (aggregates?.open)
      return (
        <PricesContainer>
          <Section title={"Open"}>${aggregates?.open.toFixed(2)}</Section>
          <Section title={"Close"}>${aggregates?.close?.toFixed(2)}</Section>
          <Section title={"Volume"}>{numFormatter(aggregates?.volume)}</Section>
          <Section title={"High"}>${aggregates?.high?.toFixed(2)}</Section>
          <Section title={"Low"}>${aggregates?.low?.toFixed(2)}</Section>
        </PricesContainer>
      );
    else
      return (
        <ThemeText style={styles.text}>
          No data avaiable for yesterday
        </ThemeText>
      );
  };

  let prices, body;
  if (loadingAggs) {
    body = (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  } else {
    prices = getStatisticsBody();
    body = (
      <View>
        <ThemeText style={styles.title}>Statistics</ThemeText>
        {prices}
      </View>
    );
  }

  return <Container>{body}</Container>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});
