import { EEventState } from 'constants/globals/interface';
import { STATE } from 'constants/globals/state';

export class JAM_EVENT {
  /****************************************************/

  wait = async (task = null, milliseconds: number) => {
    STATE.eventState = EEventState.STOPPED;
    setTimeout(() => {
      STATE.eventState = EEventState.RUNNING;
    }, milliseconds);
  };

  /****************************************************/
}
