import { Icon } from "@rneui/base";
import { StyleSheet } from "react-native";
import { ThemeText } from "../../components/ThemeText";
import { theme } from "../../constants";

export default function NoData() {
  return (
    <>
      <Icon name="search-off" color={theme.colors.secondary} size={70} />
      <ThemeText style={styles.text}>No Results Found</ThemeText>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    alignSelf: "center",
    marginTop: 15,
  },
});
