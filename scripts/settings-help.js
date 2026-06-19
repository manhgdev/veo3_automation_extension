#!/usr/bin/env node
/** Print fix commands for common extension errors. */
const root = require('path').join(__dirname, '..');

console.log(`
=== VEO Automation — LỆNH SỬA LỖI ===

1) KIỂM TRA CODE (PowerShell)
-----------------------------
Set-Location "${root}"
npm run check

Thấy "OK" → reload extension. Thấy "FAIL" → sửa file báo lỗi rồi chạy lại.

2) RELOAD EXTENSION (bắt buộc mỗi lần sửa code)
-----------------------------------------------
chrome://extensions
  → Bật "Developer mode"
  → Reload "VEO Automation"
  → Mở https://labs.google/fx/tools/flow
  → F5 refresh tab Flow
  → Mở Side Panel extension

Load lần đầu: Load unpacked → ${root}

3) RESET SETTINGS (Side Panel → F12 → Console → dán)
------------------------------------------------------
chrome.storage.local.get("flow_automation_settings", async (r) => {
  const s = r.flow_automation_settings || {};
  s.concurrentPrompts = 2;
  s.promptDelaySecondsMin = 25;
  s.promptDelaySecondsMax = 35;
  s.maxRetries = 5;
  s.outputCount = 1;
  s.migrationVersion = 6;
  await chrome.storage.local.set({ flow_automation_settings: s });
  console.log("OK — đóng/mở lại Side Panel");
});

4) XÓA QUEUE CŨ / LỖI (tab Google Flow → F12 → Console)
---------------------------------------------------------
chrome.runtime.sendMessage({ type: "CONTENT_SCRIPT_RESET" });
location.reload();

5) XEM LỖI CHI TIẾT
--------------------
Tab Google Flow  → F12 → Console  (automation chạy ở đây)
Side Panel       → F12 → Console  (UI extension)

6) LỖI THƯỜNG GẶP
------------------
| Triệu chứng              | Làm gì                                      |
|--------------------------|---------------------------------------------|
| Group "Lỗi" ngay         | Reload ext + F5 Flow + npm run check        |
| Receiving end not exist  | Mở tab Flow trước, F5, rồi Run              |
| Fail nhiều prompt        | concurrent=2, delay 25-35s (Settings)       |
| Panel trắng              | node --check panel\\\\app.js                  |
| Vẫn lỗi cũ sau sửa code  | Reload extension + F5 Flow (2 bước bắt buộc)|

7) KIỂM TRA TỪNG FILE
---------------------
node --check "${root.replace(/\\/g, '/')}/content/content.js"
node --check "${root.replace(/\\/g, '/')}/panel/app.js"
node --check "${root.replace(/\\/g, '/')}/background/background.js"
`);
