import { StyleSheet, View } from "react-native";
import { ThemeText } from "../../../components/ThemeText";

interface Props {
  title: string;
}

const AboutInfo: React.FC<Props> = ({ title, children }) => (
  <View style={styles.container}>
    <ThemeText style={styles.title}>{title}</ThemeText>
    <ThemeText style={styles.text}>{children}</ThemeText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 12
  },
  title: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default AboutInfo;
