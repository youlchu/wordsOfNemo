// app/(tabs)/add-word.tsx
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useLocalization } from "../../localization";
import {
  KeyboardView,
  PrimaryButton,
  Separator,
  TextInput,
  Text,
} from "../../components";

type WordType = {
  word: string;
  type: string;
  translation: string;
  difficulty: "easy" | "medium" | "hard";
  example: string;
  author: {
    avatar: string;
  };
  learned: boolean;
};

export default function AddWordScreen() {
  const router = useRouter();
  const { getString } = useLocalization();

  const [wordData, setWordData] = useState<WordType>({
    word: "",
    type: "",
    translation: "",
    example: "",
    difficulty: "easy",
    author: {
      avatar: "https://via.placeholder.com/150",
    },
    learned: false,
  });

  const handleSave = async () => {
    if (!wordData.word || !wordData.translation) {
      Alert.alert(
        getString("Error"),
        getString("Please fill in all required fields"),
        [{ text: getString("OK") }]
      );
      return;
    }

    try {
      const existingWords = await AsyncStorage.getItem("words");
      const words = existingWords ? JSON.parse(existingWords) : [];
      words.push({ ...wordData, id: Date.now() });
      await AsyncStorage.setItem("words", JSON.stringify(words));
      router.back();
    } catch (error) {
      Alert.alert(getString("Error"), getString("Failed to save word"), [
        { text: getString("OK") },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={24} color="#4F46E5" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{getString("Add New Word")}</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>{getString("Save")}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            inputProps={{
              placeholder: getString("Word"),
              value: wordData.word,
              onChangeText: (text) => setWordData({ ...wordData, word: text }),
            }}
          />

          <Separator height={16} />

          <TextInput
            inputProps={{
              placeholder: getString("Type (noun, verb, etc.)"),
              value: wordData.type,
              onChangeText: (text) => setWordData({ ...wordData, type: text }),
            }}
          />

          <Separator height={16} />

          <TextInput
            inputProps={{
              placeholder: getString("Translation"),
              value: wordData.translation,
              onChangeText: (text) =>
                setWordData({ ...wordData, translation: text }),
              multiline: true,
              numberOfLines: 3,
              style: { height: 80, textAlignVertical: "top" },
            }}
          />

          <Separator height={16} />

          <TextInput
            inputProps={{
              placeholder: getString("Example Sentence"),
              value: wordData.example,
              onChangeText: (text) =>
                setWordData({ ...wordData, example: text }),
              multiline: true,
              numberOfLines: 3,
              style: { height: 80, textAlignVertical: "top" },
            }}
          />

          <Separator height={24} />

          <Text style={styles.sectionTitle}>
            {getString("Difficulty Level")}
          </Text>
          <View style={styles.difficultyContainer}>
            {["easy", "medium", "hard"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.difficultyButton,
                  wordData.difficulty === level && styles.selectedDifficulty,
                ]}
                onPress={() =>
                  setWordData({
                    ...wordData,
                    difficulty: level as WordType["difficulty"],
                  })
                }
              >
                <Text
                  style={[
                    styles.difficultyText,
                    wordData.difficulty === level &&
                      styles.selectedDifficultyText,
                  ]}
                >
                  {getString(level.charAt(0).toUpperCase() + level.slice(1))}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Separator height={32} />

          <PrimaryButton title={getString("Save Word")} onPress={handleSave} />
        </ScrollView>
      </KeyboardView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  saveButton: {
    color: "#4F46E5",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 12,
  },
  difficultyContainer: {
    flexDirection: "row",
    gap: 12,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
  },
  selectedDifficulty: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  difficultyText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedDifficultyText: {
    color: "#fff",
  },
});
