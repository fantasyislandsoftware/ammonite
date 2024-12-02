/* @JAM */

import { label, jp } from "JAM_LOGIC";
import { openWindow, DEFAULT } from "JAM_WINDOW";

/* Get global wb screen id */
getEnv("WB_SCREEN_ID", "wbScreenId");

openWindow(NEW_ID, $wbScreenId, DEFAULT, 140, 40, 150, 150, "Task Manager");

label("MAIN_LOOP");
jp("MAIN_LOOP");
