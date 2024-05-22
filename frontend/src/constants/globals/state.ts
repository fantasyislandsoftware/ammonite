import { IState } from './interface';

export const STATE: IState = {
  events: [],
  clientMouse: { x: 0, y: 0 },
  dragScreen: undefined,
  prevDragScreen: undefined,
  buttonDownId: undefined,
  currentScreenId: undefined,
  canReorder: true,
  memory: {
    total: 0,
    free: 0,
  },
};
