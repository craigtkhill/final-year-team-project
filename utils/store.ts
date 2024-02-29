import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

// Define the QuizScoreStore type
export type QuizScoreStore = {
  count: number;
  increment: () => void;
  totalQuestions: number;
  passingScore?: number;
  dynamicDifficulty: boolean;
  setDynamicDifficulty: (dynamicDifficulty: boolean) => void;
};

// Define the CharacterStore type
type CharacterStore = {
  selectedImagePath: string;
  setSelectedImagePath: (imagePath: string) => void;
};

// Define the LocationStore type
export type LocationStore = {
  id: number;
  name: string;
  setLocation: (id: number, name: string) => void;
};

// Define the BadgeStore type
export type BadgeStore = {
  badges: string[];
  addBadge: (badge: string) => void;
};

// Helper function to apply TypeScript workaround for Zustand stores using persist
function createStoreWithPersist<TState>(
  config: StateCreator<TState, [], [["zustand/persist", unknown]]>,
  options: Parameters<typeof persist>[1]
): TState {
  return create(persist(config, options)) as unknown as TState;
}

// Create the QuizScoreStore with persistence
export const useQuizStore = createStoreWithPersist<QuizScoreStore>(
  (set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    totalQuestions: 15,
    passingScore: 10,
    dynamicDifficulty: false,
    setDynamicDifficulty: (dynamicDifficulty: boolean) =>
      set({ dynamicDifficulty }),
  }),
  {
    name: "quiz-score-store",
    getStorage: () => localStorage,
  }
);

// Create the CharacterStore with persistence
export const useCharacterStore = createStoreWithPersist<CharacterStore>(
  (set) => ({
    selectedImagePath: "",
    setSelectedImagePath: (imagePath: string) =>
      set({ selectedImagePath: imagePath }),
  }),
  {
    name: "character-store",
    getStorage: () => localStorage,
  }
);

// Create the LocationStore with persistence
export const useLocationStore = createStoreWithPersist<LocationStore>(
  (set) => ({
    id: 0,
    name: "",
    setLocation: (id, name) => set({ id, name }),
  }),
  {
    name: "location-store",
    getStorage: () => localStorage,
  }
);

// Create the BadgeStore with persistence
export const useBadgeStore = createStoreWithPersist<BadgeStore>(
  (set) => ({
    badges: [],
    addBadge: (badge: string) =>
      set((state) => ({ badges: [...state.badges, badge] })),
  }),
  {
    name: "badge-store",
    getStorage: () => localStorage,
  }
);
