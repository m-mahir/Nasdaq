import { StyleSheet, View } from "react-native";
import { ThemeText } from "../../components/ThemeText";
import { theme } from "../../constants";
import styled from "styled-components/native";
import { Icon } from "@rneui/base";

interface Props {
  stock: {
    ticker: string;
    name: string;
  };
  onItemClicked: () => void;
}

const TouchableItem = styled.TouchableOpacity`
  width: 100%;
  background-color: ${theme.colors.primary};
  padding: 15px 25px;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoContainer = styled.View`
  max-width: 85%;
`;

export default function StockListItem({ stock, onItemClicked }: Props) {
  return (
    <TouchableItem testID="item" onPress={onItemClicked}>
      <Container>
        <InfoContainer>
          <ThemeText style={styles.title} testID="ticker">
            {stock.ticker}
          </ThemeText>
          <ThemeText testID="name">{stock.name}</ThemeText>
        </InfoContainer>
        <Icon
          name="chevron-right"
          size={35}
          color={theme.colors.secondaryLight}
        />
      </Container>
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
