import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter, useSegments } from "expo-router";
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { initLocalization } from '../localization/Localization';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      await initLocalization();
      const loginStatus = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      router.replace("/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});