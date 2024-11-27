import { EnumScreenChangeMode, IState } from './interface';

export const STATE: IState = {
  events: [],
  clientMouse: { x: 0, y: 0 },
  dragScreen: undefined,
  prevDragScreen: undefined,
  buttonDownId: undefined,
  currentScreenId: undefined,
  screenChangeMode: EnumScreenChangeMode.DONE,
  dragWindow: undefined,
  screenClientMouse: { x: 0, y: 0 },
  windowState: {},
};
