import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";

import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "./src/overmind";
import axios from "axios";
import { API_KEY, BASE_URL } from "./src/config";
import { StatusBar } from "expo-status-bar";
import { theme } from "./src/constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = { apiKey: API_KEY };

const overmind = createOvermind(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider value={overmind}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={theme.colors.primary} />
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;
