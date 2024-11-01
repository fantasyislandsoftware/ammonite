import { create } from 'zustand';

interface ISystemCrash {
  state: boolean;
  message: string;
}

export interface ErrorStore {
  systemCrash: ISystemCrash;
  setSystemCrash: (systemCrash: ISystemCrash) => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  systemCrash: {
    state: false,
    message: '',
  },
  setSystemCrash: (systemCrash: ISystemCrash) => {
    set({ systemCrash });
  },
}));
