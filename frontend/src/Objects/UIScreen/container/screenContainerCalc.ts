import { getTextInfo } from 'functions/graphics';
import { IScreen } from '../screenInterface';
import { useFontStore } from 'stores/useFontStore';

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
  const { fonts } = useFontStore.getState();
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
    titleBar.font.name,
    titleBar.font.size + 2
  );

  const font: any =
    fonts[screen.titleBar?.font.name as any][screen.titleBar?.font.size as any];

  return {
    titleBar: {
      width: textInfo.width,
      height: font.height,
    },
    client: {
      y: textInfo.height,
      height: screen.height - textInfo.height,
    },
  };
};
