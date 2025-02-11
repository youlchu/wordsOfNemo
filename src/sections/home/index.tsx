// HomeView.js
import React, { useState } from "react";
import { StyleSheet, View, Animated, ScrollView } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import HomeHeaderView from "../../components/home/HomeHeaderView";
import { WordCard } from "./word-card";
import { WordCardDetail } from "./word-card-detail";
import { QueuedWord, WordData } from "./type";
import { WordLearningManager } from "./word-manager";
import { WordLearningAlert } from "./word-learning-alert";

const HEADER_HEIGHT = 180;

const fakeWords: WordData[] = [
  {
    id: "1",
    word: "Ephemeral",
    type: "Adjective",
    translation: "Geçici, kısa ömürlü",
    pronunciation: "/əˈfem(ə)rəl/",
    example: "Social media fame is often ephemeral.",
    notes: "Often used in literature and academic writing",
    author: {
      username: "john_doe",
      avatar: "https://picsum.photos/200",
    },
    tags: ["literature", "academic"],
    difficulty: "advanced",
    learned: false,
  },
  {
    id: "2",
    word: "Serendipity",
    type: "Noun",
    translation: "Şans eseri keşif",
    pronunciation: "/ˌserənˈdipədē/",
    example: "Finding this book was pure serendipity.",
    notes: "A happy accident",
    author: {
      username: "jane_smith",
      avatar: "https://picsum.photos/201",
    },
    tags: ["positive", "discovery"],
    difficulty: "intermediate",
    learned: true,
  },
];

export default function HomeView() {
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
  const [learningWord, setLearningWord] = useState<QueuedWord | null>(null);
  const scrollY = new Animated.Value(0);
  const learningManager = React.useRef(new WordLearningManager()).current;

  React.useEffect(() => {
    learningManager.setUpdateCallback(() => {
      const nextWord = learningManager.getNextWord();
      setLearningWord(nextWord);
    });

    return () => learningManager.cleanup();
  }, []);
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );
  const handlePracticeStart = (word) => {
    setSelectedWord(null);
    learningManager.scheduleWord(word);
  };

  const handleLearningComplete = (wordId, remembered) => {
    learningManager.completeWord(wordId, remembered);
    setLearningWord(null);
  };

  return (
    <ThemedView style={styles.container}>
      <HomeHeaderView animValue={scrollY} height={HEADER_HEIGHT} />

      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.cardGrid}>
          {fakeWords.map((wordData) => (
            <WordCard
              key={wordData.id}
              data={wordData}
              onPress={() => setSelectedWord(wordData)}
            />
          ))}
        </View>
      </ScrollView>

      {selectedWord && (
        <WordCardDetail
          data={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}

      {learningWord && (
        <WordLearningAlert
          word={learningWord}
          onComplete={(remembered: boolean) => {
            if (learningWord) {
              handleLearningComplete(learningWord.word.id, remembered);
            }
          }}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: HEADER_HEIGHT,
  },
  scrollContent: {
    padding: 16,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
});
