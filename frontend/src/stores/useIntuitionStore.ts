import { IBrush } from 'interface/graphics';
import { create } from 'zustand';

export interface IntuitionStore {
  guiIcons: IBrush[];
  setGuiIcons: (icons: IBrush[]) => void;
}

export const useIntuitionStore = create<IntuitionStore>((set) => ({
  guiIcons: [],
  setGuiIcons: (guiIcons: IBrush[]) => {
    set({ guiIcons });
  },
}));
