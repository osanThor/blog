import { create } from "zustand";

type WidowStore = {
  scrollY: number;
  setScrollY: (by: number) => void;
};

export const useWidowStore = create<WidowStore>((set) => ({
  scrollY: 0,
  setScrollY: (by) => set(() => ({ scrollY: by })),
}));
