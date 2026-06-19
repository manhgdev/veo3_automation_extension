#!/usr/bin/env node
/** Quick sanity check before reloading the extension. */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { pathToFileURL } = require('url');

const root = path.join(__dirname, '..');

const jsFiles = [
  'shared/remote-config.js',
  'shared/fallback-flow-config.js',
  'background/background.js',
  'content/content.js',
  'content/upload-hook.js',
  'panel/app.js',
];

let failed = false;

console.log('=== 1. Syntax check ===');
for (const rel of jsFiles) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    console.error(`  MISSING  ${rel}`);
    failed = true;
    continue;
  }
  try {
    execSync(`node --check "${abs}"`, { stdio: 'pipe' });
    console.log(`  OK       ${rel}`);
  } catch {
    console.error(`  FAIL     ${rel}  (syntax error)`);
    failed = true;
  }
}

console.log('\n=== 2. Manifest ===');
const manifestPath = path.join(root, 'manifest.json');
try {
  JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log('  OK       manifest.json');
} catch (e) {
  console.error(`  FAIL     manifest.json — ${e.message}`);
  failed = true;
}

console.log('\n=== 3. Remote config (optional) ===');
(async () => {
  try {
    const { getRemoteConfig } = await import(pathToFileURL(path.join(root, 'shared/remote-config.js')).href);
    const cfg = await getRemoteConfig();
    const keys = Object.keys(cfg?.selectors || {}).length;
    console.log(`  OK       getRemoteConfig() → ${keys} selectors`);
  } catch (e) {
    console.error(`  FAIL     getRemoteConfig() — ${e.message}`);
    failed = true;
  }

  console.log('\n=== 4. Reload extension ===');
  console.log('  1. Mở chrome://extensions');
  console.log('  2. Bật "Developer mode"');
  console.log('  3. Bấm Reload trên "VEO Automation"');
  console.log('  4. Mở tab: https://labs.google/fx/tools/flow');
  console.log('  5. F5 refresh tab Flow, rồi mở Side Panel extension');
  console.log(`\n  Load unpacked folder:\n  ${root}`);
  console.log('\n=== 5. Prompt đồng thời ===');
  console.log('  Settings: concurrent 2, delay 25–35s (max 3 worker)');
  console.log('  Chi tiết: npm run settings:help');

  if (failed) {
    console.error('\n❌ Có lỗi — sửa xong rồi chạy lại: npm run check');
    process.exit(1);
  }
  console.log('\n✅ OK — reload extension rồi test trên Google Flow.');
})();
