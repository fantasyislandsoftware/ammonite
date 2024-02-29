import { getTextInfo } from 'functions/graphics';
import { IScreen } from 'interface/screen';

export interface IScreenContainerCalc {
  titleBar: {
    width: number;
    height: number;
  };
  client: {
    y: number;
    height: number;
  };
}

export const screenContainerCalc = (screen: IScreen) => {
  const { titleBar } = screen;
  if (titleBar === null)
    return {
      titleBar: {
        width: 0,
        height: 0,
      },
      client: {
        y: 0,
        height: screen.height,
      },
    };

  const textInfo = getTextInfo(
    titleBar.title,
    `${titleBar.font.size}px ${titleBar.font.name}`
  );
  return {
    titleBar: {
      width: textInfo.width,
      height: textInfo.height,
    },
    client: {
      y: textInfo.height,
      height: screen.height - textInfo.height,
    },
  };
};
