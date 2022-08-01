import { StyleSheet } from "react-native";
import { ThemeText } from "../../components/ThemeText";
import { theme } from "../../constants";
import styled from "styled-components/native";

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

export default function StockListItem({ stock, onItemClicked }: Props) {
  return (
    <TouchableItem testID="item" onPress={onItemClicked}>
      <ThemeText style={styles.title} testID="ticker">
        {stock.ticker}
      </ThemeText>
      <ThemeText testID="name">{stock.name}</ThemeText>
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
