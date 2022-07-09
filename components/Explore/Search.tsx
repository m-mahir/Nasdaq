import { StyleSheet } from "react-native";
import { View } from "../Themed";
import { theme } from "../../contants";
import { SearchBar } from "@rneui/themed";

interface Props {
  placeholder: string;
  onChange: (val: string) => void;
  value: string;
}

export default function Search({ placeholder, onChange, value }: Props) {
  return (
    <View style={styles.searchBar}>
      <SearchBar
        placeholder={placeholder}
        onChangeText={(val) => onChange(val)}
        value={value}
        lightTheme={true}
        round={true}
        inputStyle={styles.text}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor={theme.colors.secondary}
        clearIcon={{ size: 22, color: theme.colors.secondary }}
        searchIcon={{ size: 22, color: theme.colors.secondary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: theme.colors.primaryDark,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  searchBarContainer: {
    backgroundColor: theme.colors.primaryDark,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainerStyle: {
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: 0,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: theme.colors.secondary,
  },
});
