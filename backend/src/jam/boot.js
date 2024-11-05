/* @JAM */

import { exec } from "JAM_SYSTEM";
import { label, def, forLoop } from "JAM_LOGIC";
import { getFontList, loadFont } from "JAM_FONT";
import { loadIcons } from "JAM_ICON";

log("test");

/* Load font list */
getFontList("fontList");

/* Load fonts */
def("i", 0);
label("loadFontsLoop");
def("fontName", $fontList[$i].name);
def("fontPath", $fontList[$i].path);
loadFont($fontName, $fontPath);
forLoop("loadFontsLoop", "i", $fontList.length, 1);

/* Load icons */
loadIcons();

/* */
exec("src/jam/wb.js");
//exec("src/jam/test.js");
//exec("src/asm/test");
