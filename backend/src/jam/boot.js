/* @JAM */

import { getPromise, exec } from "SYSTEM_API";
import { label, jpif } from "LOGIC_API";
import { getFontList, loadFont } from "FONT_API";
import { loadIcons } from "ICON_API";

/* Load font list */
self.p = getPromise(getFontList());
label("FONT_LIST_LOADING");
jpif(self, "FONT_LIST_LOADING", self.p.isFulfilled(), false);
self.fontList = self.p.getData();

/* Load fonts */
self.l = self.fontList.length;
self.n = 0;
label("FONT_ARRAY_LOOP");
self.font = self.fontList[self.n];

/* Load font */
self.p = getPromise(loadFont(self.font.name, self.font.path));
label("FONT_LOADING");
jpif(self, "FONT_LOADING", self.p.isFulfilled(), false);

/* Next font or end loop */
self.n++;
jpif(self, "FONT_ARRAY_LOOP", self.n < self.l, true);

/* Load icons */
self.p = getPromise(loadIcons());
label("ICONS_LOADING");
jpif(self, "ICONS_LOADING", self.p.isFulfilled(), false);

/*
    console.log('test');
*/

/* Start workbench */
exec("/home/node/app/src/jam/workbench.js");
//exec("/home/node/app/src/asm/test");
//exec("/home/node/app/src/exe/calc", true);
