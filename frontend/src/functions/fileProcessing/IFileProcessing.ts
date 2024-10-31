export enum ENUM_HUNK_FILE_TYPE {
  JAM = 'jam',
  AMIGA = 'amiga',
}

export enum ENUM_HUNK_TYPE {
  HUNK_CODE = 'HUNK_CODE',
  HUNK_DATA = 'HUNK_DATA',
}

export interface IJamDataHunk {
  line: number;
  command: string;
}

export interface IAmigaDataHunk {
  addr: string;
  hex: string;
  op: string;
  arg: string;
}

export interface IHunk {
  type: ENUM_HUNK_TYPE;
  hunkData: IJamDataHunk[] & IAmigaDataHunk[];
}

export interface IHunks {
  type: ENUM_HUNK_FILE_TYPE;
  raw: Buffer;
  hunks: IHunk[];
}
