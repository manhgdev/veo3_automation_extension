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

    if (!fs.existsSync(src)) {
      throw new Error(`dist/${rel} missing — run npm run build`);
    }

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

function assertZipContents(zipPath) {
  const stat = fs.statSync(zipPath);
  if (stat.size < 50_000) {
    throw new Error(`zip too small (${stat.size} bytes) — packaging failed`);
  }

  const listing = execSync(`tar -tf "${zipPath}"`, { encoding: 'utf8' });
  const entries = listing.trim().split(/\r?\n/).filter(Boolean);
  const hasManifest = entries.some((entry) => {
    const normalized = entry.replace(/\\/g, '/').replace(/^\.\//, '');
    return normalized === 'manifest.json';
  });
  if (!hasManifest) {
    throw new Error('zip missing manifest.json at root');
  }
  if (entries.length < 10) {
    throw new Error(`zip has too few entries (${entries.length})`);
  }
  console.log(`  OK  ${entries.length} entries (manifest.json at root)`);
}

function createZip(zipPath) {
  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  if (process.platform === 'win32') {
    const psStaging = path.resolve(stagingDir).replace(/'/g, "''");
    const psZip = path.resolve(zipPath).replace(/'/g, "''");
    // Compress-Archive: Explorer/Chrome Web Store đọc được (không có prefix ./)
    execSync(
      `powershell -NoProfile -Command "Compress-Archive -Path '${psStaging}\\*' -DestinationPath '${psZip}' -CompressionLevel Optimal -Force"`,
      { stdio: 'inherit', timeout: 120_000 },
    );
  } else {
    execSync(`tar -a -cf "${zipPath}" -C "${stagingDir}" .`, { stdio: 'inherit' });
  }

  assertZipContents(zipPath);
}

function main() {
  console.log('=== Chrome Web Store package ===\n');
  execSync('node scripts/check-all.cjs', { cwd: root, stdio: 'inherit' });

  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ missing — run npm run build');
  }

  const version = readManifestVersion();
  console.log(`\n=== Staging v${version} ===`);
  copyIntoStaging();
  console.log('  OK  copied store files');

  const zipName = `veo-extension-v${version}.zip`;
  const zipPath = path.join(root, 'dist', zipName);
  console.log(`\n=== Zip ${zipName} ===`);
  createZip(zipPath);
  removeDir(stagingDir);

  const sizeMb = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(2);
  console.log(`\n✅ ${zipPath} (${sizeMb} MB)`);
}

try {
  main();
} catch (error) {
  console.error(`\n❌ ${error.message}`);
  removeDir(stagingDir);
  process.exit(1);
}
