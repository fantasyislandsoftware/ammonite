export class LOGIC_API {
  constructor() {}

  /****************************************************/

  jp = (self: any, label: string) => {
    self.pos = self.label[label];
  };

  /****************************************************/

  jpif = (self: any, label: string, condition?: any, value?: any) => {
    if (condition === value) {
      self.pos = self.label[label];
    }
  };
  /****************************************************/
}
