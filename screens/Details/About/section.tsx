import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeText } from "../../../components/ThemeText";

interface Props {
  title: string;
}

const Container = styled.View`
  margin-top: 12;
`

const Section: React.FC<Props> = ({ title, children }) => (
  <Container>
    <ThemeText style={styles.title}>{title}</ThemeText>
    <ThemeText style={styles.text}>{children}</ThemeText>
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

export default Section;
