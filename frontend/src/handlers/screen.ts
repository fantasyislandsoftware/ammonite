import { IScreen } from 'components/Screen/interface';
import { useScreenStore } from '../components/Screen/useScreenStore';

export const screenIdToIndex = (id: number): number | undefined => {
  const { screens } = useScreenStore.getState();
  let result;
  screens.map((screen: IScreen, index: number) => {
    if (screen.id === id) result = index;
  });
  return result;
};
