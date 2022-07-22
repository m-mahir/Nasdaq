import { Button } from "@rneui/base";
import { Linking, StyleSheet, View } from "react-native";
import { theme } from "../../../constants";
import { useAppState } from "../../../overmind";
import { Stock } from "../../../overmind/state";
import { ThemeText } from "../../../components/ThemeText";
import AboutInfo from "./section";
import styled from "styled-components/native";

interface Props {
  stock: Stock;
}

const Container = styled.View`
  background-color: ${theme.colors.primary};
  margin-top: 15;
  padding: 15px;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

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
    <Container>
      <View>
        <TitleContainer>
          <ThemeText style={styles.title}>About</ThemeText>
          {stock?.companyWebsiteURL && (
            <Button
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              title="Visit Website"
              onPress={openWebsiteHandler}
            />
          )}
        </TitleContainer>
        {stock?.industry && (
          <AboutInfo title="Industry">{stock?.industry}</AboutInfo>
        )}
        {stock?.description && (
          <AboutInfo title="Description">{stock?.description}</AboutInfo>
        )}
      </View>
    </Container>
  ) : null;
}

const styles = StyleSheet.create({
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
