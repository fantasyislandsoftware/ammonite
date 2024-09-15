import { hex2bin, rp } from 'functions/string';
import { EnumArgSrcDst, IOperand } from '../IM68k';
import { IWDI_B } from './m68kHelpers';

export interface IArgData {
  w: string[];
  l: string[];
  b: string[];
}

export const argREG = (
  argDir: string,
  argData: IArgData,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string
) => {
  let args = '';

  const { w, l, b } = argData;

  switch (argDir) {
    /* REG_TO_REG */
    case EnumArgSrcDst.REG_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* REG_TO_ABW */
    case EnumArgSrcDst.REG_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[0]}` },
      ]);
      break;

    /* REG_TO_ABL */
    case EnumArgSrcDst.REG_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${l[0]}` },
      ]);
      break;

    /* REG_TO_I */
    case EnumArgSrcDst.REG_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* REG_TO_IPI */
    case EnumArgSrcDst.REG_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* REG_TO_IPD */
    case EnumArgSrcDst.REG_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* REG_TO_IWD */
    case EnumArgSrcDst.REG_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* REG_TO_IWDI */
    case EnumArgSrcDst.REG_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${b[1]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};

export const argABW = (
  argDir: string,
  argData: IArgData,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string
) => {
  let args = '';

  const { w, l, b } = argData;

  switch (argDir) {
    /* ABW_TO_REG */
    case EnumArgSrcDst.ABW_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABW_TO_ABW */
    case EnumArgSrcDst.ABW_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{dst_d}', with: `0x${w[1]}` },
      ]);
      break;

    /* ABW_TO_ABL */
    case EnumArgSrcDst.ABW_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{dst_d}', with: `0x${l[1]}` },
      ]);
      break;

    /* ABW_TO_I */
    case EnumArgSrcDst.ABW_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABW_TO_IPI */
    case EnumArgSrcDst.ABW_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABW_TO_IPD */
    case EnumArgSrcDst.ABW_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABW_TO_IWD */
    case EnumArgSrcDst.ABW_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{dst_d}', with: `0x${w[1]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABW_TO_IWDI */
    case EnumArgSrcDst.ABW_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{dst_d}', with: `0x${b[3]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[2], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};

export const argABL = (
  argDir: string,
  argData: IArgData,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string
) => {
  let args = '';

  const { w, l, b } = argData;

  switch (argDir) {
    /* ABL_TO_REG */
    case EnumArgSrcDst.ABL_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${l[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABL_TO_ABW */
    case EnumArgSrcDst.ABL_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${l[0]}` },
        { str: '{dst_d}', with: `0x${w[2]}` },
      ]);
      break;

    /* ABL_TO_ABL */
    case EnumArgSrcDst.ABL_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${l[0]}` },
        { str: '{dst_d}', with: `0x${l[1]}` },
      ]);
      break;

    /* ABL_TO_I */
    case EnumArgSrcDst.ABL_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${l[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABL_TO_IPI */
    case EnumArgSrcDst.ABL_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${l[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABL_TO_IPD */
    case EnumArgSrcDst.ABL_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${l[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABL_TO_IWD */
    case EnumArgSrcDst.ABL_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${l[0]}` },
        { str: '{dst_d}', with: `0x${w[2]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* ABL_TO_IWDI */
    case EnumArgSrcDst.ABL_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${l[0]}` },
        { str: '{dst_d}', with: `0x${b[7]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[6], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};

export const argI = (
  argDir: string,
  argData: IArgData,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string
) => {
  let args = '';

  const { w, l, b } = argData;

  switch (argDir) {
    /* I_TO_REG */
    case EnumArgSrcDst.I_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* I_TO_ABW */
    case EnumArgSrcDst.I_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[0]}` },
      ]);
      break;

    /* I_TO_ABL */
    case EnumArgSrcDst.I_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${l[0]}` },
      ]);
      break;

    /* I_TO_I */
    case EnumArgSrcDst.I_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* I_TO_IPI */
    case EnumArgSrcDst.I_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* I_TO_IPD */
    case EnumArgSrcDst.I_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* I_TO_IWD */
    case EnumArgSrcDst.I_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* I_TO_IWDI */
    case EnumArgSrcDst.I_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${b[1]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};

export const argIPI = (
  argDir: string,
  argData: IArgData,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string
) => {
  let args = '';

  const { w, l, b } = argData;

  switch (argDir) {
    /* IPI_TO_REG */
    case EnumArgSrcDst.IPI_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPI_TO_ABW */
    case EnumArgSrcDst.IPI_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[0]}` },
      ]);
      break;

    /* IPI_TO_ABL */
    case EnumArgSrcDst.IPI_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${l[0]}` },
      ]);
      break;

    /* IPI_TO_I */
    case EnumArgSrcDst.IPI_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPI_TO_IPI */
    case EnumArgSrcDst.IPI_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPI_TO_IPD */
    case EnumArgSrcDst.IPI_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPI_TO_IWD */
    case EnumArgSrcDst.IPI_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPI_TO_IWDI */
    case EnumArgSrcDst.IPI_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${b[1]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};

export const argIPD = (
  argDir: string,
  argData: IArgData,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string
) => {
  let args = '';

  const { w, l, b } = argData;

  switch (argDir) {
    /* IPD_TO_REG */
    case EnumArgSrcDst.IPD_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPD_TO_ABW */
    case EnumArgSrcDst.IPD_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[0]}` },
      ]);
      break;

    /* IPD_TO_ABL */
    case EnumArgSrcDst.IPD_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${l[0]}` },
      ]);
      break;

    /* IPD_TO_I */
    case EnumArgSrcDst.IPD_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPD_TO_IPI */
    case EnumArgSrcDst.IPD_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPD_TO_IPD */
    case EnumArgSrcDst.IPD_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPD_TO_IWD */
    case EnumArgSrcDst.IPD_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[0]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IPD_TO_IWDI */
    case EnumArgSrcDst.IPD_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${b[1]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};
