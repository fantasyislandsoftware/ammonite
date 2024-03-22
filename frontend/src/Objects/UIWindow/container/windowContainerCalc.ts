import { getTextInfo } from 'functions/graphics';
import { IWindow } from 'Objects/UIWindow/windowInterface';
import { useFontStore } from 'stores/useFontStore';

export interface IWindowContainerCalc {
  titleBar: {
    width: number;
    height: number;
  };
}

export const windowContainerCalc = (window: IWindow) => {
  const { width, height, titleBar, position, borderThickness } = window;
  const barWidth = width - borderThickness * 2;
  const textInfo = getTextInfo(
    titleBar.title,
    titleBar.font.name,
    titleBar.font.size
  );

  const { fonts } = useFontStore.getState();

  const font: any =
    fonts[window.titleBar.font.name as any][window.titleBar?.font.size as any];

  return {
    titleBar: {
      width: textInfo.width,
      height: font.height,
    },
  };
};
