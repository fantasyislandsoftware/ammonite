import { EnumScreenModeType, IScreenMode } from './screenInterface';

export const low: IScreenMode = {
  type: EnumScreenModeType.CLASSIC,
  viewPort: {
    width: 320,
    height: 256,
  },
  verticalStretchRatio: 4,
  bitDepth: 12,
  maxColors: 32,
};

export const med: IScreenMode = {
  type: EnumScreenModeType.CLASSIC,
  viewPort: {
    width: 640,
    height: 256,
  },
  verticalStretchRatio: 8,
  bitDepth: 12,
  maxColors: 16,
};

export const interlaced: IScreenMode = {
  type: EnumScreenModeType.CLASSIC,
  viewPort: {
    width: 320,
    height: 512,
  },
  verticalStretchRatio: 4,
  bitDepth: 12,
  maxColors: 16,
};

export const hi: IScreenMode = {
  type: EnumScreenModeType.CLASSIC,
  viewPort: {
    width: 640,
    height: 512,
  },
  verticalStretchRatio: 8,
  bitDepth: 12,
  maxColors: 16,
};

export const full: IScreenMode = {
  type: EnumScreenModeType.CLIENT,
  viewPort: {
    width: 640,
    height: 512,
  },
  verticalStretchRatio: 8,
  bitDepth: 12,
  maxColors: 16,
};
