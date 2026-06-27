#!/usr/bin/env node
/** messages.source.js + locale-overlays.js → messages.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const { LOCALE_MESSAGE_SOURCES } = await import(
  pathToFileURL(path.join(root, 'src/i18n/messages.source.js')).href
);
const { decodeAllLocales } = await import(
  pathToFileURL(path.join(root, 'src/i18n/decodeMessages.js')).href
);
const { applyLocaleOverlays } = await import(
  pathToFileURL(path.join(root, 'src/i18n/mergeOverlays.js')).href
);
const { default: overlays } = await import(
  pathToFileURL(path.join(root, 'src/i18n/locale-overlays.js')).href
);

const messages = decodeAllLocales(LOCALE_MESSAGE_SOURCES);
applyLocaleOverlays(messages, overlays);

const outPath = path.join(root, 'src/i18n/messages.json');
fs.writeFileSync(outPath, JSON.stringify(messages), 'utf8');
console.log(`Wrote ${outPath} (${Object.keys(messages).length} locales)`);
