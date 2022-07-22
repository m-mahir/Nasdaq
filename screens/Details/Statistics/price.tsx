import { StyleSheet, View } from "react-native";
import { ThemeText } from "../../../components/ThemeText";

interface Props {
  title: string;
}

const Price: React.FC<Props> = ({ title, children }) => (
  <View style={styles.container}>
    <ThemeText style={styles.title}>{title}</ThemeText>
    <ThemeText style={styles.price}>{children}</ThemeText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "33%",
    marginTop: 12
  },
  title: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default Price;
