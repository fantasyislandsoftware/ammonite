import { _12BitColour } from '../../functions/colour';

const defaultBase16Colors = [
  _12BitColour(0, 0, 0),
  _12BitColour(15, 15, 15),
  _12BitColour(10, 10, 10),
  _12BitColour(6, 8, 11),
  _12BitColour(0, 0, 0),
  _12BitColour(3, 3, 3),
  _12BitColour(8, 8, 8),
  _12BitColour(4, 4, 4),
  _12BitColour(14, 14, 14),
  _12BitColour(2, 2, 2),
  _12BitColour(10, 10, 10),
  _12BitColour(1, 1, 1),
  _12BitColour(13, 13, 13),
  _12BitColour(5, 5, 5),
  _12BitColour(11, 11, 11),
  _12BitColour(0, 15, 0),
];

export const generateDefaultColorPalette = (numberOfColors: number) => {
  /*const colors = [];
  for (let i = 0; i < numberOfColors; i++) {
    if (defaultBase4Colors[i]) {
      colors.push(defaultBase4Colors[i]);
    } else {
      colors.push(_12BitColour(0, 0, 0));
    }
  }*/
  return defaultBase16Colors;
};
