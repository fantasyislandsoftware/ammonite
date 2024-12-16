import { _12BitColour } from '../../../functions/colour/colour';

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

export const generateDefaultColorPalette = (numberOfColors: number) => {
  const colors = [];
  for (let i = 0; i < numberOfColors; i++) {
    colors.push(defaultBase16Colors[i]);
  }
  return colors;
};
