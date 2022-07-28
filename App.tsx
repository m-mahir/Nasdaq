import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "./overmind";
import axios from "axios";
import { API_KEY, BASE_URL } from "./config";
import { StatusBar } from "expo-status-bar";
import { theme } from "./constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {apiKey : API_KEY}

const overmind = createOvermind(config);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider value={overmind}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={theme.colors.primary }/>
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
