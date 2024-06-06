// @ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";

const CONFIG_ENCRYPT_STORES = false;

// Helper methods for serialization and deserialization
const StoreUtils = {
  serializeStore: (
    value: { version: number; state: LooseObject },
    encrypt: boolean
  ) => {
    let storeState;
    if (encrypt) {
      storeState = {
        version: value.version,
        state: AppLowLevelUtils.encrypt(JSON.stringify(value.state)),
      };
    } else {
      storeState = value;
    }
    return JSON.stringify(storeState);
  },
  deserializeStore: (str: string, encrypted: boolean) => {
    const parsed = JSON.parse(str);
    if (encrypted) {
      parsed.state = JSON.parse(AppLowLevelUtils.decrypt(parsed.state));
    }
    return parsed;
  },
};

// Custom storage object
const storage = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item
      ? StoreUtils.deserializeStore(item, CONFIG_ENCRYPT_STORES)
      : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(
      name,
      StoreUtils.serializeStore(value, CONFIG_ENCRYPT_STORES)
    );
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

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
      name: "quiz-score-store",
      storage,
      version: 1,
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
      storage,
      version: 1,
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
      storage,
      version: 1,
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
      storage,
      version: 1,
    }
  )
);
