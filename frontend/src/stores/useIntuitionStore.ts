import { IBrush } from '../interface/graphics';
import { create } from 'zustand';

export interface IntuitionStore {
  guiIcons: IBrush[];
  setGuiIcons: (icons: IBrush[]) => void;
  selectedButtonId: string;
  setSelectedButtonId: (id: string) => void;
}

export const useIntuitionStore = create<IntuitionStore>((set) => ({
  guiIcons: [],
  setGuiIcons: (guiIcons: IBrush[]) => {
    set({ guiIcons });
  },
  selectedButtonId: '',
  setSelectedButtonId: (selectedButtonId: string) => {
    set({ selectedButtonId });
  },
}));
