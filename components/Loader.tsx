import { ActivityIndicator } from "react-native";
import { theme } from "../constants";

export function Loader() {
  return <ActivityIndicator size="large" color={theme.colors.secondary} />;
}
