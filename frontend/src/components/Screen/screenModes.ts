import { EnumScreenModeType, IScreenMode } from './interface';

export const low: IScreenMode = {
  type: EnumScreenModeType.CLASSIC,
  maxWidth: 320,
  maxHeight: 256,
  verticalStretchRatio: 4,
  bitDepth: 12,
  maxColors: 32,
};

export const med: IScreenMode = {
  type: EnumScreenModeType.CLASSIC,
  maxWidth: 640,
  maxHeight: 256,
  verticalStretchRatio: 8,
  bitDepth: 12,
  maxColors: 16,
};

export const interlaced: IScreenMode = {
  type: EnumScreenModeType.CLASSIC,
  maxWidth: 320,
  maxHeight: 512,
  verticalStretchRatio: 4,
  bitDepth: 12,
  maxColors: 16,
};

export const hi: IScreenMode = {
  type: EnumScreenModeType.CLASSIC,
  maxWidth: 640,
  maxHeight: 512,
  verticalStretchRatio: 8,
  bitDepth: 12,
  maxColors: 16,
};

export const full: IScreenMode = {
  type: EnumScreenModeType.CLIENT,
  maxWidth: 640,
  maxHeight: 512,
  verticalStretchRatio: 8,
  bitDepth: 12,
  maxColors: 16,
};
