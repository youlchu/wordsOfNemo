import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeaderLine } from "../components/auth";
import {
  KeyboardView,
  PrimaryButton,
  Separator,
  TextInput,
  Text,
} from "../components";
import { Theme } from "../theme";
import { useLocalization } from "../localization/Localization";

const LoginScreen = () => {
  const router = useRouter();
  const { getString } = useLocalization();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    if (username === "user" && password === "pass") {
      await AsyncStorage.setItem("isLoggedIn", "true");
      router.replace("/(tabs)");
    } else {
      Alert.alert(
        getString("Error"),
        getString("Invalid Credentials"),
        [{ text: getString("OK") }]
      );
    }
  };
  const onClickRegister = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardView style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Text style={styles.titleText}>{getString("Login Title")}</Text>
          <TextInput
            inputProps={{
              placeholder: getString("Username"),
              value: username,
              onChangeText: setUsername,
            }}
          />
          <Separator height={16} />
          <TextInput
            inputProps={{
              placeholder: getString("Password"),
              secureTextEntry: true,
              textContentType: "none",
              autoCorrect: false,
              value: password,
              onChangeText: setPassword,
            }}
          />
          <Separator height={32} />
          <PrimaryButton
            title={getString("LOGIN_UPPER")}
            onPress={onClickLogin}
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onClickRegister}
          >
            <Text style={styles.registerButtonTitle}>
              {getString("REGISTER_UPPER")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardView>
      <HeaderLine />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 42,
    fontFamily: "default-light",
    color: Theme.colors.primaryColor,
    marginBottom: 24,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  registerButtonTitle: { color: Theme.colors.gray },
});
