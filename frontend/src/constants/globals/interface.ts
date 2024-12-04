import { IEvent } from 'functions/events/IEvents';
import { IClientMouse } from 'functions/mouse/IMouse';
import { EWindowState } from 'Objects/UIWindow/_props/windowInterface';

export interface Environment {
  consoleEvents: boolean;
  showEventModal: boolean;
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

export enum EEventState {
  RUNNING = 'running',
  STOPPED = 'stopped',
}
export interface IState {
  events: IEvent[];
  eventState: EEventState;
  clientMouse: IClientMouse;
  dragScreen: IScreenDrag | undefined;
  prevDragScreen: string | undefined;
  buttonDownId: string | undefined;
  currentScreenId: string | undefined;
  screenChangeMode: EnumScreenChangeMode;
  dragWindow: IScreenClientDrag | undefined;
  screenClientMouse: IClientMouse;
  windowState: {
    [key: string]: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
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
