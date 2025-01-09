import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TagStore = {
  open: boolean;
  setOpen: (by: boolean) => void;
};

export const useTagsStore = create(
  persist<TagStore>(
    (set) => ({
      open: false,
      setOpen: (by) => set(() => ({ open: by })),
    }),
    {
      name: "tag-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
