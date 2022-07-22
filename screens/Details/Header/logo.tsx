import { Image, StyleSheet } from "react-native";
import { ThemeText } from "../../../components/ThemeText";
import { API_KEY } from "../../../config";
import { theme } from "../../../constants";

interface Props {
  url?: string;
  name: string;
}

const Logo: React.FC<Props> = ({ url, name }) => {
  if (url)
    return (
      <Image
        style={styles.logo}
        source={{
          uri: url + "?" + API_KEY,
        }}
      />
    );
  else
    return (
      <ThemeText style={[styles.logo, styles.initials]}>
        {name.substring(0, 2)}
      </ThemeText>
    );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
  },
  initials: {
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
});

export default Logo;
