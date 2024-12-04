/* @JAM */

import { label, jp, add } from "JAM_LOGIC";
import { openWindow, DEFAULT } from "JAM_WINDOW";
import { drawText } from "JAM_GRAPHICS";

def("x", 10);

/* Get global wb screen id */
getEnv("WB_SCREEN_ID", "wbScreenId");

openWindow(
  NEW_ID,
  $wbScreenId,
  DEFAULT,
  140,
  40,
  150,
  150,
  "Task Manager",
  "windowId"
);

//drawText($wbScreenId, $windowId, $x, 0, "Hello, World!");

def("newTime");
def("oldTime");
def("interval", 1);

{
  label("MAIN_LOOP");

  getUnixDateTime(SECONDS * $interval, "newTime");

  jpIfElse("MAIN", "UPDATE", $oldTime === $newTime);

  label("MAIN");
  jp("MAIN_LOOP");

  label("UPDATE");
  drawText($wbScreenId, $windowId, 10, $x, "Hello, World!");
  //add("x", 4);

  getUnixDateTime(SECONDS * $interval, "oldTime");

  jp("MAIN_LOOP");
}
