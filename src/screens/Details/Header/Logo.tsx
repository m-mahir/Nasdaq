import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeText } from "../../../components/ThemeText";
import { API_KEY } from "../../../config";
import { theme } from "../../../constants";

const StyledImage = styled.Image`
  width: 50px;
  height: 50px;
`;

interface Props {
  url?: string;
  name: string;
}

const Logo: React.FC<Props> = ({ url, name }) => {
  if (url)
    return (
      <StyledImage
        style={styles.logo}
        source={{
          uri: url + "?apiKey=" + API_KEY,
        }}
        testID="logo-image"
      />
    );
  else
    return (
      <ThemeText style={[styles.logo, styles.initials]} testID="logo-text">
        {name.substring(0, 2)}
      </ThemeText>
    );
};

const styles = StyleSheet.create({
  logo: {
    borderRadius: 10,
    alignSelf: "center",
    overflow: "hidden",
  },
  initials: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    fontSize: 20,
  },
});

export default Logo;
