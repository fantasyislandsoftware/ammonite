import { IClientMouse, IScreenMouse } from 'functions/mouse';
import { IScreenTitleBarIcon } from './screen';

export type OSEvent = any;

export interface IOSEvent {
  object:
    | OSEventViewport
    | OSEventBackdrop
    | OSEventScreen
    | OSEventScreenClient
    | OSEventScreenTitlebar
    | OSEventScreenTitlebarIcon;

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
  MouseExit = 'mouseexit',
}

export enum EnumMouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}

export enum EnumOSEventObjectType {
  Viewport = 'viewport',
  Backdrop = 'backdrop',
  Screen = 'screen',
  Window = 'window',
  ScreenTitlebar = 'screenTitlebar',
  ScreenTitlebarIcon = 'screenTitlebarIcon',
  ScreenClient = 'screenClient',
  Client = 'client',
  Icon = 'icon',
}

export interface OSEventViewport {
  type: EnumOSEventObjectType;
  id?: number;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IScreenTitleBarIcon;
}

export interface OSEventBackdrop {
  type: EnumOSEventObjectType;
  id?: number;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IScreenTitleBarIcon;
}

export interface OSEventScreen {
  type: EnumOSEventObjectType;
  id: number;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IScreenTitleBarIcon;
}

export interface OSEventScreenClient {
  id?: number;
  type: EnumOSEventObjectType;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IScreenTitleBarIcon;
}

export interface OSEventScreenTitlebar {
  id?: number;
  type: EnumOSEventObjectType;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IScreenTitleBarIcon;
}

export interface OSEventScreenTitlebarIcon {
  id?: number;
  type: EnumOSEventObjectType;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IScreenTitleBarIcon;
}
