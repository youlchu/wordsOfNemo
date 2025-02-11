import { QueuedWord, WordData } from "./type";

export class WordLearningManager {
  private learningQueue: Map<string, QueuedWord>;
  private timeouts: Map<string, NodeJS.Timeout[]>;
  private onQueueUpdate?: () => void;
  private words: WordData[];

  constructor() {
    this.learningQueue = new Map();
    this.timeouts = new Map();
    this.words = [];
  }

  scheduleWord(word: WordData): void {
    const intervals = [60000, 300000, 420000]; // 1min, 5min, 7min in milliseconds

    if (this.timeouts.has(word.id)) {
      this.timeouts.get(word.id)?.forEach((timeout) => clearTimeout(timeout));
    }

    const wordTimeouts = intervals.map((delay, index) => {
      return setTimeout(() => {
        this.learningQueue.set(word.id, {
          word,
          attempt: index + 1,
        });
        this.onQueueUpdate?.();
      }, delay);
    });

    this.timeouts.set(word.id, wordTimeouts);
  }

  getNextWord(): QueuedWord | null {
    if (this.learningQueue.size === 0) return null;
    return Array.from(this.learningQueue.values())[0];
  }

  completeWord(wordId: string, remembered: boolean): void {
    this.learningQueue.delete(wordId);
    if (!remembered) {
      const word = this.words.find((w) => w.id === wordId);
      if (word) {
        this.scheduleWord(word);
      }
    }
    this.onQueueUpdate?.();
  }

  setUpdateCallback(callback: () => void): void {
    this.onQueueUpdate = callback;
  }

  cleanup(): void {
    this.timeouts.forEach((timeouts) => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    });
    this.timeouts.clear();
    this.learningQueue.clear();
  }
}
