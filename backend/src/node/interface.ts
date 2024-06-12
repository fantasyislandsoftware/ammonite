export interface Express {
  get: (path: string, callback: (req: any, res: any) => void) => void;
}
