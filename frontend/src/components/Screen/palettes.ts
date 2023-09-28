import { _12BitColour } from '../../handlers/colour';

const defaultBase4Colors = [
  _12BitColour(0, 0, 0),
  _12BitColour(15, 15, 15),
  _12BitColour(9, 9, 9),
];

export const generateDefaultColorPalette = (numberOfColors: number) => {
  const colors = [];
  for (let i = 0; i < numberOfColors; i++) {
    if (defaultBase4Colors[i]) {
      colors.push(defaultBase4Colors[i]);
    } else {
      colors.push(_12BitColour(0, 0, 0));
    }
  }
  return colors;
};
