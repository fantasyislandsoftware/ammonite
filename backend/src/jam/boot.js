/* @JAM */

import { getPromise, exec } from "SYSTEM_API";
import { getFontList, loadFont } from "FONT_API";
import { loadIcons } from "ICON_API";

/* Load font list */
self.p = getPromise(getFontList());
label("FONT_LIST_LOADING");
jpif("FONT_LIST_LOADING", self.p.isFulfilled(), false);
self.fontList = self.p.getData();

/* Load fonts */
self.l = self.fontList.length;
self.n = 0;
label("FONT_ARRAY_LOOP");
self.font = self.fontList[self.n];

/* Load font */
self.p = getPromise(loadFont(self.font.name, self.font.path));
label("FONT_LOADING");
jpif("FONT_LOADING", self.p.isFulfilled(), false);

/* Next font or end loop */
self.n++;
jpif("FONT_ARRAY_LOOP", self.n < self.l, true);

/* Load icons */
self.p = getPromise(loadIcons());
label("ICONS_LOADING");
jpif("ICONS_LOADING", self.p.isFulfilled(), false);

/* Start workbench */
exec("/home/node/app/src/jam/workbench.js");
exec("/home/node/app/src/asm/test");
