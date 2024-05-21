import { IClientMouse } from 'functions/mouse';
import { IEvent } from 'interface/event';

interface Environment {
  eventDebug: boolean;
  api: string;
  baseDir: string;
}

export const ENV: Environment = {
  eventDebug: false,
  api: 'http://localhost:1234',
  baseDir: '/home/node/app/src/',
};

interface IState {
  events: IEvent[];
  clientMouse: IClientMouse;
  dragScreen:
    | {
        id: string;
        offset: {
          y: number;
        };
      }
    | undefined;
  prevDragScreen: string | undefined;
  buttonDownId: string | undefined;
  currentScreenId: string | undefined;
  test: any;
  canReorder: boolean;
}

export const STATE: IState = {
  events: [],
  clientMouse: { x: 0, y: 0 },
  dragScreen: undefined,
  prevDragScreen: undefined,
  buttonDownId: undefined,
  currentScreenId: undefined,
  test: null,
  canReorder: true,
};
