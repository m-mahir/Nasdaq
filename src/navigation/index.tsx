/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import StockDetailsScreen from "../screens/Details";
import ExploreScreen from "../screens/Explore";
import { RootStackParamList } from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { theme } from "../constants";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={ExploreScreen}
        options={{ headerShown: false, title: "Explore" }}
      />
      <Stack.Group>
        <Stack.Screen
          name="StockDetails"
          component={StockDetailsScreen}
          options={{
            title: "Stock Details",
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.secondary,
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
