import { IClientMouse, IScreenMouse } from 'functions/mouse';

export interface IOSEvent {
  object:
    | OSEventBackdrop
    | OSEventScreen
    | OSEventScreenClient
    | OSEventScreenTitlebar;
  parent:
    | OSEventBackdrop
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
  Backdrop = 'backdrop',
  Screen = 'screen',
  Window = 'window',
  ScreenTitlebar = 'screenTitlebar',
  ScreenClient = 'screenClient',
  Client = 'client',
  Icon = 'icon',
}

export interface OSEventBackdrop {
  type: EnumOSEventObjectType;
  id?: number;
  screenMouse?: IScreenMouse;
  clientMouse: IClientMouse;
}

export interface OSEventScreen {
  type: EnumOSEventObjectType;
  id: number;
  screenMouse: IScreenMouse;
  clientMouse: IClientMouse;
}

export interface OSEventScreenClient {
  id?: number;
  type: EnumOSEventObjectType;
  screenMouse: IScreenMouse;
  clientMouse: IClientMouse;
}

export interface OSEventScreenTitlebar {
  id?: number;
  type: EnumOSEventObjectType;
  screenMouse: IScreenMouse;
  clientMouse: IClientMouse;
}
