export class M68K_API {
  constructor() {}

  /****************************************************/

  bra = (self: any, line: number) => {
    self.pos = line;
    if (line === self.pos) {
      self.pos--;
    }
  };

  /****************************************************/
}
