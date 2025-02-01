import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { initLocalization } from "../localization/Localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationProvider } from "../context";
import { User } from "../components/models";
import axios from "axios";

export default function RootLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const init = async () => {
      await initLocalization();
      const loginStatus = await AsyncStorage.getItem("isLoggedIn");

      const [accessTokenResponse, userResponse] = await AsyncStorage.multiGet([
        "AccessToken",
        "User",
      ]);
      const _accessToken = accessTokenResponse[1];
      const _user = userResponse[1];

      if (_accessToken && _user) {
        axios.defaults.headers["Authorization"] = "Bearer " + _accessToken;
        setUser(JSON.parse(_user));
      }

      setIsLoggedIn(loginStatus === "true");
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthenticationProvider user={user}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthenticationProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
