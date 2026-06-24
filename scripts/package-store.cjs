#!/usr/bin/env node
/**
 * Chrome Web Store zip from dist/
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const stagingDir = path.join(distDir, '.staging');

const STORE_PATHS = ['manifest.json', 'background', 'content', 'panel', 'shared', 'icons', 'logo'];

function readManifestVersion() {
  const manifest = JSON.parse(fs.readFileSync(path.join(distDir, 'manifest.json'), 'utf8'));
  if (!manifest.version) throw new Error('dist/manifest.json missing version');
  return manifest.version;
}

function removeDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyIntoStaging() {
  removeDir(stagingDir);
  fs.mkdirSync(stagingDir, { recursive: true });

  for (const rel of STORE_PATHS) {
    const src = path.join(distDir, rel);
    const dest = path.join(stagingDir, rel);

    if (rel === 'panel') {
      fs.mkdirSync(dest, { recursive: true });
      for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        if (entry.name.endsWith('.map')) continue;
        fs.cpSync(path.join(src, entry.name), path.join(dest, entry.name), { recursive: true });
      }
      continue;
    }

    fs.cpSync(src, dest, { recursive: true });
  }
}

function createZip(zipPath) {
  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

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

function main() {
  console.log('=== Chrome Web Store package ===\n');
  execSync('node scripts/check-all.cjs', { cwd: root, stdio: 'inherit' });

  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ missing — run npm run build');
  }

  const version = readManifestVersion();
  copyIntoStaging();

  const zipName = `veo-extension-v${version}.zip`;
  const zipPath = path.join(root, 'dist', zipName);
  createZip(zipPath);
  removeDir(stagingDir);

  console.log(`\n✅ ${zipPath}`);
}

try {
  main();
} catch (error) {
  console.error(`\n❌ ${error.message}`);
  removeDir(stagingDir);
  process.exit(1);
}
