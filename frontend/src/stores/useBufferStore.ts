import { create } from 'zustand';

export interface BufferStore {
  buffer: CanvasRenderingContext2D | null;
  setBuffer: (buffer: CanvasRenderingContext2D | null) => void;
}

export const useBufferStore = create<BufferStore>((set) => ({
  buffer: null,
  setBuffer: (buffer: CanvasRenderingContext2D | null) => {
    set({ buffer });
  },
}));
