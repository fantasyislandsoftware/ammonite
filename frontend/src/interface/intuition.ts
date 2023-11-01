export interface IIcon {
  id: string;
  imageIndex: number[];
  currentImageIndex: number;
  boundBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
