import { create } from "zustand";

type QuizScore = {
  count: number;
  increment: () => void;
};

export const useQuizStore = create<QuizScore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

type Character = {
  id: number;
};

export const useCharacterStore = create<Character>((set) => ({
  id: 0,
}));

type Location = {
  id: number;
  name: string;
};

export const useLocationStore = create<Location>((set) => ({
  id: 0,
  name: "",
}));
