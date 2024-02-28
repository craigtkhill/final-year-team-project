import { create } from "zustand";

export type QuizScoreStore = {
  count: number;
  increment: () => void;
  totalQuestions: number;
  passingScore?: number;
  dynamicDifficulty: boolean;
  setDynamicDifficulty: (dynamicDifficulty: boolean) => void;
};

export const useQuizStore = create<QuizScoreStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  totalQuestions: 10,
  passingScore: 7,
  dynamicDifficulty: false,
  setDynamicDifficulty: (dynamicDifficulty: boolean) => {
    set({ dynamicDifficulty });
  },
}));

type CharacterStore = {
  selectedImagePath: string;
  setSelectedImagePath: (imagePath: string) => void;
};

export const useCharacterStore = create<CharacterStore>((set) => ({
  selectedImagePath: "",
  setSelectedImagePath: (imagePath) => {
    set({ selectedImagePath: imagePath });
    console.log("Selected image path: ", imagePath);
  },
}));

export type LocationStore = {
  id: number;
  name: string;
  setLocation: (id: number, name: string) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  id: 0,
  name: "",
  setLocation: (id, name) => {
    set({ id, name });
  },
}));

export type BadgeStore = {
  badges: string[];
  addBadge: (badge: string) => void;
};

export const useBadgeStore = create<BadgeStore>((set) => ({
  badges: [],
  addBadge: (badge: string) =>
    set((state) => ({ badges: [...state.badges, badge] })),
}));
