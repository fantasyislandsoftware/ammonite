/* @JAM */

import { label, jp } from "JAM_LOGIC";
import { openWindow, DEFAULT } from "JAM_WINDOW";
import { drawText } from "JAM_GRAPHICS";

/* Get global wb screen id */
getEnv("WB_SCREEN_ID", "wbScreenId");

openWindow(NEW_ID, $wbScreenId, DEFAULT, 140, 40, 150, 150, "Task Manager", "windowId");

//drawText($wbScreenId, $windowId, "Hello, World!");

def("newTime");
def("oldTime");
def("interval", 5);

label("MAIN_LOOP");

getUnixDateTime(SECONDS * $interval, "newTime");

jpIfElse("MAIN", "UPDATE", $oldTime === $newTime);

label("MAIN");
jp("MAIN_LOOP");

label("UPDATE");
drawText($wbScreenId, $windowId, "Hello, World!");

getUnixDateTime(SECONDS * $interval, "oldTime");

jp("MAIN_LOOP");
