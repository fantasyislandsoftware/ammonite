import { useScreenStore } from 'stores/useScreenStore';
import { setScreen } from '../_props/screenFunctions';
import { STATE } from 'constants/globals/state';
import { JAM_SCREEN } from 'api/os/api/jam/screen';

const jam_screen = new JAM_SCREEN();

export const screenContainerDrag = async () => {
  const { screens } = useScreenStore.getState();

  if (STATE.dragScreen === undefined) return;
  const screenIndex = await jam_screen.findScreenIndex(null, {
    screenId: STATE.dragScreen.id,
  });
  const selected = screens[screenIndex];
  let newPos = STATE.clientMouse.y - STATE.dragScreen.offset.y;
  if (newPos < 0) newPos = 0;
  selected.position = { y: newPos, z: 0 };
  setScreen(selected);
};
