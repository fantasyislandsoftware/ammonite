import { create } from 'zustand';

export interface Font {
  [name: string]: { top: number; height: number }[];
}

export interface FontStore {
  fonts: Font[];
  setFonts: (fonts: Font[]) => void;
}

export const useFontStore = create<FontStore>((set) => ({
  fonts: [],
  setFonts: (fonts: Font[]) => {
    set({ fonts });
  },
}));
