// @ts-nocheck
import create from "zustand";
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
export type CharacterStore = {
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

// Create the QuizScoreStore with persistence
export const useQuizStore = create<QuizScoreStore>(
  persist(
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
      name: "quiz-score-store", // Name of your store in the storage
      getStorage: () => localStorage, // Specify the storage type
    }
  )
);

// Create the CharacterStore with persistence
export const useCharacterStore = create<CharacterStore>(
  persist(
    (set) => ({
      selectedImagePath: "",
      setSelectedImagePath: (imagePath: string) =>
        set({ selectedImagePath: imagePath }),
    }),
    {
      name: "character-store",
      getStorage: () => localStorage,
    }
  )
);

// Create the LocationStore with persistence
export const useLocationStore = create<LocationStore>(
  persist(
    (set) => ({
      id: 0,
      name: "",
      setLocation: (id, name) => set({ id, name }),
    }),
    {
      name: "location-store",
      getStorage: () => localStorage,
    }
  )
);

// Create the BadgeStore with persistence
export const useBadgeStore = create<BadgeStore>(
  persist(
    (set) => ({
      badges: [],
      addBadge: (badge: string) =>
        set((state) => ({ badges: [...state.badges, badge] })),
    }),
    {
      name: "badge-store",
      getStorage: () => localStorage,
    }
  )
);
