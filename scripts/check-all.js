#!/usr/bin/env node
/** Sanity check before reload extension or upload store. */
const path = require('path');
const { execSync } = require('child_process');
const { pathToFileURL } = require('url');

const root = path.join(__dirname, '..');

const jsFiles = [
  'shared/config.js',
  'background/background.js',
  'content/content.js',
  'content/upload-hook.js',
  'panel/bootstrap.js',
  'panel/i18n/messages.js',
  'panel/app.js',
];

let failed = false;

console.log('=== Build panel ===');
try {
  execSync('node scripts/build-panel.js', { cwd: root, stdio: 'inherit' });
} catch {
  failed = true;
}

console.log('\n=== Syntax (node --check) ===');
for (const rel of jsFiles) {
  const abs = path.join(root, rel);
  if (!fsExists(abs)) {
    console.error(`  FAIL  missing ${rel}`);
    failed = true;
    continue;
  }
  try {
    execSync(`node --check "${abs}"`, { stdio: 'pipe' });
    console.log(`  OK  ${rel}`);
  } catch {
    console.error(`  FAIL  ${rel}`);
    failed = true;
  }
}

  console.log('\n=== ES module parse (panel/app.js) ===');
  const appSrc = require('fs').readFileSync(path.join(root, 'panel/app.js'), 'utf8');
  if (appSrc.includes("from '../i18n/messages.js'")) {
    console.error('  FAIL  panel/app.js — wrong i18n path (run npm run build:panel)');
    failed = true;
  }
  if (!appSrc.includes('./i18n/messages.js')) {
    console.error('  FAIL  panel/app.js — missing ./i18n/messages.js import');
    failed = true;
  }
  (async () => {
  try {
    await import(pathToFileURL(path.join(root, 'panel/app.js')).href);
    console.log('  OK  panel/app.js imports (runtime may warn outside Chrome)');
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.error(`  FAIL  panel/app.js — ${e.message}`);
      failed = true;
    } else {
      console.log(`  OK  panel/app.js parses (${e.constructor.name} at runtime is expected outside Chrome)`);
    }
  }

  console.log('\n=== Config ===');
  try {
    const { getRemoteConfig } = await import(pathToFileURL(path.join(root, 'shared/config.js')).href);
    const cfg = await getRemoteConfig();
    console.log(`  OK  ${Object.keys(cfg.selectors || {}).length} Flow selectors`);
  } catch (e) {
    console.error(`  FAIL  shared/config.js — ${e.message}`);
    failed = true;
  }

  if (failed) {
    console.error('\n❌ Có lỗi — sửa rồi chạy: npm run check');
    process.exit(1);
  }

  console.log('\n✅ OK — reload extension tại chrome://extensions');
  console.log(`   Folder: ${root}`);
  console.log('\nSửa panel: panel/parts/*.js hoặc panel/i18n/messages.js → npm run build:panel');
})();

function fsExists(p) {
  try {
    require('fs').accessSync(p);
    return true;
  } catch {
    return false;
  }
}
