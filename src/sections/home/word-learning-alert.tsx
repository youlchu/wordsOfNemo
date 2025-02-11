import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
} from "react-native";
import { QueuedWord } from "./type";

interface WordLearningAlertProps {
  word: QueuedWord;
  onComplete: (remembered: boolean) => void;
}

export const WordLearningAlert = ({
  word,
  onComplete,
}: WordLearningAlertProps) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const scaleAnim = new Animated.Value(0.9);
  const opacityAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleComplete = (remembered) => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onComplete(remembered));
  };

  return (
    <Modal transparent animationType="none">
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Time to Review!</Text>
            <Text style={styles.word}>{word.word}</Text>
            <Text style={styles.pronunciation}>{word.pronunciation}</Text>

            {!showTranslation ? (
              <TouchableOpacity
                style={styles.showButton}
                onPress={() => setShowTranslation(true)}
              >
                <Text style={styles.showButtonText}>Show Translation</Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.translation}>{word.translation}</Text>
                <Text style={styles.example}>{word.example}</Text>
              </>
            )}

            {showTranslation && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.failButton]}
                  onPress={() => handleComplete(false)}
                >
                  <Text style={styles.buttonText}>Didn't Remember</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.successButton]}
                  onPress={() => handleComplete(true)}
                >
                  <Text style={styles.buttonText}>Remembered!</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    padding: 24,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 8,
  },
  pronunciation: {
    fontSize: 18,
    color: "#6B7280",
    fontFamily: "monospace",
    marginBottom: 24,
  },
  translation: {
    fontSize: 24,
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  example: {
    fontSize: 16,
    color: "#4B5563",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 24,
  },
  showButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  showButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  failButton: {
    backgroundColor: "#EF4444",
  },
  successButton: {
    backgroundColor: "#10B981",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
