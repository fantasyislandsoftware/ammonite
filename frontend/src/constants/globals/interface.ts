import { IClientMouse } from 'functions/mouse';
import { IEvent } from 'interface/event';

export interface Environment {
  eventDebug: boolean;
  api: string;
  baseDir: string;
}

export interface IState {
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
  screenChangeMode: EnumScreenChangeMode;
}

export enum EnumScreenChangeMode {
  DONE = 'done',
  CHANGING = 'changing',
}

export interface INetwork {
  socket: any;
}

export interface ISYSTEM {
  memory: IDeviceMemory;
}

export interface IDeviceMemory {
  total: number;
  free: number;
}
