const fs = require('fs');
const path = require('path');
const https = require('https');

const fontsDir = path.join(__dirname, '..', 'panel', 'fonts');
const cssPath = path.join(__dirname, '..', 'panel', 'style.css');

const FONT_FILES = [
  'https://unpkg.com/primeicons@6.0.1/fonts/primeicons.woff2',
  'https://unpkg.com/primeicons@6.0.1/fonts/primeicons.woff',
  'https://unpkg.com/primeicons@6.0.1/fonts/primeicons.ttf',
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', reject);
  });
}

async function ensureFonts() {
  fs.mkdirSync(fontsDir, { recursive: true });

  for (const url of FONT_FILES) {
    const name = path.basename(url);
    const dest = path.join(fontsDir, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`skip ${name}`);
      continue;
    }
    await download(url, dest);
    console.log(`downloaded ${name}`);
  }
}

function patchCss() {
  let css = fs.readFileSync(cssPath, 'utf8');

  const newFace =
    '@font-face{font-family:primeicons;font-display:block;' +
    'src:url(./fonts/primeicons.woff2) format("woff2"),' +
    'url(./fonts/primeicons.woff) format("woff"),' +
    'url(./fonts/primeicons.ttf) format("truetype"),' +
    'url(./fonts/primeicons.svg?#primeicons) format("svg");' +
    'font-weight:400;font-style:normal}';

  css = css.replace(/@font-face\{font-family:primeicons;[^}]+\}/, newFace);
  fs.writeFileSync(cssPath, css);
  console.log('patched panel/style.css @font-face');
}

ensureFonts()
  .then(patchCss)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
