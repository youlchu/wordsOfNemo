import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useLocalization } from "../../localization/Localization";

const HomeHeaderView = ({ height = 280, animValue }) => {
  const { getString } = useLocalization();

  const headerHeight = animValue.interpolate({
    inputRange: [0, height],
    outputRange: [height, 80],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.container, { height: headerHeight }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="book" size={20} color="#fff" />
            <Text style={styles.statText}>243</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.statText}>45</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="alert-circle" size={20} color="#FFB6C1" />
            <Text style={styles.statText}>12</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>wordsofnemo</Text>
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>Streak: 7</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.searchInput} activeOpacity={0.7}>
          <Icon
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <Text style={styles.searchText}>{getString("Search Property")}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4F46E5",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  safeArea: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  streakContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  streakText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  searchInput: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    color: "#666",
    fontSize: 15,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    padding: 8,
  },
});

export default HomeHeaderView;
