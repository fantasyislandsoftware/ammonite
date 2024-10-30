/* @JAM */

import { log, getMem } from "JAM_SYSTEM";
import { def, label, jp } from "JAM_LOGIC";
import { openScreen, low } from "JAM_SCREEN";
import { openWindow } from "JAM_WINDOW";
import { getUnixDateTime, HOURS, MINITES, SECONDS } from "JAM_DATETIME";

def("taskId", self.id);

openScreen($taskId, 320, 256, low, "Test", "testScreenId");
openWindow($taskId, $testScreenId, 10, 10, 100, 50, "Window 1");

openScreen($taskId, 320, 256, low, "Workbench", "wbScreenId");
openWindow($taskId, $wbScreenId, 10, 10, 100, 50, "Window 1");
openWindow($taskId, $wbScreenId, 50, 50, 100, 50, "Window 2");



label("MAIN_LOOP");
label("TEST");

getUnixDateTime("newTime", SECONDS);

jpif("TEST", $oldTime === $newTime);

getUnixDateTime("oldTime", SECONDS);

jp("MAIN_LOOP");
