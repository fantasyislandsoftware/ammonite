/* Load font list */
loadFontList(prFontList, fonts);
label(FONT_LIST_LOADING);
getPromiseState(prFontList, prFontListState);
jmpIf(prFontListState, eq, 0, FONT_LIST_LOADING);
log("font list loaded");

/* Load fonts */
define(n, 0);
define(fontCount, 0);
lengthOf(fonts, fontCount);
define(fontName, "");
define(fontPath, "");
// ** //
label(FONT_LOADING_LOOP);
getArrayElement(fonts, n, "", font);
getFieldValue(font, name, fontName);
getFieldValue(font, path, fontPath);
addFont(fontName, fontPath, prFontLoad);
label(FONT_LOADING);
getPromiseState(prFontLoad, prFontLoadState);
jmpIf(prFontLoadState, eq, 0, FONT_LOADING);
add(n, 1);
jmpIf(n, notEq, fontCount, FONT_LOADING_LOOP);
log("fonts loaded");

/* Load Icons */
loadIcons(prIcons);

/* Temp loop */
//label(LOOP);
//jmp(LOOP);

/* Start workbench */
exec("/home/node/app/src/js/workbench.js");
