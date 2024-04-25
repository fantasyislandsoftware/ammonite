define(wbScreenId, 0);
define(testWindowIdA, 0);
define(testWindowIdB, 0);
define(system, 0);
define(canvas, 0);

openScreen(320, 256, low, "Workbench", wbScreenId);
drawImage(screen, wbScreenId, 0, 0, 0, 0);

openWindow(wbScreenId, 10, 10, 100, 50, "Test Window", testWindowIdA);
openWindow(wbScreenId, 100, 100, 100, 50, "Test Window2", testWindowIdB);

label(START);
jmp(START);
