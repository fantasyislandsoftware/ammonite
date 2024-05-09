define(wbScreenId, 0);
define(testScreenId, 0);
define(testWindowIdA, 0);
define(testWindowIdB, 0);
define(system, 0);
define(canvas, 0);

openScreen(320, 256, low, "Test", testScreenId);
openScreen(320, 256, low, "Workbench", wbScreenId);

drawImage(screen, wbScreenId, 0, 0, 0, 0);

openWindow(wbScreenId, 10, 10, 100, 50, "1 - Test", testWindowIdA);
openWindow(wbScreenId, 30, 30, 100, 50, "2 - Test", testWindowIdB);

label(START);
jmp(START);
