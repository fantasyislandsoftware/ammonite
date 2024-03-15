/* Load font list */
loadFontList(prFontList, fonts);
label(FONT_LOADING);
getPromiseState(prFontList, prFontListState);
jmpIf(prFontListState, eq, 0, FONT_LOADING);
log("font list loaded");

/* Load fonts */
define(n, 0);
define(m, 0);
lengthOf(fonts, m);

label(LOOP);
jmp(LOOP);

/* Start workbench */
exec("/home/node/app/src/js/workbench.js");
