define(wbScreenId, 0);
define(testWindowId, 0);
openScreen(320, 256, low, "Workbench", wbScreenId);
//openWindow(wbScreenId, 10, 10, 100, 100, "Test Window", testWindowId);

screenDrawText(wbScreenId, 10, 10, "Arial", 10, "Hello World!", 0, 1);

label(START);
jmp(START);
