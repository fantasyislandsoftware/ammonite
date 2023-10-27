import { ENV } from 'constants/env';
import { eventLog } from 'functions/events/debug';
import { EnumOSEventType, OSEvent } from 'interface/event';
import { IScreen, IScreenTitleBarIcon } from 'interface/screen';

export const handleScreenTitleBarIconEvents = (
  event: OSEvent,
  screen: IScreen,
  icon: IScreenTitleBarIcon
) => {
  eventLog(event, 'Screen Titlebar Icon');
};
