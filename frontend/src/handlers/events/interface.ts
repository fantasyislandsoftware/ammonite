import { IMouse } from 'handlers/mouse';

export interface IOSEvent {
  object: OSEventScreen | OSEventScreenClient | OSEventScreenTitlebar;
  parent:
    | OSEventScreen
    | OSEventScreenClient
    | OSEventScreenTitlebar
    | undefined;
  eventType: EnumOSEventType;
}

export enum EnumOSEventType {
  MouseClick = 'mouseclick',
  MouseDown = 'mousedown',
  MouseUp = 'mouseup',
  MouseMove = 'mousemove',
  MouseLeave = 'mouseleave',
}

export enum EnumMouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}

export enum EnumOSEventObjectType {
  Screen = 'screen',
  Window = 'window',
  ScreenTitlebar = 'screenTitlebar',
  ScreenClient = 'screenClient',
  Client = 'client',
  Icon = 'icon',
}

export interface OSEventScreen {
  type: EnumOSEventObjectType;
  id: number;
  mouse: IMouse;
}

export interface OSEventScreenClient {
  id?: number;
  type: EnumOSEventObjectType;
  mouse: IMouse;
}

export interface OSEventScreenTitlebar {
  id?: number;
  type: EnumOSEventObjectType;
  mouse: IMouse;
}
