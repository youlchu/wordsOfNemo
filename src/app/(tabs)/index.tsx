import { StyleSheet, View, Text } from "react-native";

import { HelloWave } from "../../components/HelloWave";
import { ThemedView } from "../../components/ThemedView";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.rowContainer}>
        <Text style={styles.text}>Selam Memo Adpp</Text>
        <HelloWave />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
