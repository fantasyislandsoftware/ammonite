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

  /* IPI */
  expect(calcArgs('(a0)+,d0')).toEqual(EnumArgSrcDst.IPI_TO_REG);
  expect(calcArgs('(a0)+,0.w')).toEqual(EnumArgSrcDst.IPI_TO_ABW);
  expect(calcArgs('(a0)+,(a0)')).toEqual(EnumArgSrcDst.IPI_TO_I);
  expect(calcArgs('(a0)+,(a0)+')).toEqual(EnumArgSrcDst.IPI_TO_IPI);
  expect(calcArgs('(a0)+,-(a0)')).toEqual(EnumArgSrcDst.IPI_TO_IPD);
  expect(calcArgs('(a0)+,1(a0)')).toEqual(EnumArgSrcDst.IPI_TO_IWD);
  expect(calcArgs('(a0)+,1(a0,d0)')).toEqual(EnumArgSrcDst.IPI_TO_IWDI);

  /* IPD */
  expect(calcArgs('-(a0),d0')).toEqual(EnumArgSrcDst.IPD_TO_REG);
  expect(calcArgs('-(a0),0.w')).toEqual(EnumArgSrcDst.IPD_TO_ABW);
  expect(calcArgs('-(a0),(a0)')).toEqual(EnumArgSrcDst.IPD_TO_I);
  expect(calcArgs('-(a0),(a0)+')).toEqual(EnumArgSrcDst.IPD_TO_IPI);
  expect(calcArgs('-(a0),-(a0)')).toEqual(EnumArgSrcDst.IPD_TO_IPD);
  expect(calcArgs('-(a0),1(a0)')).toEqual(EnumArgSrcDst.IPD_TO_IWD);
  expect(calcArgs('-(a0),1(a0,d0)')).toEqual(EnumArgSrcDst.IPD_TO_IWDI);

  /* IWD */
  expect(calcArgs('1(a0),d0')).toEqual(EnumArgSrcDst.IWD_TO_REG);
  expect(calcArgs('1(a0),0.w')).toEqual(EnumArgSrcDst.IWD_TO_ABW);
  expect(calcArgs('1(a0),(a0)')).toEqual(EnumArgSrcDst.IWD_TO_I);
  expect(calcArgs('1(a0),(a0)+')).toEqual(EnumArgSrcDst.IWD_TO_IPI);
  expect(calcArgs('1(a0),-(a0)')).toEqual(EnumArgSrcDst.IWD_TO_IPD);
  expect(calcArgs('1(a0),1(a0)')).toEqual(EnumArgSrcDst.IWD_TO_IWD);
  expect(calcArgs('1(a0),1(a0,d0)')).toEqual(EnumArgSrcDst.IWD_TO_IWDI);

  /* IWDI */
  expect(calcArgs('1(a0,d0),d0')).toEqual(EnumArgSrcDst.IWDI_TO_REG);
  expect(calcArgs('1(a0,d0),0.w')).toEqual(EnumArgSrcDst.IWDI_TO_ABW);
  expect(calcArgs('1(a0,d0),(a0)')).toEqual(EnumArgSrcDst.IWDI_TO_I);
  expect(calcArgs('1(a0,d0),(a0)+')).toEqual(EnumArgSrcDst.IWDI_TO_IPI);
  expect(calcArgs('1(a0,d0),-(a0)')).toEqual(EnumArgSrcDst.IWDI_TO_IPD);
  expect(calcArgs('1(a0,d0),1(a0)')).toEqual(EnumArgSrcDst.IWDI_TO_IWD);
  expect(calcArgs('1(a0,d0),1(a0,d0)')).toEqual(EnumArgSrcDst.IWDI_TO_IWDI);

  /* PCD */
  expect(calcArgs('1(PC),d0')).toEqual(EnumArgSrcDst.PCD_TO_REG);
  expect(calcArgs('1(PC),0.w')).toEqual(EnumArgSrcDst.PCD_TO_ABW);
  expect(calcArgs('1(PC),(a0)')).toEqual(EnumArgSrcDst.PCD_TO_I);
  expect(calcArgs('1(PC),(a0)+')).toEqual(EnumArgSrcDst.PCD_TO_IPI);
  expect(calcArgs('1(PC),-(a0)')).toEqual(EnumArgSrcDst.PCD_TO_IPD);
  expect(calcArgs('1(PC),1(a0)')).toEqual(EnumArgSrcDst.PCD_TO_IWD);
  expect(calcArgs('1(PC),1(a0,d0)')).toEqual(EnumArgSrcDst.PCD_TO_IWDI);

  /* PCID */
  expect(calcArgs('1(PC,d0),d0')).toEqual(EnumArgSrcDst.PCID_TO_REG);
  expect(calcArgs('1(PC,d0),0.w')).toEqual(EnumArgSrcDst.PCID_TO_ABW);
  expect(calcArgs('1(PC,d0),(a0)')).toEqual(EnumArgSrcDst.PCID_TO_I);
  expect(calcArgs('1(PC,d0),(a0)+')).toEqual(EnumArgSrcDst.PCID_TO_IPI);
  expect(calcArgs('1(PC,d0),-(a0)')).toEqual(EnumArgSrcDst.PCID_TO_IPD);
  expect(calcArgs('1(PC,d0),1(a0)')).toEqual(EnumArgSrcDst.PCID_TO_IWD);
  expect(calcArgs('1(PC,d0),1(a0,d0)')).toEqual(EnumArgSrcDst.PCID_TO_IWDI);
});
