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
  canReorder: boolean;
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
