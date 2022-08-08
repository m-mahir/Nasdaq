import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeText } from "../../../components/ThemeText";

interface Props {
  title: string;
}

const Container = styled.View`
  margin-top: 12px;
`;

export const Section: React.FC<Props> = ({ title, children }) => (
  <Container>
    <ThemeText style={styles.title} testID="about-title">
      {title}
    </ThemeText>
    <ThemeText style={styles.text} testID="about-desc">
      {children}
    </ThemeText>
  </Container>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
