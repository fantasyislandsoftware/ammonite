import { ENV } from 'constants/env';
import { OSEvent } from 'interface/event';

export const eventLog = (event: OSEvent, name: string) => {
  ENV.eventDebug && console.log(`${name} {${event.type}}`);
};
