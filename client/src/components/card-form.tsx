import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export const AddWordCard = ({ navigation }) => {
  const [wordData, setWordData] = useState({
    word: "",
    type: "",
    translation: "",
    pronunciation: "",
    example: "",
    notes: "",
    difficulty: "intermediate",
    tags: [],
  });

  const handleSubmit = () => {
    // Burada yeni kelime kartı ekleme mantığını gerçekleştirin
    console.log("New word card:", wordData);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Word Card</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Word"
          value={wordData.word}
          onChangeText={(text) => setWordData({ ...wordData, word: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Type"
          value={wordData.type}
          onChangeText={(text) => setWordData({ ...wordData, type: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Translation"
          value={wordData.translation}
          onChangeText={(text) =>
            setWordData({ ...wordData, translation: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Pronunciation"
          value={wordData.pronunciation}
          onChangeText={(text) =>
            setWordData({ ...wordData, pronunciation: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Example"
          value={wordData.example}
          onChangeText={(text) => setWordData({ ...wordData, example: text })}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Notes"
          value={wordData.notes}
          onChangeText={(text) => setWordData({ ...wordData, notes: text })}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Word Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#111827",
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
