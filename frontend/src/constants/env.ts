import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IClientMouse } from 'functions/mouse';
import { IEvent } from 'interface/event';

interface Environment {
  eventDebug: boolean;
  api: string;
  baseDir: string;
  events: IEvent[];
  clientMouse: IClientMouse;
  screens: IScreen[];
}

export const ENV: Environment = {
  eventDebug: false,
  api: 'http://localhost:1234',
  baseDir: '/home/node/app/src/',
  events: [],
  clientMouse: { x: 0, y: 0 },
  screens: [],
};
