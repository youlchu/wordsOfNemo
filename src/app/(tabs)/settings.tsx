import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn"); // Login durumu temizlenir
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Settings Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 20, // İçeriklerin arasına boşluk ekler
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
