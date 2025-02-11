export interface Author {
  username: string;
  avatar: string;
}

export interface WordData {
  id: string;
  word: string;
  type: string;
  translation: string;
  pronunciation: string;
  example: string;
  notes: string;
  author: {
    username: string;
    avatar: string;
  };
  tags: string[];
  difficulty: string;
  learned: boolean;
}

export type WordCardProps = {
  data: WordData;
  onPress: () => void;
};

export type WordCardDetailProps = {
  data: WordData;
  onClose: () => void;
};
export interface Author {
  username: string;
  avatar: string;
}

export interface QueuedWord {
  word: any;
  attempt: number;
}
