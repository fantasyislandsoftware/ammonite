import { IPixelArray } from 'functions/graphics/IGraphics';
import { create } from 'zustand';

export interface IconStore {
  icons: IPixelArray[];
  setIcons: (icons: IPixelArray[]) => void;
}

export const useIconStore = create<IconStore>((set) => ({
  icons: [],
  setIcons: (icons: IPixelArray[]) => {
    set({ icons });
  },
}));
