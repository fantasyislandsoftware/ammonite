/* @JAM */

import { log, getMem } from "JAM_SYSTEM";
import { def, label, jp, jpIfElse } from "JAM_LOGIC";
import { openScreen, setTitle, LOW, HI } from "JAM_SCREEN";
import { openWindow, DEFAULT } from "JAM_WINDOW";
import { getUnixDateTime, HOURS, MINITES, SECONDS } from "JAM_DATETIME";

/* Get global wb screen id */
getEnv("WB_SCREEN_ID", "wbScreenId");

openScreen($wbScreenId, 320, 256, LOW, "Workbench", null);
openWindow(NEW_ID, $wbScreenId, DEFAULT, 10, 10, 100, 50, "Window 1");
//openWindow(NEW_ID, $wbScreenId, DEFAULT, 50, 50, 100, 50, "Window 2");

exec("src/jam/taskManager.js");

def("newTime");
def("oldTime");
def("interval", 5);

label("MAIN_LOOP");

getUnixDateTime(SECONDS * $interval, "newTime");

jpIfElse("MAIN", "UPDATE_BAR", $oldTime === $newTime);

label("MAIN");
jp("MAIN_LOOP");

label("UPDATE_BAR");
getMem("mem");
setTitle($wbScreenId, "Workbench " + $mem.freeStr + " free");

getUnixDateTime(SECONDS * $interval, "oldTime");

jp("MAIN_LOOP");
