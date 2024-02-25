import { create } from "zustand";

type QuizScoreStore = {
  count: number;
  increment: () => void;
};

export const useQuizStore = create<QuizScoreStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
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
