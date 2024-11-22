/* @JAM */

import { log, getMem } from "JAM_SYSTEM";
import { def, label, jp, jpIfElse } from "JAM_LOGIC";
import { openScreen, setTitle, low } from "JAM_SCREEN";
import { openWindow } from "JAM_WINDOW";
import { getUnixDateTime, HOURS, MINITES, SECONDS } from "JAM_DATETIME";

def("taskId", self.id);

openScreen($taskId, 320, 256, low, "Test", "testScreenId");
openWindow(null, $taskId, $testScreenId, 10, 10, 100, 50, "Window 1");

openScreen($taskId, 320, 256, low, "Workbench", "wbScreenId");
openWindow(null, $taskId, $wbScreenId, 10, 10, 100, 50, "Window 1");
openWindow(null, $taskId, $wbScreenId, 50, 50, 100, 50, "Window 2");

def("newTime");
def("oldTime");
def("interval", 5);

label("MAIN_LOOP");

getUnixDateTime("newTime", SECONDS * $interval);

jpIfElse("MAIN", "UPDATE_BAR", $oldTime === $newTime);

label("MAIN");
jp("MAIN_LOOP");

label("UPDATE_BAR");
getMem("mem");
setTitle($wbScreenId, "Workbench " + $mem.freeStr + " free");

getUnixDateTime("oldTime", SECONDS * $interval);

jp("MAIN_LOOP");
