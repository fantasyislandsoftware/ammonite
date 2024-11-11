/* @JAM */

import { exec } from "JAM_SYSTEM";
import { loadFonts } from "JAM_FONT";
import { loadIcons } from "JAM_ICON";

/* Liad Resources */
loadFonts();
loadIcons();

/* */
exec("src/jam/wb.js");
//exec("src/jam/test.js");
//exec("src/asm/test");
