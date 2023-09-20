import { IScreenMode } from './interface';

export const low: IScreenMode = {
  width: 320,
  height: 240,
  bitDepth: 12,
  maxColors: 32,
};

export const med: IScreenMode = {
  width: 640,
  height: 240,
  bitDepth: 12,
  maxColors: 16,
};

export const interlaced: IScreenMode = {
  width: 320,
  height: 512,
  bitDepth: 12,
  maxColors: 16,
};
