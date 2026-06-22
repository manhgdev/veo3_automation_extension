#!/usr/bin/env node
/**
 * Build a .zip for Chrome Web Store upload (Developer Dashboard → Package).
 * Includes only runtime extension files — no node_modules, scripts, or docs.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const stagingDir = path.join(distDir, '.staging');

/** Paths relative to extension root that must be in the store package. */
const STORE_PATHS = [
  'manifest.json',
  'background',
  'content',
  'panel',
  'shared',
  'icons',
  'logo',
];

function readManifestVersion() {
  const manifestPath = path.join(root, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!manifest.version) {
    throw new Error('manifest.json is missing "version".');
  }
  return manifest.version;
}

function assertStorePathsExist() {
  const missing = STORE_PATHS.filter((rel) => !fs.existsSync(path.join(root, rel)));
  if (missing.length) {
    throw new Error(`Missing required paths for store package:\n  ${missing.join('\n  ')}`);
  }
}

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyIntoStaging() {
  removeDir(stagingDir);
  fs.mkdirSync(stagingDir, { recursive: true });

  for (const rel of STORE_PATHS) {
    const src = path.join(root, rel);
    const dest = path.join(stagingDir, rel);
    fs.cpSync(src, dest, { recursive: true });
  }
}

function createZip(zipPath) {
  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  if (process.platform === 'win32') {
    const psStaging = stagingDir.replace(/'/g, "''");
    const psZip = zipPath.replace(/'/g, "''");
    execSync(
      `powershell -NoProfile -Command "Get-ChildItem -Path '${psStaging}' | Compress-Archive -DestinationPath '${psZip}' -Force"`,
      { stdio: 'inherit' },
    );
    return;
  }

  execSync(`cd "${stagingDir}" && zip -r "${zipPath}" .`, { stdio: 'inherit' });
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function main() {
  console.log('=== Chrome Web Store package ===\n');

  console.log('1. Build panel + check ...');
  execSync('node scripts/check-all.js', { cwd: root, stdio: 'inherit' });

  console.log('\n2. Validating extension files ...');
  assertStorePathsExist();
  const version = readManifestVersion();

  console.log('3. Staging files ...');
  copyIntoStaging();

  const zipName = `veo-extension-v${version}.zip`;
  const zipPath = path.join(distDir, zipName);

  console.log('4. Creating zip ...');
  createZip(zipPath);
  removeDir(stagingDir);

  const size = fs.statSync(zipPath).size;
  console.log('\n✅ Store package ready');
  console.log(`   File: ${zipPath}`);
  console.log(`   Size: ${formatBytes(size)}`);
  console.log(`
Upload:
  1. https://chrome.google.com/webstore/devconsole
  2. Chọn extension → Package → Upload new package
  3. Chọn file: ${zipName}

Lưu ý:
  - Tăng "version" trong manifest.json trước mỗi lần upload bản mới
  - Zip chỉ chứa: ${STORE_PATHS.join(', ')}
  - Không upload node_modules, scripts/, docs/
`);
}

try {
  main();
} catch (error) {
  console.error(`\n❌ Package failed: ${error.message}`);
  removeDir(stagingDir);
  process.exit(1);
}
