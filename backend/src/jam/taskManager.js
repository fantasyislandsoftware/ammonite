/* @JAM */

import { label, jp, add, jif } from "JAM_LOGIC";
import { openWindow, DEFAULT } from "JAM_WINDOW";
import { textOut, drawImage } from "JAM_GRAPHICS";
import { getIcon } from "JAM_ICON";

def({ v: "x", value: 10 });

/* Get global wb screen id */
getEnv({ key: "WB_SCREEN_ID", ret: "wbScreenId" });

openWindow({
  id: null,
  parentScreenId: $wbScreenId,
  state: DEFAULT,
  x: 140,
  y: 40,
  width: 150,
  height: 150,
  title: "Task Manager",
  ret: "windowId",
});

//textOut($wbScreenId, $windowId, 60, 50, "Hello, World!");
//getIcon(0, "icon");
//drawImage($wbScreenId, $windowId,$icon, 120, 0, );

def({ v: "newTime" });
def({ v: "oldTime" });
def({ v: "interval", value: 1 });

{
  label({ name: "MAIN_LOOP" });

  getUnixDateTime({ ms: SECONDS * $interval, ret: "newTime" });

  jpc({ if: $oldTime === $newTime, then: "MAIN", else: "UPDATE" });

  label({ name: "MAIN" });
  jp({ label: "MAIN_LOOP" });

  label({ name: "UPDATE" });
  //textOut($wbScreenId, $windowId, 10, $x, "Hello, World!");
  //add("x", 4);

  getUnixDateTime({ ms: SECONDS * $interval, ret: "oldTime" });

  jp({ label: "MAIN_LOOP" });
}
