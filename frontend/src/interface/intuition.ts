import { EnumButtonFunction } from './icon';

export interface IButton {
  id: string;
  name: EnumButtonFunction;
  imageIndex: number[];
  currentImageIndex: number;
  boundBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
