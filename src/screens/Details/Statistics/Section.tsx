import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeText } from "../../../components/ThemeText";

interface Props {
  title: string;
}

const StyledView = styled.View`
  width: 33%;
  margin-top: 12px;
`;

export const Section: React.FC<Props> = ({ title, children }) => (
  <StyledView>
    <ThemeText style={styles.title} testID="statistics-title">{title}</ThemeText>
    <ThemeText style={styles.price} testID="statistics-price">{children}</ThemeText>
  </StyledView>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
