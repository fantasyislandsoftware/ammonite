define(wbScreenId, 0);
define(testWindowId, 0);
define(testWindowId, 0);
openScreen(320, 256, low, "Workbench", wbScreenId);
openScreen(320, 256, low, "test", testScreenId);

//openWindow(wbScreenId, 10, 10, 100, 100, "Test Window", testWindowId);
label(START);
jmp(START);
