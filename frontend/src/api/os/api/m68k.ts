export class M68K_API {
  constructor() {}

  /****************************************************/

  move_8 = (self: any, arg: string) => {
    console.log(arg);
  };

  /****************************************************/

  bra = (self: any, line: number) => {
    self.pos = line;
    if (line === self.pos) {
      self.pos--;
    }
  };

  /****************************************************/

  rts = (self: any) => {};

  /****************************************************/

  nc = (line: string) => {};

  /****************************************************/
}
