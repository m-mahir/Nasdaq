import { Button } from "@rneui/base";
import { Linking, StyleSheet, View } from "react-native";
import { theme } from "../../../constants";
import { useAppState } from "../../../overmind";
import { Stock } from "../../../overmind/state";
import { ThemeText } from "../../../components/ThemeText";
import AboutInfo from "./section";

interface Props {
  stock: Stock;
}

export default function About({ stock }: Props) {
  const loadingDetails = useAppState().isLoading;

  const showAbout =
    stock?.companyWebsiteURL || stock?.industry || stock?.description;

  const openWebsiteHandler = () => {
    let url = stock?.companyWebsiteURL || "";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return showAbout && !loadingDetails ? (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <ThemeText style={styles.title}>About</ThemeText>
          {stock?.companyWebsiteURL && (
            <Button
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              title="Visit Website"
              onPress={openWebsiteHandler}
            />
          )}
        </View>
        {stock?.industry && (
          <AboutInfo title="Industry">{stock?.industry}</AboutInfo>
        )}
        {stock?.description && (
          <AboutInfo title="Description">{stock?.description}</AboutInfo>
        )}
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    marginTop: 15,
    padding: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
  },
  buttonTitle: { color: theme.colors.primaryDark },
});
