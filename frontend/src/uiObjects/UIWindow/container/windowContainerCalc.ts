import { getTextInfo } from 'functions/graphics';
import { IWindow } from 'UIObjects/UIWindow/windowInterface';

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
    `${titleBar.font.size}px ${titleBar.font.name}`
  );
  const barHeight = textInfo.height;
  return {
    titleBar: {
      width: barWidth,
      height: barHeight,
    },
  };
};
