import { openScreen, low, setTitle } from "SCREEN_API";
import { openWindow } from "WINDOW_API";

self.wbScreenId = openScreen(self.id, 320, 256, low, "Workbench");

openWindow(self.id, self.wbScreenId, 10, 10, 100, 50, "Window 1");

setTitle(self.wbScreenId, "hello hello");
label("MAIN_LOOP");
jp("MAIN_LOOP");
