import { getMem } from "SYSTEM_API";
import { openScreen, low, setTitle } from "SCREEN_API";
import { openWindow } from "WINDOW_API";

self.testScreenId = openScreen(self.id, 320, 256, low, "Test");
self.wbScreenId = openScreen(self.id, 320, 256, low, "Workbench");

openWindow(self.id, self.wbScreenId, 10, 10, 100, 50, "Window 1");

self.startTime = Date.now();
self.iSec = 10;

label("MAIN_LOOP");
self.oldTime = Math.round((self.endTime - self.startTime) / 1000 / self.iSec);
self.endTime = Date.now();
self.newTime = Math.round((self.endTime - self.startTime) / 1000 / self.iSec);
if (self.oldTime !== self.newTime)
  setTitle(self.wbScreenId, `Workbench  ${getMem().freeStr} free mem`);
jp("MAIN_LOOP");
