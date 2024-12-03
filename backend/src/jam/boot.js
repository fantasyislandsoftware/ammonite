/* @JAM */

import { exec, setEnv, generateUUID } from "JAM_SYSTEM";
import { loadFonts } from "JAM_FONT";
import { loadIcons } from "JAM_ICON";

/* Generate WB_SCREEN_ID */
generateUUID("WB_SCREEN_ID");
setEnv("WB_SCREEN_ID", $WB_SCREEN_ID);

/* Load Resources */
loadFonts();
loadIcons();

/* */
exec("src/jam/wb.js");
