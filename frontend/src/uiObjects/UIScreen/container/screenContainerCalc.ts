import { getTextInfo } from 'functions/graphics';
import { IScreen } from 'interface/screen';

export interface IScreenContainerCalc {
  titleBar: {
    width: number;
    height: number;
  };
}

export const screenContainerCalc = (screen: IScreen) => {
  const { titleBar } = screen;
  if (titleBar === null) return null;
  const textInfo = getTextInfo(
    titleBar.title,
    `${titleBar.font.size}px ${titleBar.font.name}`
  );
  return {
    titleBar: {
      width: textInfo.width,
      height: textInfo.height,
    },
  };
};
