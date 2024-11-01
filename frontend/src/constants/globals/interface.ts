import { IEvent } from 'functions/events/IEvents';
import { IClientMouse } from 'functions/mouse/IMouse';

export interface Environment {
  eventDebug: boolean;
  api: string;
  baseDir: string;
}

export interface IScreenDrag {
  id: string;
  offset: {
    x: number;
    y: number;
  };
}

export interface IScreenClientDrag {
  screenId: string;
  windowId: string;
  offset: {
    x: number;
    y: number;
  };
}

export interface IState {
  events: IEvent[];
  clientMouse: IClientMouse;
  dragScreen: IScreenDrag | undefined;
  prevDragScreen: string | undefined;
  buttonDownId: string | undefined;
  currentScreenId: string | undefined;
  screenChangeMode: EnumScreenChangeMode;
  dragWindow: IScreenClientDrag | undefined;
  screenClientMouse: IClientMouse;
}

export enum EnumScreenChangeMode {
  DONE = 'done',
  CHANGING = 'changing',
}

export interface ISYSTEM {
  memory: IDeviceMemory;
  heartbeat: NodeJS.Timeout | null;
}

export interface IDeviceMemory {
  total: number;
  free: number;
}
