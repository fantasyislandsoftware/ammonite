import { _12BitColour } from '../../../functions/colour/colour';
import { IScreenColors } from './screenInterface';

const greyRange = (col: 'grey' | 'red' | 'green' | 'blue', count: number) => {
  let range = [];
  for (let i = 0; i < 16; i = i + 16 / count) {
    switch (col) {
      case 'grey':
        range.push(_12BitColour(i, i, i));
        break;
      case 'red':
        range.push(_12BitColour(i, 0, 0));
        break;
      case 'green':
        range.push(_12BitColour(0, i, 0));
        break;
      case 'blue':
        range.push(_12BitColour(0, 0, i));
        break;
    }
  }
  return range;
};

const defaultBackground = _12BitColour(0, 0, 0);
const defaultTitleBar = _12BitColour(15, 15, 15);
const defaultGrey = _12BitColour(10, 10, 10);
const defaultBlue = _12BitColour(6, 8, 11);

const defaultBase16Colors = [
  _12BitColour(0, 0, 0), // 0
  _12BitColour(15, 15, 15), // 1
  _12BitColour(10, 10, 10), // 2
  _12BitColour(6, 8, 11), // 3
  _12BitColour(0, 0, 0), // 4
  _12BitColour(3, 3, 3), // 5
  _12BitColour(8, 8, 8), // 6
  _12BitColour(4, 4, 4), // 7
  _12BitColour(14, 14, 14), // 8
  _12BitColour(2, 2, 2), // 9
  _12BitColour(10, 10, 10), // 10
  _12BitColour(1, 1, 1), // 11
  _12BitColour(13, 13, 13), // 12
  _12BitColour(5, 5, 5), // 13
  _12BitColour(11, 11, 11), // 14
  _12BitColour(0, 15, 0), // 15
  _12BitColour(0, 0, 15), // 16
  _12BitColour(15, 0, 0), // 17
  _12BitColour(15, 15, 0), // 18
  _12BitColour(0, 15, 15), // 19
  _12BitColour(15, 0, 15), // 20
  _12BitColour(0, 0, 15), // 21
  _12BitColour(15, 15, 15), // 22
  _12BitColour(15, 15, 15), // 23
  _12BitColour(15, 15, 15), // 24
  _12BitColour(15, 15, 15), // 25
  _12BitColour(15, 15, 15), // 26
  _12BitColour(15, 15, 15), // 27
  _12BitColour(15, 15, 15), // 28
  _12BitColour(15, 15, 15), // 29
  _12BitColour(15, 15, 15), // 30
  _12BitColour(15, 15, 15), // 31
];

const extraHalfBrightColors = (colors: number[][]) => {
  colors.map((color) => {
    const r = color[0] / 17;
    const g = color[1] / 17;
    const b = color[2] / 17;
    colors.push(_12BitColour(r / 2, g / 2, b / 2));
  });
  return colors;
};

export const generateDefaultColorPalette = (numberOfColors: IScreenColors) => {
  let colors: number[][] = [];
  switch (numberOfColors) {
    case 2:
      colors.push(defaultBackground);
      colors.push(defaultTitleBar);
      break;
    case 4:
      colors.push(defaultBackground);
      colors.push(defaultTitleBar);
      colors.push(defaultGrey);
      colors.push(defaultBlue);
      break;
    case 8:
      colors.push(defaultBackground);
      colors.push(defaultTitleBar);
      colors.push(defaultGrey);
      colors.push(defaultBlue);
      colors.push(_12BitColour(15, 0, 0));
      colors.push(_12BitColour(0, 15, 0));
      colors.push(_12BitColour(0, 0, 15));
      colors.push(_12BitColour(0, 15, 15));
      break;
    case 16:
      colors.push(defaultBackground);
      colors.push(defaultTitleBar);
      colors.push(defaultGrey);
      colors.push(defaultBlue);
      colors.push(...greyRange('red', 4));
      colors.push(...greyRange('green', 4));
      colors.push(...greyRange('blue', 4));
      break;
    case 32:
      colors.push(...greyRange('grey', 8));
      colors.push(...greyRange('red', 8));
      colors.push(...greyRange('green', 8));
      colors.push(...greyRange('blue', 8));
      colors[0] = defaultBackground;
      colors[1] = defaultTitleBar;
      colors[2] = defaultGrey;
      colors[3] = defaultBlue;
      break;
    case 64:
      colors.push(...greyRange('grey', 8));
      colors.push(...greyRange('red', 8));
      colors.push(...greyRange('green', 8));
      colors.push(...greyRange('blue', 8));
      colors[0] = defaultBackground;
      colors[1] = defaultTitleBar;
      colors[2] = defaultGrey;
      colors[3] = defaultBlue;
      colors = extraHalfBrightColors(colors);
      break;
    case 256:
      colors.push(...greyRange('grey', 64));
      colors.push(...greyRange('red', 64));
      colors.push(...greyRange('green', 64));
      colors.push(...greyRange('blue', 64));
      colors[0] = defaultBackground;
      colors[1] = defaultTitleBar;
      colors[2] = defaultGrey;
      colors[3] = defaultBlue;
  }
  return colors;
};
