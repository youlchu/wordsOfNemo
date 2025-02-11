// app/(tabs)/explore.tsx
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

import { useLocalization } from "../../localization";
import { PrimaryButton, Separator, Text } from "../../components";

export default function SettingsScreen() {
  const router = useRouter();
  const { getString } = useLocalization();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{getString("Settings")}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.settingItem}>
          <Icon name="user" size={20} color="#4B5563" />
          <Text style={styles.settingTitle}>{getString("Profile")}</Text>
          <Icon name="chevron-right" size={20} color="#9CA3AF" />
        </View>

        <View style={styles.settingItem}>
          <Icon name="bell" size={20} color="#4B5563" />
          <Text style={styles.settingTitle}>{getString("Notifications")}</Text>
          <Icon name="chevron-right" size={20} color="#9CA3AF" />
        </View>

        <View style={styles.settingItem}>
          <Icon name="globe" size={20} color="#4B5563" />
          <Text style={styles.settingTitle}>{getString("Language")}</Text>
          <Icon name="chevron-right" size={20} color="#9CA3AF" />
        </View>

        <Separator height={32} />

        <PrimaryButton
          title={getString("LOGOUT_UPPER")}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 12,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  logoutButton: {
    backgroundColor: "#EF4444", // Kırmızı renk
  },
});
