import { ENV } from 'src/constants/env';
import { IBaseEvent } from 'src/interface/event';

export const eventLog = (event: IBaseEvent, name: string) => {
  ENV.eventDebug && console.log(`${name} {${event.type}}`);
};
