import { create } from 'zustand';
import { IScreen } from './interface';
import { defaultScreen } from './defaults';
import { interlaced } from './screenModes';
import { interlacedScreen, lowResScreen, medResScreen } from './mock';

type DragScreen =
  | {
      id: number;
      offset: { y: number };
    }
  | undefined;

export interface ScreenStore {
  screens: IScreen[];
  setScreens: (screens: IScreen[]) => void;
  nextAvailableScreenId: number;
  incAvailableScreenId: () => void;
  dragScreen: DragScreen;
  setDragScreen: (dragScreen: DragScreen) => void;
}

export const useScreenStore = create<ScreenStore>((set) => ({
  screens: [defaultScreen, lowResScreen, medResScreen, interlacedScreen],
  setScreens: (screens) => {
    set({ screens });
  },
  nextAvailableScreenId: 0,
  incAvailableScreenId: () => {
    set((state) => ({
      nextAvailableScreenId: state.nextAvailableScreenId + 1,
    }));
  },
  dragScreen: undefined,
  setDragScreen: (dragScreen) => {
    set({ dragScreen });
  },
}));
