import { StyleSheet } from "react-native";
import { ThemeText } from "../../components/ThemeText";
import { View } from "../../components/Themed";
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
      <ThemeText style={styles.title} testID="ticker">{stock.ticker}</ThemeText>
      <ThemeText testID="name">{stock.name}</ThemeText>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginTop: 22,
    height: 1,
  },
});
