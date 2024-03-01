import { IClientMouse } from 'functions/mouse';
import { setScreen } from 'functions/screen';
import { useScreenStore } from 'stores/useScreenStore';
import { IScreen } from '../screenInterface';

export const screenContainerDrag = (clientMouse: IClientMouse) => {
  const { selectedScreen, screens } = useScreenStore.getState();
  if (!selectedScreen) return;
  const selected = screens[selectedScreen.id];
  let newPos = clientMouse.y - selectedScreen.offset.y;
  if (newPos < 0) newPos = 0;
  selected.position = { y: newPos, z: 0 };
  setScreen(selected);
};

export const screenContainerSetYToTop = (screen: IScreen) => {
  screen.position.y = 0;
  setScreen(screen);
};
