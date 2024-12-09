/* @JAM */

import { exec, setEnv, generateUUID } from "JAM_SYSTEM";
import { loadFonts } from "JAM_FONT";
import { loadIcons } from "JAM_ICON";

/* Generate WB_SCREEN_ID */
generateUUID({ ret: "WB_SCREEN_ID" });
setEnv({ key: "WB_SCREEN_ID", value: $WB_SCREEN_ID });

/* Load Resources */
loadFonts();
loadIcons();

/* */
exec({ path: "src/jam/wb.js" });
