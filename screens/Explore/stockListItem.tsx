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
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 22px;
`;

export default function StockListItem({ stock, onItemClicked }: Props) {
  return (
    <TouchableItem onPress={onItemClicked}>
      <ThemeText style={styles.title}>{stock.ticker}</ThemeText>
      <ThemeText>{stock.name}</ThemeText>
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
