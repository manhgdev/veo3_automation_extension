const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const source = path.join(root, 'icons', 'logo.png');
const sizes = [16, 24, 32, 48, 128];

async function main() {
  const image = sharp(source);
  const meta = await image.metadata();

  const side = Math.min(meta.width, meta.height);
  const left = Math.floor((meta.width - side) / 2);
  const top = Math.floor((meta.height - side) / 2);

  const square = sharp(source).extract({
    left,
    top,
    width: side,
    height: side,
  });

  for (const size of sizes) {
    const out = path.join(root, 'icons', `icon-${size}.png`);
    await square.clone().resize(size, size).png().toFile(out);
    console.log(`Created ${out}`);
  }

  // Main logo used in panel/favicon — square 256px
  const logoOut = path.join(root, 'icons', 'logo.png');
  const logoTmp = path.join(root, 'icons', 'logo.tmp.png');
  await square.clone().resize(256, 256).png().toFile(logoTmp);
  fs.renameSync(logoTmp, logoOut);
  console.log(`Updated ${logoOut}`);

  await sharp(logoOut).toFile(path.join(root, 'logo.png'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
