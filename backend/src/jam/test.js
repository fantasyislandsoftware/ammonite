/* @JAM */

import { openScreen, LOW } from "JAM_SCREEN";
import { label, jp } from "JAM_LOGIC";

openScreen({
  id: null,
  x: 0,
  y: 0,
  width: 320,
  height: 256,
  depth: 16,
  mode: LOW,
  title: "test",
  dpen: 0,
  bpen: 1,
  ret: "testscreen",
});

/*openWindow({
  id: null,
  parentScreenId: $testscreen,
  state: DEFAULT,
  x: 10,
  y: 15,
  width: 100,
  height: 50,
  title: "Window 1",
  ret: null,
});*/

{
  label({ name: "MAIN_LOOP" });
  jp({ label: "MAIN_LOOP" });
}
