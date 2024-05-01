import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IClientMouse, IScreenMouse } from '../functions/mouse';
import { IButton } from '../Objects/UIButton/props/buttonInterface';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';

export interface IBaseEvent {
  type: string;
  target: any;
  detail: number;
  button: number;
  persist?: () => void;
}

export interface IEvent {
  objectType: EnumOSEventObjectType;
  event: IBaseEvent;
  screen?: IScreen;
  window?: IWindow;
  button?: IButton;
}

export enum EnumOSEventType {
  None = 'none',
  MouseClick = 'mouseclick',
  MouseDown = 'mousedown',
  MouseUp = 'mouseup',
  MouseMove = 'mousemove',
  MouseLeave = 'mouseleave',
  MouseExit = 'mouseexit',
  MouseDoubleClick = 'mousedoubleclick',
}

export enum EnumMouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}

export enum EnumOSEventObjectType {
  Base = 'base',
  Viewport = 'viewport',
  Backdrop = 'backdrop',
  Screen = 'screen',
  Window = 'window',
  ScreenTitleBar = 'screenTitleBar',
  ScreenTitleBarIcon = 'screenTitleBarIcon',
  ScreenClient = 'screenClient',
  Client = 'client',
  Icon = 'icon',
  Button = 'button',
}

export interface OSEventViewport {
  type: EnumOSEventObjectType;
  id?: number;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IButton;
}

export interface OSEventBackdrop {
  type: EnumOSEventObjectType;
  id?: number;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IButton;
}

export interface OSEventScreen {
  type: EnumOSEventObjectType;
  id: number;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IButton;
}

export interface OSEventScreenClient {
  id?: number;
  type: EnumOSEventObjectType;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IButton;
}

export interface OSEventScreentitleBar {
  id?: number;
  type: EnumOSEventObjectType;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IButton;
}

export interface OSEventScreentitleBarIcon {
  id?: number;
  type: EnumOSEventObjectType;
  screenMouse?: IScreenMouse;
  clientMouse?: IClientMouse;
  icon?: IButton;
}
