import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export const WordCard = ({ data, onPress }) => {
  const [isSelected, setIsSelected] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          backgroundColor: isSelected ? "#EEF2FF" : "#fff",
        },
      ]}
    >
      <View style={styles.userInfo}>
        <Image source={{ uri: data.author.avatar }} style={styles.avatar} />
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{data.difficulty}</Text>
        </View>
      </View>

      <Pressable style={styles.content} onPress={onPress}>
        <Text style={styles.word}>{data.word}</Text>
        <Text style={styles.type}>{data.type}</Text>
        <Text style={styles.translation} numberOfLines={2}>
          {data.translation}
        </Text>
      </Pressable>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSelect} style={styles.selectButton}>
          <Icon
            name={isSelected ? "check-circle" : "circle"}
            size={20}
            color={isSelected ? "#4F46E5" : "#9CA3AF"}
          />
        </TouchableOpacity>
        <View style={styles.learnedStatus}>
          <Icon
            name={data.learned ? "check" : "clock"}
            size={16}
            color={data.learned ? "#059669" : "#9CA3AF"}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "47%",
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  difficultyBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    color: "#4B5563",
    textTransform: "capitalize",
  },
  content: {
    flex: 1,
    marginBottom: 12,
  },
  word: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  type: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
    fontStyle: "italic",
  },
  translation: {
    fontSize: 14,
    color: "#374151",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },
  selectButton: {
    padding: 4,
  },
  learnedStatus: {
    backgroundColor: "#F3F4F6",
    padding: 4,
    borderRadius: 12,
  },
});
