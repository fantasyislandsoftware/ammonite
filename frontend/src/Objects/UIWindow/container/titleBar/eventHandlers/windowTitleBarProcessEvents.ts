import { IEvent } from 'interface/event';

export const windowTitleBarProcessEvents = (event: IEvent) => {
  console.log(event.mouse?.position.x, event.mouse?.position.y);
  //console.log(event.objects.window?.titleBar?.title);
};
