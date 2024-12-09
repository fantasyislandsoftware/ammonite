import { EEventState } from 'constants/globals/interface';
import { STATE } from 'constants/globals/state';

export class JAM_EVENT {
  /****************************************************/

  private timeOut: any = null;

  /****************************************************/

  wait = async (
    task = null,
    props: { milliseconds: number; callback: any }
  ) => {
    const { milliseconds, callback } = props;
    STATE.eventState = EEventState.STOPPED;
    STATE.events = [];
    this.timeOut = setTimeout(() => {
      console.log('wait');
      STATE.eventState = EEventState.RUNNING;
      this.timeOut = null;
    }, milliseconds);
  };

  /****************************************************/
}
