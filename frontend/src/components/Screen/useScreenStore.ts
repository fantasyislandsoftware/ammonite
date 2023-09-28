import { create } from 'zustand';
import { IScreen } from './interface';
import { backdropScreen, defaultScreen } from './defaults';

interface SelectedScreen {
  id: number;
  offset: { y: number };
}

export interface ScreenStore {
  screens: IScreen[];
  setScreens: (screens: IScreen[]) => void;
  nextAvailableScreenId: number;
  incAvailableScreenId: () => void;
  selectedScreen: SelectedScreen | undefined;
  setSelectedScreen: (selectedScreen: SelectedScreen | undefined) => void;
}

export const useScreenStore = create<ScreenStore>((set) => ({
  screens: [backdropScreen, defaultScreen],
  setScreens: (screens: IScreen[]) => {
    set({ screens });
  },
  nextAvailableScreenId: 0,
  incAvailableScreenId: () => {
    set((state: { nextAvailableScreenId: number }) => ({
      nextAvailableScreenId: state.nextAvailableScreenId + 1,
    }));
  },
  selectedScreen: undefined,
  setSelectedScreen: (selectedScreen: SelectedScreen | undefined) => {
    set({ selectedScreen });
  },
}));
