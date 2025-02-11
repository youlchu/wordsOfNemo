import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";

import {
  KeyboardView,
  PrimaryButton,
  Separator,
  TextInput,
  Text,
  HeaderLine,
} from "../../components";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization/Localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: WIDTH } = Dimensions.get("screen");

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const { getString } = useLocalization();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const [termsModal, setTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (Object.values(formData).some((value) => !value)) {
      Alert.alert(getString("Error"), getString("Please fill all fields"));
      return false;
    }

    if (!termsAccepted) {
      Alert.alert(getString("Error"), getString("Please accept terms"));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert(getString("Error"), getString("Invalid email format"));
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Burada gerçek API çağrısı yapılacak
      // Şimdilik mock bir işlem yapıyoruz
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("user", JSON.stringify(formData));

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert(
        getString("Error"),
        getString("Registration failed. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardView style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>{getString("Register")}</Text>

          <TextInput
            inputProps={{
              placeholder: getString("First Name"),
              value: formData.firstName,
              onChangeText: (text) =>
                setFormData((prev) => ({ ...prev, firstName: text })),
            }}
          />
          <Separator height={16} />

          <TextInput
            inputProps={{
              placeholder: getString("Last Name"),
              value: formData.lastName,
              onChangeText: (text) =>
                setFormData((prev) => ({ ...prev, lastName: text })),
            }}
          />
          <Separator height={16} />

          <TextInput
            inputProps={{
              placeholder: getString("Email"),
              value: formData.email,
              onChangeText: (text) =>
                setFormData((prev) => ({ ...prev, email: text })),
              keyboardType: "email-address",
              autoCapitalize: "none",
            }}
          />
          <Separator height={16} />

          <TextInput
            inputProps={{
              placeholder: getString("Username"),
              value: formData.username,
              onChangeText: (text) =>
                setFormData((prev) => ({ ...prev, username: text })),
              autoCapitalize: "none",
            }}
          />
          <Separator height={16} />

          <TextInput
            inputProps={{
              placeholder: getString("Password"),
              value: formData.password,
              onChangeText: (text) =>
                setFormData((prev) => ({ ...prev, password: text })),
              secureTextEntry: true,
            }}
          />
          <Separator height={24} />

          <TouchableOpacity
            onPress={() => setTermsModal(true)}
            style={styles.termsButton}
          >
            <Text style={styles.termsText}>
              {termsAccepted ? "✓ " : ""}
              {getString("Accept Terms and Conditions")}
            </Text>
          </TouchableOpacity>

          <Separator height={24} />

          <PrimaryButton
            title={getString("REGISTER")}
            onPress={handleRegister}
            loading={loading}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              {getString("Back to Login")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardView>

      <Modal
        isVisible={termsModal}
        onBackdropPress={() => setTermsModal(false)}
        style={styles.modal}
      >
        <SafeAreaView style={styles.modalContent}>
          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalTitle}>
              {getString("Terms and Conditions")}
            </Text>
            <Text style={styles.modalText}>
              {/* Terms text buraya gelecek */}
              Lorem ipsum dolor sit amet...
            </Text>
          </ScrollView>
          <PrimaryButton
            title={getString("Accept")}
            onPress={() => {
              setTermsAccepted(true);
              setTermsModal(false);
            }}
          />
        </SafeAreaView>
      </Modal>

      <HeaderLine />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: "default-light",
    color: Theme.colors.primaryColor,
    marginBottom: 24,
  },
  termsButton: {
    padding: 8,
  },
  termsText: {
    color: Theme.colors.primaryColor,
    textAlign: "center",
  },
  backButton: {
    alignSelf: "center",
    marginTop: 16,
    padding: 8,
  },
  backButtonText: {
    color: Theme.colors.gray,
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "80%",
  },
  modalScroll: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
