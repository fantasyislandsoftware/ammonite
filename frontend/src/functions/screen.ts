import { IScreen } from '../Objects/UIScreen/screenInterface';
import { useScreenStore } from 'stores/useScreenStore';

export const screenIdToIndex = (id: string | undefined): number | undefined => {
  const { screens } = useScreenStore.getState();
  let result;
  screens.map((screen: IScreen, index: number) => {
    if (screen.id === id) result = index;
  });
  return result;
};

export const getHighestScreenZIndex = () => {
  const { screens } = useScreenStore.getState();
  return Math.max.apply(
    null,
    screens.map((v) => v.zIndex)
  );
};

export const getLowestScreenZIndex = () => {
  const { screens } = useScreenStore.getState();
  return Math.min.apply(
    null,
    screens.map((v) => v.zIndex)
  );
};

export const setScreen = (_screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  screens.map((screen, index) => {
    if (screen.id === _screen.id) {
      screens[index] = _screen;
    }
  });
  setScreens(screens);
};
