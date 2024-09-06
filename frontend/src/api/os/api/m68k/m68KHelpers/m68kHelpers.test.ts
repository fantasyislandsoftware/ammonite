import { EnumArgSrcDst } from '../IM68k';
import { calcArgs } from './m68kHelpers';

it(``, () => {
  /* reg */
  expect(calcArgs('d0,d0')).toEqual(EnumArgSrcDst.REG_TO_REG);
  expect(calcArgs('d0,0.w')).toEqual(EnumArgSrcDst.REG_TO_ABW);
  expect(calcArgs('d0,(a0)')).toEqual(EnumArgSrcDst.REG_TO_I);
  expect(calcArgs('d0,(a0)+')).toEqual(EnumArgSrcDst.REG_TO_IPI);
  expect(calcArgs('d0,-(a0)')).toEqual(EnumArgSrcDst.REG_TO_IPD);
  expect(calcArgs('d0,1(a0)')).toEqual(EnumArgSrcDst.REG_TO_IWD);
  expect(calcArgs('d0,1(a0,d0)')).toEqual(EnumArgSrcDst.REG_TO_IWDI);

  /* abs */
  expect(calcArgs('0.w,d0')).toEqual(EnumArgSrcDst.ABW_TO_REG);
  expect(calcArgs('0.w,0.w')).toEqual(EnumArgSrcDst.ABW_TO_ABW);
  expect(calcArgs('0.w,(a0)')).toEqual(EnumArgSrcDst.ABW_TO_I);
  expect(calcArgs('0.w,(a0)+')).toEqual(EnumArgSrcDst.ABW_TO_IPI);
  expect(calcArgs('0.w,-(a0)')).toEqual(EnumArgSrcDst.ABW_TO_IPD);
  expect(calcArgs('0.w,1(a0)')).toEqual(EnumArgSrcDst.ABW_TO_IWD);
  expect(calcArgs('0.w,1(a0,d0)')).toEqual(EnumArgSrcDst.ABW_TO_IWDI);

  /* I */
  expect(calcArgs('(a0),d0')).toEqual(EnumArgSrcDst.I_TO_REG);
  expect(calcArgs('(a0),0.w')).toEqual(EnumArgSrcDst.I_TO_ABW);
  expect(calcArgs('(a0),(a0)')).toEqual(EnumArgSrcDst.I_TO_I);
  expect(calcArgs('(a0),(a0)+')).toEqual(EnumArgSrcDst.I_TO_IPI);
  expect(calcArgs('(a0),-(a0)')).toEqual(EnumArgSrcDst.I_TO_IPD);
  expect(calcArgs('(a0),1(a0)')).toEqual(EnumArgSrcDst.I_TO_IWD);
  expect(calcArgs('(a0),1(a0,d0)')).toEqual(EnumArgSrcDst.I_TO_IWDI);
});
