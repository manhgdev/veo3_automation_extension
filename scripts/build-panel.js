#!/usr/bin/env node
/**
 * Build panel/app.js from source parts.
 *
 *   npm run build:panel              — concat parts → panel/app.js
 *   npm run build:panel -- --split   — split monolithic app.js → parts (one-time)
 *   npm run build:panel -- --resplit — split parts/04-extension.js → smaller parts
 *   npm run decode:panel             — format + decode unicode on editable parts
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.join(__dirname, '..');
const panelDir = path.join(root, 'panel');
const partsDir = path.join(panelDir, 'parts');
const i18nDir = path.join(panelDir, 'i18n');
const appPath = path.join(panelDir, 'app.js');

/** Concat order — Chrome loads generated panel/app.js only. */
const PART_FILES = [
  '00-imports.js',
  '01-utils.js',
  '02-locale.js',
  '03-vendor.js',
  '04-core.js',
  '05-xlsx.js',
  '06-components.js',
  '07-primevue-extra.js',
  '08-boot.js',
];

/** Parts to decode/beautify (skip huge vendor/xlsx bundles). */
const DECODE_PARTS = new Set([
  '00-imports.js',
  '04-core.js',
  '06-components.js',
  '08-boot.js',
]);

const LEGACY_PART = '04-extension.js';
const LEGACY_BOOT = '05-boot.js';

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writePart(name, content) {
  const header = name.startsWith('0') && name.includes('imports')
    ? ''
    : name === '05-xlsx.js'
      ? '/** SheetJS (embedded) — do not edit; import spreadsheet only */\n'
      : name === '07-primevue-extra.js'
        ? '/** PrimeVue component bundle (minified) */\n'
        : name === '03-vendor.js'
          ? ''
          : `/** ${name} — edit then npm run build:panel */\n`;
  fs.writeFileSync(path.join(partsDir, name), `${header}${content.trimEnd()}\n`, 'utf8');
}

function fixLocaleObjectExport(rawBody) {
  return rawBody.replace(/\n  \}, \{\n    /g, ',\n    ');
}

function findLineIndex(lines, predicate, label) {
  const idx = lines.findIndex(predicate);
  if (idx < 0) throw new Error(`Split marker not found: ${label}`);
  return idx;
}

function resplitExtensionFile() {
  const legacyPath = path.join(partsDir, LEGACY_PART);
  if (!fs.existsSync(legacyPath)) {
    if (fs.existsSync(path.join(partsDir, '04-core.js'))) {
      console.log('  skip resplit — parts already split');
      return;
    }
    throw new Error(`Missing ${LEGACY_PART} and 04-core.js — nothing to resplit`);
  }

  const lines = readText(legacyPath).split(/\r?\n/);
  const xlsxStart = findLineIndex(lines, (l) => l.startsWith('var Hb = 1252,'), 'SheetJS (var Hb)');
  const uiStart = findLineIndex(
    lines,
    (l, i) => l.includes('__name: "SpreadsheetImportModal"') && lines.slice(Math.max(0, i - 3), i).some((x) => x.includes('SC = ca(')),
    'SpreadsheetImportModal',
  );
  const uiBlockStart = findLineIndex(
    lines.slice(0, uiStart + 1).map((l, i) => ({ l, i })).reverse().map((x) => x.l),
    (l) => /^\s*SC = ca\(\{\s*$/.test(l) || (l.includes('SC = ca({') && !l.includes('__name')),
    'SC = ca({',
  );
  // walk back from uiStart to SC = ca({
  let scStart = uiStart;
  while (scStart > 0 && !lines[scStart].includes('SC = ca({')) scStart -= 1;
  if (!lines[scStart].includes('SC = ca({')) {
    scStart = findLineIndex(lines, (l) => l.trim().startsWith('SC = ca({'), 'SC block');
  }

  const primeStart = findLineIndex(
    lines,
    (l) => l.startsWith('var CA = Object.defineProperty,'),
    'PrimeVue extra (var CA)',
  );

  writePart('04-core.js', lines.slice(0, xlsxStart).join('\n'));
  writePart('05-xlsx.js', lines.slice(xlsxStart, scStart).join('\n'));
  writePart('06-components.js', lines.slice(scStart, primeStart).join('\n'));
  writePart('07-primevue-extra.js', lines.slice(primeStart).join('\n'));

  fs.unlinkSync(legacyPath);
  console.log('Resplit extension:');
  console.log(`  04-core.js          — ${xlsxStart} lines`);
  console.log(`  05-xlsx.js          — ${scStart - xlsxStart} lines`);
  console.log(`  06-components.js    — ${primeStart - scStart} lines`);
  console.log(`  07-primevue-extra.js — ${lines.length - primeStart} lines`);
}

function migrateBootName() {
  const oldBoot = path.join(partsDir, LEGACY_BOOT);
  const newBoot = path.join(partsDir, '08-boot.js');
  if (fs.existsSync(oldBoot) && !fs.existsSync(newBoot)) {
    fs.renameSync(oldBoot, newBoot);
    console.log(`  renamed ${LEGACY_BOOT} → 08-boot.js`);
  }
}

function splitMonolith() {
  const lines = readText(appPath).split(/\r?\n/);
  fs.mkdirSync(partsDir, { recursive: true });
  fs.mkdirSync(i18nDir, { recursive: true });

  const importsEnd = findLineIndex(lines, (l) => l.includes('from "../shared/config.js"'), 'config import');
  const utilsStart = findLineIndex(lines, (l) => l.trim().startsWith('! function()'), 'modulepreload');
  const utilsEnd = findLineIndex(lines, (l) => l.trim().startsWith('const n = t =>'), 'merge helper') - 1;
  const messagesStart = findLineIndex(lines, (l) => l.startsWith('const i = o({},'), 'i18n messages');
  const messagesEnd = findLineIndex(lines, (l) => l.trim() === '});' && lines.indexOf(l) > messagesStart, 'messages end');
  const vendorStart = findLineIndex(lines, (l) => l.trim() === 'function a(t, e) {}', 'vendor start');
  const extStart = findLineIndex(lines, (l) => l.trim().startsWith('function jc()'), 'extension start');
  const bootStart = findLineIndex(lines, (l) => l.includes('Mount Vue app') || l.trim().startsWith('try {') && lines[lines.indexOf(l) + 1]?.includes('const oD ='), 'boot');

  if (bootStart < 0) {
    const alt = findLineIndex(lines, (l) => l.trim().startsWith('const oD = ((...t)'), 'boot oD');
    if (alt > extStart) {
      // include try wrapper search backwards
    }
  }

  const bootLine = findLineIndex(
    lines,
    (l) => l.includes('/** Mount Vue app') || (l.trim() === 'try {' && lines.slice(lines.indexOf(l), lines.indexOf(l) + 5).join('\n').includes('const oD =')),
    'boot block',
  );

  const messagesRaw = lines.slice(messagesStart, messagesEnd + 1).join('\n');
  const messagesMatch = messagesRaw.match(/^const i = o\(\{\},\s*([\s\S]*)\);?\s*$/);
  if (!messagesMatch) {
    throw new Error('Could not parse i18n block in app.js');
  }

  const messagesBody = fixLocaleObjectExport(messagesMatch[1].trim());
  fs.writeFileSync(
    path.join(i18nDir, 'messages.js'),
    `/** Locale strings — edit here, then npm run build:panel */\nexport const LOCALE_MESSAGE_SOURCES = ${messagesBody};\n`,
    'utf8',
  );

  const imports = lines.slice(0, importsEnd + 1).join('\n')
    .replace(/getRemoteConfig as t,\s*/g, '')
    .replace(/isVersionSupported as e,\s*/g, '')
    .trimEnd();

  writePart('00-imports.js', `${imports}\nimport { LOCALE_MESSAGE_SOURCES } from "./i18n/messages.js";`);
  writePart('01-utils.js', lines.slice(utilsStart, utilsEnd + 1).join('\n'));
  writePart('02-locale.js', 'const i = o({}, LOCALE_MESSAGE_SOURCES);');
  writePart('03-vendor.js', lines.slice(vendorStart, extStart).join('\n'));

  const extensionBody = lines.slice(extStart, bootLine).join('\n');
  const extLines = extensionBody.split('\n');
  const xlsxStart = findLineIndex(extLines, (l) => l.startsWith('var Hb = 1252,'), 'SheetJS');
  let scStart = findLineIndex(extLines, (l) => l.trim().startsWith('SC = ca({'), 'SC');
  const primeStart = findLineIndex(extLines, (l) => l.startsWith('var CA = Object.defineProperty,'), 'PrimeVue');

  writePart('04-core.js', extLines.slice(0, xlsxStart).join('\n'));
  writePart('05-xlsx.js', extLines.slice(xlsxStart, scStart).join('\n'));
  writePart('06-components.js', extLines.slice(scStart, primeStart).join('\n'));
  writePart('07-primevue-extra.js', extLines.slice(primeStart).join('\n'));
  writePart('08-boot.js', lines.slice(bootLine).join('\n'));

  console.log('Split monolithic app.js → parts/');
}

function decodeUnicodeEscapes(source) {
  return source.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function beautifyPart(source) {
  let jsBeautify;
  try {
    jsBeautify = require('js-beautify').js;
  } catch {
    console.warn('  skip beautify — install js-beautify: npm i -D js-beautify');
    return source;
  }
  return jsBeautify(decodeUnicodeEscapes(source), {
    indent_size: 2,
    wrap_line_length: 120,
    end_with_newline: true,
    preserve_newlines: false,
    max_preserve_newlines: 1,
  });
}

function decodeParts() {
  migrateBootName();
  for (const name of PART_FILES) {
    if (!DECODE_PARTS.has(name)) continue;
    const partPath = path.join(partsDir, name);
    if (!fs.existsSync(partPath)) continue;
    const raw = readText(partPath);
    const decoded = beautifyPart(raw.replace(/^\/\*\*[\s\S]*?\*\/\n/, ''));
    writePart(name, decoded);
    console.log(`  decoded ${name}`);
  }
}

async function validateMessagesModule() {
  const href = pathToFileURL(path.join(i18nDir, 'messages.js')).href;
  const mod = await import(href);
  const keys = Object.keys(mod.LOCALE_MESSAGE_SOURCES || {});
  if (keys.length < 2) throw new Error(`messages.js: expected multiple locales, got ${keys.length}`);
  console.log(`  OK  i18n/messages.js — ${keys.length} locales`);
}

function validateBuiltApp(output) {
  if (output.includes("from '../i18n/messages.js'")) {
    throw new Error('Built app.js has wrong i18n path — must be ./i18n/messages.js');
  }
  if (!output.includes('./i18n/messages.js')) {
    throw new Error('Built app.js missing import ./i18n/messages.js');
  }
}

async function buildFromParts() {
  require('./sync-version.js');
  migrateBootName();

  for (const name of PART_FILES) {
    const partPath = path.join(partsDir, name);
    if (!fs.existsSync(partPath)) {
      throw new Error(`Missing panel/parts/${name} — run: npm run build:panel -- --split`);
    }
  }

  await validateMessagesModule();

  const chunks = PART_FILES.map((name) => readText(path.join(partsDir, name)).trimEnd());
  const output = `${chunks.join('\n\n')}\n`;
  validateBuiltApp(output);
  fs.writeFileSync(appPath, output, 'utf8');

  const lineCount = output.split('\n').length;
  console.log(`Built panel/app.js (${(output.length / 1024).toFixed(0)} KB, ${lineCount} lines)`);
}

async function main() {
  if (process.argv.includes('--resplit')) {
    resplitExtensionFile();
  }
  if (process.argv.includes('--split')) {
    splitMonolith();
  }
  if (process.argv.includes('--decode')) {
    decodeParts();
  }
  await buildFromParts();

  console.log('\nSource layout:');
  for (const name of ['i18n/messages.js', ...PART_FILES.map((f) => `parts/${f}`)]) {
    const p = path.join(panelDir, name);
    if (fs.existsSync(p)) {
      const kb = (fs.statSync(p).size / 1024).toFixed(0);
      const lines = readText(p).split('\n').length;
      console.log(`  ${name.padEnd(28)} ${`${kb} KB`.padStart(8)}  ${lines} lines`);
    }
  }
}

main().catch((err) => {
  console.error(`\n❌ build-panel failed: ${err.message}`);
  process.exit(1);
});
