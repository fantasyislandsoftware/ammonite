import { hex2bin, rp } from 'functions/string';
import { EnumArgSrcDst, IOperand } from '../IM68k';
import { IWDI_B } from './m68kHelpers';
import { ITask } from 'stores/useTaskStore';
import { bin2hex, hex2int, int2hex } from 'functions/dataHandling/dataHandling';

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

  //console.log(w, l, b);

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
        { str: '{dst_d}', with: `0x${l[2]}` },
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

export const argIWD = (
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
    /* IWD_TO_REG */
    case EnumArgSrcDst.IWD_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IWD_TO_ABW */
    case EnumArgSrcDst.IWD_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[1]}` },
      ]);
      break;

    /* IWD_TO_ABL */
    case EnumArgSrcDst.IWD_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${l[1]}` },
      ]);
      break;

    /* IWD_TO_I */
    case EnumArgSrcDst.IWD_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IWD_TO_IPI */
    case EnumArgSrcDst.IWD_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IWD_TO_IPD */
    case EnumArgSrcDst.IWD_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IWD_TO_IWD */
    case EnumArgSrcDst.IWD_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[1]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* IWD_TO_IWDI */
    case EnumArgSrcDst.IWD_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${w[0]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${b[3]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[2], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};

export const argIWDI = (
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
    /* IWDI_TO_REG */
    case EnumArgSrcDst.IWDI_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${b[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* IWDI_TO_ABW */
    case EnumArgSrcDst.IWDI_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${b[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[1]}` },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* IWDI_TO_ABL */
    case EnumArgSrcDst.IWDI_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${b[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${l[1]}` },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* IWDI_TO_I */
    case EnumArgSrcDst.IWDI_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${b[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* IWDI_TO_IPI */
    case EnumArgSrcDst.IWDI_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${b[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* IWDI_TO_IPD */
    case EnumArgSrcDst.IWDI_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${b[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* IWDI_TO_IWD */
    case EnumArgSrcDst.IWDI_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${b[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${w[1]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
      ]);
      break;

    /* IWDI_TO_IWDI */
    case EnumArgSrcDst.IWDI_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        { str: '{src_d}', with: `0x${b[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_d}', with: `0x${b[3]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{ir2}', with: IWDI_B[hex2bin(b[2], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};

export const argPCD = (
  task: ITask,
  argDir: string,
  argData: IArgData,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string
) => {
  let args = '';

  const { w, l, b } = argData;

  const i = 2;

  switch (argDir) {
    /* PCD_TO_REG */
    case EnumArgSrcDst.PCD_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(w[0]), 4)}`,
        },
        { str: '{dst_n}', with: xnDstN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCD_TO_ABW */
    case EnumArgSrcDst.PCD_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(w[0]), 4)}`,
        },
        { str: '{dst_d}', with: `0x${w[1]}` },
        { str: '{src_n}', with: xnSrcN },
      ]);
      break;

    /* PCD_TO_ABL */
    case EnumArgSrcDst.PCD_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(w[0]), 4)}`,
        },
        { str: '{dst_d}', with: `0x${l[1]}` },
        { str: '{src_n}', with: xnSrcN },
      ]);
      break;

    /* PCD_TO_I */
    case EnumArgSrcDst.PCD_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(w[0]), 4)}`,
        },
        { str: '{dst_n}', with: xnDstN },
        { str: '{src_n}', with: xnSrcN },
      ]);
      break;

    /* PCD_TO_IPI */
    case EnumArgSrcDst.PCD_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(w[0]), 4)}`,
        },
        { str: '{dst_n}', with: xnDstN },
        { str: '{src_n}', with: xnSrcN },
      ]);
      break;

    /* PCD_TO_IPD */
    case EnumArgSrcDst.PCD_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(w[0]), 4)}`,
        },
        { str: '{dst_n}', with: xnDstN },
        { str: '{src_n}', with: xnSrcN },
      ]);
      break;

    /* PCD_TO_IWD */
    case EnumArgSrcDst.PCD_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(w[0]), 4)}`,
        },
        { str: '{dst_d}', with: `0x${w[1]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCD_TO_IWDI */
    case EnumArgSrcDst.PCD_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(w[0]), 4)}`,
        },
        { str: '{dst_d}', with: `0x${b[3]}` },
        { str: '{src_n}', with: xnSrcN },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[2], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};

export const argPCDI = (
  task: ITask,
  argDir: string,
  argData: IArgData,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string
) => {
  let args = '';

  const { w, l, b } = argData;

  const i = 2;

  //console.log(argDir);

  switch (argDir) {
    /* PCID_TO_REG */
    case EnumArgSrcDst.PCID_TO_REG:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(b[1]), 2)}`,
        },
        { str: '{src_n}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{dst_n}', with: xnDstN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCID_TO_ABW */
    case EnumArgSrcDst.PCID_TO_ABW:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(b[1]), 2)}`,
        },
        { str: '{src_n}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{dst_d}', with: `0x${w[1]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCID_TO_ABL */
    case EnumArgSrcDst.PCID_TO_ABL:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(b[1]), 2)}`,
        },
        { str: '{src_n}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{dst_d}', with: `0x${l[1]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCID_TO_I */
    case EnumArgSrcDst.PCID_TO_I:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(b[1]), 2)}`,
        },
        { str: '{src_n}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{dst_n}', with: xnDstN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCID_TO_IPI */
    case EnumArgSrcDst.PCID_TO_IPI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(b[1]), 2)}`,
        },
        { str: '{src_n}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{dst_n}', with: xnDstN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCID_TO_IPD */
    case EnumArgSrcDst.PCID_TO_IPD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(b[1]), 2)}`,
        },
        { str: '{src_n}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{dst_n}', with: xnDstN },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCID_TO_IWD */
    case EnumArgSrcDst.PCID_TO_IWD:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(b[1]), 2)}`,
        },
        { str: '{src_n}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{dst_d}', with: `0x${w[1]}` },
        { str: '{dst_n}', with: xnDstN },
      ]);
      break;

    /* PCID_TO_IWDI */
    case EnumArgSrcDst.PCID_TO_IWDI:
      args = rp(`${src.asmOperand},${dst.asmOperand}`, [
        {
          str: '{src_pc}',
          with: `0x${int2hex(task.pc + i + hex2int(b[1]), 2)}`,
        },
        { str: '{src_n}', with: IWDI_B[hex2bin(b[0], 8)] },
        { str: '{dst_d}', with: `0x${b[3]}` },
        { str: '{dst_n}', with: xnDstN },
        { str: '{ir}', with: IWDI_B[hex2bin(b[2], 8)] },
      ]);
      break;

    /* */
  }

  return args;
};
