import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackParamList } from "../types";

export default function ExploreScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Root', 'Modal'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Button title="Go To Details" onPress={() => navigation.navigate("StockDetails")} />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
