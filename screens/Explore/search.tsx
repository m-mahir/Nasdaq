import { StyleSheet } from "react-native";
import { theme } from "../../constants";
import { SearchBar } from "@rneui/themed";
import styled from 'styled-components/native';

interface Props {
  placeholder: string;
  onChange: (val: string) => void;
  value: string;
  inputRef: any;
}

const StyledView = styled.View`
  background-color: ${theme.colors.primaryDark};
  padding-vertical: 15;
  padding-horizontal: 15;
`;

export default function Search({ placeholder, onChange, value, inputRef }: Props) {
  return (
    <StyledView>
      <SearchBar
        placeholder={placeholder}
        onChangeText={(val) => onChange(val)}
        value={value}
        ref={inputRef}
        lightTheme={true}
        round={true}
        inputStyle={styles.text}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor={theme.colors.secondary}
        clearIcon={{ size: 22, color: theme.colors.secondary }}
        searchIcon={{ size: 22, color: theme.colors.secondary }}
      />
    </StyledView>
  );
}

const styles = StyleSheet.create({
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
