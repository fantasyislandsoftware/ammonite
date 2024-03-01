import { ENV } from 'constants/env';
import { IBaseEvent } from 'interface/event';

export const eventLog = (event: IBaseEvent, name: string) => {
  ENV.eventDebug && console.log(`${name} {${event.type}}`);
};
