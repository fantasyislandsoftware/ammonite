/* @JAM */

import { LOW } from "JAM_SCREEN";
import { label, jp } from "JAM_LOGIC";
import { Screen } from "BB_SCREEN";
import { BitMap } from "BB_BITMAP";
import { Window } from "BB_WINDOW";

BitMap({ id: 0, width: 320, height: 256, depth: 16 });

Screen({
  id: 0,
  offsetX: 0,
  offsetY: 0,
  width: 320,
  height: 256,
  depth: 16,
  mode: LOW,
  title: "test",
  bpen: 0,
  dpen: 1,
});

Window({
  id: 0,
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  flags: 2,
  title: "test",
  dpen: 0,
  bpen: 1,
});

{
  label({ name: "MAIN_LOOP" });
  jp({ label: "MAIN_LOOP" });
}
