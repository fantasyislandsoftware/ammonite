import { EnumArgSrcDst } from '../IM68k';
import { calcArgDir } from './m68kHelpers';

it(`CalcArgDir`, () => {
  /* reg */
  expect(calcArgDir('d0,d0')).toEqual(EnumArgSrcDst.REG_TO_REG);
  expect(calcArgDir('d0,0.w')).toEqual(EnumArgSrcDst.REG_TO_ABW);
  expect(calcArgDir('d0,0.l')).toEqual(EnumArgSrcDst.REG_TO_ABL);
  expect(calcArgDir('d0,(a0)')).toEqual(EnumArgSrcDst.REG_TO_I);
  expect(calcArgDir('d0,(a0)+')).toEqual(EnumArgSrcDst.REG_TO_IPI);
  expect(calcArgDir('d0,-(a0)')).toEqual(EnumArgSrcDst.REG_TO_IPD);
  expect(calcArgDir('d0,1(a0)')).toEqual(EnumArgSrcDst.REG_TO_IWD);
  expect(calcArgDir('d0,1(a0,d0)')).toEqual(EnumArgSrcDst.REG_TO_IWDI);

  /* ABW */
  expect(calcArgDir('0.w,d0')).toEqual(EnumArgSrcDst.ABW_TO_REG);
  expect(calcArgDir('0.w,0.w')).toEqual(EnumArgSrcDst.ABW_TO_ABW);
  expect(calcArgDir('0.w,0.l')).toEqual(EnumArgSrcDst.ABW_TO_ABL);
  expect(calcArgDir('0.w,(a0)')).toEqual(EnumArgSrcDst.ABW_TO_I);
  expect(calcArgDir('0.w,(a0)+')).toEqual(EnumArgSrcDst.ABW_TO_IPI);
  expect(calcArgDir('0.w,-(a0)')).toEqual(EnumArgSrcDst.ABW_TO_IPD);
  expect(calcArgDir('0.w,1(a0)')).toEqual(EnumArgSrcDst.ABW_TO_IWD);
  expect(calcArgDir('0.w,1(a0,d0)')).toEqual(EnumArgSrcDst.ABW_TO_IWDI);

  /* ABL */
  expect(calcArgDir('0.l,d0')).toEqual(EnumArgSrcDst.ABL_TO_REG);
  expect(calcArgDir('0.l,0.w')).toEqual(EnumArgSrcDst.ABL_TO_ABW);
  expect(calcArgDir('0.l,0.l')).toEqual(EnumArgSrcDst.ABL_TO_ABL);
  expect(calcArgDir('0.l,(a0)')).toEqual(EnumArgSrcDst.ABL_TO_I);
  expect(calcArgDir('0.l,(a0)+')).toEqual(EnumArgSrcDst.ABL_TO_IPI);
  expect(calcArgDir('0.l,-(a0)')).toEqual(EnumArgSrcDst.ABL_TO_IPD);
  expect(calcArgDir('0.l,1(a0)')).toEqual(EnumArgSrcDst.ABL_TO_IWD);
  expect(calcArgDir('0.l,1(a0,d0)')).toEqual(EnumArgSrcDst.ABL_TO_IWDI);

  /* I */
  expect(calcArgDir('(a0),d0')).toEqual(EnumArgSrcDst.I_TO_REG);
  expect(calcArgDir('(a0),0.w')).toEqual(EnumArgSrcDst.I_TO_ABW);
  expect(calcArgDir('(a0),0.l')).toEqual(EnumArgSrcDst.I_TO_ABL);
  expect(calcArgDir('(a0),(a0)')).toEqual(EnumArgSrcDst.I_TO_I);
  expect(calcArgDir('(a0),(a0)+')).toEqual(EnumArgSrcDst.I_TO_IPI);
  expect(calcArgDir('(a0),-(a0)')).toEqual(EnumArgSrcDst.I_TO_IPD);
  expect(calcArgDir('(a0),1(a0)')).toEqual(EnumArgSrcDst.I_TO_IWD);
  expect(calcArgDir('(a0),1(a0,d0)')).toEqual(EnumArgSrcDst.I_TO_IWDI);

  /* IPI */
  expect(calcArgDir('(a0)+,d0')).toEqual(EnumArgSrcDst.IPI_TO_REG);
  expect(calcArgDir('(a0)+,0.w')).toEqual(EnumArgSrcDst.IPI_TO_ABW);
  expect(calcArgDir('(a0)+,0.l')).toEqual(EnumArgSrcDst.IPI_TO_ABL);
  expect(calcArgDir('(a0)+,(a0)')).toEqual(EnumArgSrcDst.IPI_TO_I);
  expect(calcArgDir('(a0)+,(a0)+')).toEqual(EnumArgSrcDst.IPI_TO_IPI);
  expect(calcArgDir('(a0)+,-(a0)')).toEqual(EnumArgSrcDst.IPI_TO_IPD);
  expect(calcArgDir('(a0)+,1(a0)')).toEqual(EnumArgSrcDst.IPI_TO_IWD);
  expect(calcArgDir('(a0)+,1(a0,d0)')).toEqual(EnumArgSrcDst.IPI_TO_IWDI);

  /* IPD */
  expect(calcArgDir('-(a0),d0')).toEqual(EnumArgSrcDst.IPD_TO_REG);
  expect(calcArgDir('-(a0),0.w')).toEqual(EnumArgSrcDst.IPD_TO_ABW);
  expect(calcArgDir('-(a0),0.l')).toEqual(EnumArgSrcDst.IPD_TO_ABL);
  expect(calcArgDir('-(a0),(a0)')).toEqual(EnumArgSrcDst.IPD_TO_I);
  expect(calcArgDir('-(a0),(a0)+')).toEqual(EnumArgSrcDst.IPD_TO_IPI);
  expect(calcArgDir('-(a0),-(a0)')).toEqual(EnumArgSrcDst.IPD_TO_IPD);
  expect(calcArgDir('-(a0),1(a0)')).toEqual(EnumArgSrcDst.IPD_TO_IWD);
  expect(calcArgDir('-(a0),1(a0,d0)')).toEqual(EnumArgSrcDst.IPD_TO_IWDI);

  /* IWD */
  expect(calcArgDir('1(a0),d0')).toEqual(EnumArgSrcDst.IWD_TO_REG);
  expect(calcArgDir('1(a0),0.w')).toEqual(EnumArgSrcDst.IWD_TO_ABW);
  expect(calcArgDir('1(a0),0.l')).toEqual(EnumArgSrcDst.IWD_TO_ABL);
  expect(calcArgDir('1(a0),(a0)')).toEqual(EnumArgSrcDst.IWD_TO_I);
  expect(calcArgDir('1(a0),(a0)+')).toEqual(EnumArgSrcDst.IWD_TO_IPI);
  expect(calcArgDir('1(a0),-(a0)')).toEqual(EnumArgSrcDst.IWD_TO_IPD);
  expect(calcArgDir('1(a0),1(a0)')).toEqual(EnumArgSrcDst.IWD_TO_IWD);
  expect(calcArgDir('1(a0),1(a0,d0)')).toEqual(EnumArgSrcDst.IWD_TO_IWDI);

  /* IWDI */
  expect(calcArgDir('1(a0,d0),d0')).toEqual(EnumArgSrcDst.IWDI_TO_REG);
  expect(calcArgDir('1(a0,d0),0.w')).toEqual(EnumArgSrcDst.IWDI_TO_ABW);
  expect(calcArgDir('1(a0,d0),0.l')).toEqual(EnumArgSrcDst.IWDI_TO_ABL);
  expect(calcArgDir('1(a0,d0),(a0)')).toEqual(EnumArgSrcDst.IWDI_TO_I);
  expect(calcArgDir('1(a0,d0),(a0)+')).toEqual(EnumArgSrcDst.IWDI_TO_IPI);
  expect(calcArgDir('1(a0,d0),-(a0)')).toEqual(EnumArgSrcDst.IWDI_TO_IPD);
  expect(calcArgDir('1(a0,d0),1(a0)')).toEqual(EnumArgSrcDst.IWDI_TO_IWD);
  expect(calcArgDir('1(a0,d0),1(a0,d0)')).toEqual(EnumArgSrcDst.IWDI_TO_IWDI);

  /* PCD */
  expect(calcArgDir('1(PC),d0')).toEqual(EnumArgSrcDst.PCD_TO_REG);
  expect(calcArgDir('1(PC),0.w')).toEqual(EnumArgSrcDst.PCD_TO_ABW);
  expect(calcArgDir('1(PC),0.l')).toEqual(EnumArgSrcDst.PCD_TO_ABL);
  expect(calcArgDir('1(PC),(a0)')).toEqual(EnumArgSrcDst.PCD_TO_I);
  expect(calcArgDir('1(PC),(a0)+')).toEqual(EnumArgSrcDst.PCD_TO_IPI);
  expect(calcArgDir('1(PC),-(a0)')).toEqual(EnumArgSrcDst.PCD_TO_IPD);
  expect(calcArgDir('1(PC),1(a0)')).toEqual(EnumArgSrcDst.PCD_TO_IWD);
  expect(calcArgDir('1(PC),1(a0,d0)')).toEqual(EnumArgSrcDst.PCD_TO_IWDI);

  /* PCID */
  expect(calcArgDir('1(PC,d0),d0')).toEqual(EnumArgSrcDst.PCID_TO_REG);
  expect(calcArgDir('1(PC,d0),0.w')).toEqual(EnumArgSrcDst.PCID_TO_ABW);
  expect(calcArgDir('1(PC,d0),0.l')).toEqual(EnumArgSrcDst.PCID_TO_ABL);
  expect(calcArgDir('1(PC,d0),(a0)')).toEqual(EnumArgSrcDst.PCID_TO_I);
  expect(calcArgDir('1(PC,d0),(a0)+')).toEqual(EnumArgSrcDst.PCID_TO_IPI);
  expect(calcArgDir('1(PC,d0),-(a0)')).toEqual(EnumArgSrcDst.PCID_TO_IPD);
  expect(calcArgDir('1(PC,d0),1(a0)')).toEqual(EnumArgSrcDst.PCID_TO_IWD);
  expect(calcArgDir('1(PC,d0),1(a0,d0)')).toEqual(EnumArgSrcDst.PCID_TO_IWDI);
});
