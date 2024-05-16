define(wbScreenId, 0);
define(wbWindowIdA, 0);
define(wbWindowIdB, 0);

define(testScreenId, 0);
define(testWindowIdA, 0);

define(system, 0);
define(canvas, 0);

openScreen(320, 256, low, "Test", testScreenId);
openScreen(320, 256, low, "Workbench", wbScreenId);

drawImage(screen, wbScreenId, 0, 0, 0, 0);

openWindow(wbScreenId, 10, 10, 100, 50, "1 - Test", wbWindowIdA);
openWindow(wbScreenId, 30, 30, 100, 50, "2 - Test", wbWindowIdB);

openWindow(testScreenId, 30, 30, 100, 50, "Test", testWindowIdA);

label(START);
jmp(START);
