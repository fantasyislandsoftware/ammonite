import { EnumArgSrcDst } from '../IM68k';
import { calcArgDir } from './m68kHelpers';

it(`CalcArgDir`, () => {
  const REG = 'd0';
  const ABW = '0x0000.w';
  const ABL = '0x00000000.l';
  const I = '(a0)';
  const IPI = '(a0)+';
  const IPD = '-(a0)';
  const IWD = '0x0000(a0)';
  const IWDI = '0x00(a0,a0)';
  const PCD = '0x0000(pc)';
  const PCDI = '0x00(pc,d0)';
  const TO = ',';

  /* reg */
  expect(calcArgDir(`${REG}${TO}${REG}`)).toEqual(EnumArgSrcDst.REG_TO_REG);
  expect(calcArgDir(`${REG}${TO}${ABW}`)).toEqual(EnumArgSrcDst.REG_TO_ABW);
  expect(calcArgDir(`${REG}${TO}${ABL}`)).toEqual(EnumArgSrcDst.REG_TO_ABL);
  expect(calcArgDir(`${REG}${TO}${I}`)).toEqual(EnumArgSrcDst.REG_TO_I);
  expect(calcArgDir(`${REG}${TO}${IPI}`)).toEqual(EnumArgSrcDst.REG_TO_IPI);
  expect(calcArgDir(`${REG}${TO}${IPD}`)).toEqual(EnumArgSrcDst.REG_TO_IPD);
  expect(calcArgDir(`${REG}${TO}${IWD}`)).toEqual(EnumArgSrcDst.REG_TO_IWD);
  expect(calcArgDir(`${REG}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.REG_TO_IWDI);

  /* ABW */
  expect(calcArgDir(`${ABW}${TO}${REG}`)).toEqual(EnumArgSrcDst.ABW_TO_REG);
  expect(calcArgDir(`${ABW}${TO}${ABW}`)).toEqual(EnumArgSrcDst.ABW_TO_ABW);
  expect(calcArgDir(`${ABW}${TO}${ABL}`)).toEqual(EnumArgSrcDst.ABW_TO_ABL);
  expect(calcArgDir(`${ABW}${TO}${I}`)).toEqual(EnumArgSrcDst.ABW_TO_I);
  expect(calcArgDir(`${ABW}${TO}${IPI}`)).toEqual(EnumArgSrcDst.ABW_TO_IPI);
  expect(calcArgDir(`${ABW}${TO}${IPD}`)).toEqual(EnumArgSrcDst.ABW_TO_IPD);
  expect(calcArgDir(`${ABW}${TO}${IWD}`)).toEqual(EnumArgSrcDst.ABW_TO_IWD);
  expect(calcArgDir(`${ABW}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.ABW_TO_IWDI);

  /* ABL */
  expect(calcArgDir(`${ABL}${TO}${REG}`)).toEqual(EnumArgSrcDst.ABL_TO_REG);
  expect(calcArgDir(`${ABL}${TO}${ABW}`)).toEqual(EnumArgSrcDst.ABL_TO_ABW);
  expect(calcArgDir(`${ABL}${TO}${ABL}`)).toEqual(EnumArgSrcDst.ABL_TO_ABL);
  expect(calcArgDir(`${ABL}${TO}${I}`)).toEqual(EnumArgSrcDst.ABL_TO_I);
  expect(calcArgDir(`${ABL}${TO}${IPI}`)).toEqual(EnumArgSrcDst.ABL_TO_IPI);
  expect(calcArgDir(`${ABL}${TO}${IPD}`)).toEqual(EnumArgSrcDst.ABL_TO_IPD);
  expect(calcArgDir(`${ABL}${TO}${IWD}`)).toEqual(EnumArgSrcDst.ABL_TO_IWD);
  expect(calcArgDir(`${ABL}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.ABL_TO_IWDI);

  /* I */
  expect(calcArgDir(`${I}${TO}${REG}`)).toEqual(EnumArgSrcDst.I_TO_REG);
  expect(calcArgDir(`${I}${TO}${ABW}`)).toEqual(EnumArgSrcDst.I_TO_ABW);
  expect(calcArgDir(`${I}${TO}${ABL}`)).toEqual(EnumArgSrcDst.I_TO_ABL);
  expect(calcArgDir(`${I}${TO}${I}`)).toEqual(EnumArgSrcDst.I_TO_I);
  expect(calcArgDir(`${I}${TO}${IPI}`)).toEqual(EnumArgSrcDst.I_TO_IPI);
  expect(calcArgDir(`${I}${TO}${IPD}`)).toEqual(EnumArgSrcDst.I_TO_IPD);
  expect(calcArgDir(`${I}${TO}${IWD}`)).toEqual(EnumArgSrcDst.I_TO_IWD);
  expect(calcArgDir(`${I}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.I_TO_IWDI);

  /* IPI */
  expect(calcArgDir(`${IPI}${TO}${REG}`)).toEqual(EnumArgSrcDst.IPI_TO_REG);
  expect(calcArgDir(`${IPI}${TO}${ABW}`)).toEqual(EnumArgSrcDst.IPI_TO_ABW);
  expect(calcArgDir(`${IPI}${TO}${ABL}`)).toEqual(EnumArgSrcDst.IPI_TO_ABL);
  expect(calcArgDir(`${IPI}${TO}${I}`)).toEqual(EnumArgSrcDst.IPI_TO_I);
  expect(calcArgDir(`${IPI}${TO}${IPI}`)).toEqual(EnumArgSrcDst.IPI_TO_IPI);
  expect(calcArgDir(`${IPI}${TO}${IPD}`)).toEqual(EnumArgSrcDst.IPI_TO_IPD);
  expect(calcArgDir(`${IPI}${TO}${IWD}`)).toEqual(EnumArgSrcDst.IPI_TO_IWD);
  expect(calcArgDir(`${IPI}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.IPI_TO_IWDI);

  /* IPD */

  expect(calcArgDir(`${IPD}${TO}${REG}`)).toEqual(EnumArgSrcDst.IPD_TO_REG);
  expect(calcArgDir(`${IPD}${TO}${ABW}`)).toEqual(EnumArgSrcDst.IPD_TO_ABW);
  expect(calcArgDir(`${IPD}${TO}${ABL}`)).toEqual(EnumArgSrcDst.IPD_TO_ABL);
  expect(calcArgDir(`${IPD}${TO}${I}`)).toEqual(EnumArgSrcDst.IPD_TO_I);
  expect(calcArgDir(`${IPD}${TO}${IPI}`)).toEqual(EnumArgSrcDst.IPD_TO_IPI);
  expect(calcArgDir(`${IPD}${TO}${IPD}`)).toEqual(EnumArgSrcDst.IPD_TO_IPD);
  expect(calcArgDir(`${IPD}${TO}${IWD}`)).toEqual(EnumArgSrcDst.IPD_TO_IWD);
  expect(calcArgDir(`${IPD}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.IPD_TO_IWDI);

  /* IWD */
  expect(calcArgDir(`${IWD}${TO}${REG}`)).toEqual(EnumArgSrcDst.IWD_TO_REG);
  expect(calcArgDir(`${IWD}${TO}${ABW}`)).toEqual(EnumArgSrcDst.IWD_TO_ABW);
  expect(calcArgDir(`${IWD}${TO}${ABL}`)).toEqual(EnumArgSrcDst.IWD_TO_ABL);
  expect(calcArgDir(`${IWD}${TO}${I}`)).toEqual(EnumArgSrcDst.IWD_TO_I);
  expect(calcArgDir(`${IWD}${TO}${IPI}`)).toEqual(EnumArgSrcDst.IWD_TO_IPI);
  expect(calcArgDir(`${IWD}${TO}${IPD}`)).toEqual(EnumArgSrcDst.IWD_TO_IPD);
  expect(calcArgDir(`${IWD}${TO}${IWD}`)).toEqual(EnumArgSrcDst.IWD_TO_IWD);
  expect(calcArgDir(`${IWD}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.IWD_TO_IWDI);

  /* IWDI */
  expect(calcArgDir(`${IWDI}${TO}${REG}`)).toEqual(EnumArgSrcDst.IWDI_TO_REG);
  expect(calcArgDir(`${IWDI}${TO}${ABW}`)).toEqual(EnumArgSrcDst.IWDI_TO_ABW);
  expect(calcArgDir(`${IWDI}${TO}${ABL}`)).toEqual(EnumArgSrcDst.IWDI_TO_ABL);
  expect(calcArgDir(`${IWDI}${TO}${I}`)).toEqual(EnumArgSrcDst.IWDI_TO_I);
  expect(calcArgDir(`${IWDI}${TO}${IPI}`)).toEqual(EnumArgSrcDst.IWDI_TO_IPI);
  expect(calcArgDir(`${IWDI}${TO}${IPD}`)).toEqual(EnumArgSrcDst.IWDI_TO_IPD);
  expect(calcArgDir(`${IWDI}${TO}${IWD}`)).toEqual(EnumArgSrcDst.IWDI_TO_IWD);
  expect(calcArgDir(`${IWDI}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.IWDI_TO_IWDI);

  /* PCD */
  expect(calcArgDir(`${PCD}${TO}${REG}`)).toEqual(EnumArgSrcDst.PCD_TO_REG);
  expect(calcArgDir(`${PCD}${TO}${ABW}`)).toEqual(EnumArgSrcDst.PCD_TO_ABW);
  expect(calcArgDir(`${PCD}${TO}${ABL}`)).toEqual(EnumArgSrcDst.PCD_TO_ABL);
  expect(calcArgDir(`${PCD}${TO}${I}`)).toEqual(EnumArgSrcDst.PCD_TO_I);
  expect(calcArgDir(`${PCD}${TO}${IPI}`)).toEqual(EnumArgSrcDst.PCD_TO_IPI);
  expect(calcArgDir(`${PCD}${TO}${IPD}`)).toEqual(EnumArgSrcDst.PCD_TO_IPD);
  expect(calcArgDir(`${PCD}${TO}${IWD}`)).toEqual(EnumArgSrcDst.PCD_TO_IWD);
  expect(calcArgDir(`${PCD}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.PCD_TO_IWDI);

  /* PCID */
  expect(calcArgDir(`${PCDI}${TO}${REG}`)).toEqual(EnumArgSrcDst.PCID_TO_REG);
  expect(calcArgDir(`${PCDI}${TO}${ABW}`)).toEqual(EnumArgSrcDst.PCID_TO_ABW);
  expect(calcArgDir(`${PCDI}${TO}${ABL}`)).toEqual(EnumArgSrcDst.PCID_TO_ABL);
  expect(calcArgDir(`${PCDI}${TO}${I}`)).toEqual(EnumArgSrcDst.PCID_TO_I);
  expect(calcArgDir(`${PCDI}${TO}${IPI}`)).toEqual(EnumArgSrcDst.PCID_TO_IPI);
  expect(calcArgDir(`${PCDI}${TO}${IPD}`)).toEqual(EnumArgSrcDst.PCID_TO_IPD);
  expect(calcArgDir(`${PCDI}${TO}${IWD}`)).toEqual(EnumArgSrcDst.PCID_TO_IWD);
  expect(calcArgDir(`${PCDI}${TO}${IWDI}`)).toEqual(EnumArgSrcDst.PCID_TO_IWDI);
});
