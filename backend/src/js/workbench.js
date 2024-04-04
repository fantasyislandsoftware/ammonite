define(wbScreenId, 0);
define(testWindowId, 0);
define(system, 0);
openScreen(320, 256, low, "Workbench", wbScreenId);

drawIcon(wbScreenId, 0, 0, system);

label(START);
jmp(START);
