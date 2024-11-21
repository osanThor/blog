import { create } from "zustand";

type TagStore = {
  open: boolean;
  setOpen: (by: boolean) => void;
};

export const useTagsStore = create<TagStore>((set) => ({
  open: false,
  setOpen: (by) => set(() => ({ open: by })),
}));
