//import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { create } from 'zustand';

interface SelectedScreen {
  id: string;
  offset: { y: number };
}

export interface ScreenStore {
  screens: IScreen[];
  setScreens: (screens: IScreen[]) => void;
  selectedScreen: SelectedScreen | undefined;
  setSelectedScreen: (selectedScreen: SelectedScreen | undefined) => void;
}

export const useScreenStore = create<ScreenStore>((set) => ({
  screens: [],
  setScreens: (screens: IScreen[]) => {
    set({ screens });
  },
  nextAvailableScreenId: 0,
  selectedScreen: undefined,
  setSelectedScreen: (selectedScreen: SelectedScreen | undefined) => {
    set({ selectedScreen });
  },
}));
