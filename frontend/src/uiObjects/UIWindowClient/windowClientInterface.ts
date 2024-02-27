import { EnumMouseButton } from 'functions/mouse';

export interface IWindowClientEvent {
  x: number;
  y: number;
  button: EnumMouseButton;
  type: any;
}
