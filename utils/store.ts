import { create } from "zustand";

type QuizScoreStore = {
  count: number;
  increment: () => void;
  totalQuestions: number;
  setTotalQuestions: (totalQuestions: number) => void;
  passingScore?: number;
};

export const useQuizStore = create<QuizScoreStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  totalQuestions: 10,
  setTotalQuestions: (totalQuestions) => {
    set({ totalQuestions });
  },
  passingScore: 7,
  setPassingScore: (passingScore: number) => {
    set({ passingScore });
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

type AdventureStore = {
  adventure: string;
  setAdventure: (adventure: string) => void;
};
