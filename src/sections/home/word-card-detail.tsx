import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export const WordCardDetail = ({ data, onClose }) => {
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

  const handleClose = () => {
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
    ]).start(onClose);
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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.authorInfo}>
              <Image
                source={{ uri: data.author.avatar }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{data.author.username}</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="x" size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content}>
            <View style={styles.wordHeader}>
              <View>
                <Text style={styles.word}>{data.word}</Text>
                <Text style={styles.pronunciation}>{data.pronunciation}</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{data.difficulty}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Type</Text>
              <Text style={styles.type}>{data.type}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Translation</Text>
              <Text style={styles.translation}>{data.translation}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Example</Text>
              <Text style={styles.example}>{data.example}</Text>
            </View>

            {data.notes && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notes</Text>
                <Text style={styles.notes}>{data.notes}</Text>
              </View>
            )}

            <View style={styles.tagsContainer}>
              {data.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.practiceButton}>
              <Text style={styles.practiceButtonText}>Practice Now</Text>
            </TouchableOpacity>
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
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    color: "#4B5563",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  word: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  pronunciation: {
    fontSize: 16,
    color: "#6B7280",
    fontFamily: "monospace",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  type: {
    fontSize: 18,
    color: "#111827",
    fontStyle: "italic",
  },
  translation: {
    fontSize: 18,
    color: "#111827",
  },
  example: {
    fontSize: 16,
    color: "#374151",
    fontStyle: "italic",
  },
  notes: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: "#4F46E5",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  practiceButton: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  practiceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  badgeContainer: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    color: "#4B5563",
    textTransform: "capitalize",
  },
});
