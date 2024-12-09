/* @JAM */

import { log, getMem } from "JAM_SYSTEM";
import { def, label, jp, jpIfElse, jif } from "JAM_LOGIC";
import { openScreen, setTitle, LOW, HI } from "JAM_SCREEN";
import { openWindow, DEFAULT } from "JAM_WINDOW";
import { getUnixDateTime, HOURS, MINITES, SECONDS } from "JAM_DATETIME";

/* Get global wb screen id */
getEnv({ key: "WB_SCREEN_ID", ret: "wbScreenId" });

openScreen({
  id: $wbScreenId,
  x: 0,
  y: 0,
  width: 320,
  height: 256,
  depth: 16,
  mode: LOW,
  title: "Workbench",
  ret: null,
});

openWindow(NEW_ID, $wbScreenId, DEFAULT, 10, 10, 100, 50, "Window 1");

exec({ path: "src/jam/taskManager.js" });

def({ v: "newTime" });
def({ v: "oldTime" });
def({ v: "interval", value: 5 });

{
  label({ name: "MAIN_LOOP" });

  getUnixDateTime({ ms: SECONDS * $interval, ret: "newTime" });

  jpc({ if: $oldTime === $newTime, then: "MAIN", else: "UPDATE_BAR" });

  label({ name: "MAIN" });
  jp({ label: "MAIN_LOOP" });

  label({ name: "UPDATE_BAR" });
  getMem({ ret: "mem" });
  setTitle({
    screenId: $wbScreenId,
    title: "Workbench " + $mem.freeStr + " free",
  });

  getUnixDateTime({ ms: SECONDS * $interval, ret: "oldTime" });

  jp({ label: "MAIN_LOOP" });
}
