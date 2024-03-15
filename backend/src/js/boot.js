/* Load fonts */
loadFonts(fonts);
label(FONT_LOADING);
getPromiseState(fonts, A);
jmpIf(A, eq, 0, FONT_LOADING);
log("fonts loaded");

/* Start workbench */
exec("/home/node/app/src/js/workbench.js");
