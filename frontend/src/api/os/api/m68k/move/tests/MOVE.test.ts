import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE } from '../MOVE';

it(`REG`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });

  /* REG_TO_REG */
  /*expect(
    MOVE(task, '0010000000000000', '01100000111111000000000000000000').asm
  ).toEqual('move.l d0,d0');*/

  /* REG_TO_ABW */
  /*expect(
    MOVE(task, '0010000111000000', '00000000000000000110000011111010').asm
  ).toEqual('move.l d0,0.w');*/

  /* REG_TO_ABL */
  /*expect(
    MOVE(task, '0010001111000000', '00000000000011110100001001000000').asm
  ).toEqual('move.l d0,0.l');*/

  /* REG_TO_I */
  /*expect(
    MOVE(task, '0010000010000000', '01100000111111000000000000000000').asm
  ).toEqual('move.l d0,(a0)');*/

  /* REG_TO_IPI */
  /*expect(
    MOVE(task, '0010000011000000', '01100000111111000000000000000000').asm
  ).toEqual('move.l d0,(a0)+');*/

  /* REG_TO_IPD */
  /*expect(
    MOVE(task, '0010000100000000', '01100000111111000000000000000000').asm
  ).toEqual('move.l d0,-(a0)');*/

  /* REG_TO_IWD */
  /*expect(
    MOVE(task, '0010000101000000', '00000000000000010110000011111010').asm
  ).toEqual('move.l d0,1(a0)');*/
});
