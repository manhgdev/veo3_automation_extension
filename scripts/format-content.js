const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').js;

const root = path.join(__dirname, '..');
const source = path.join(root, 'content', 'content.js');

if (!fs.existsSync(source)) {
  console.error('content/content.js not found. Keep a backup before re-formatting.');
  process.exit(1);
}

const code = fs.readFileSync(source, 'utf8');
const formatted = beautify(code, {
  indent_size: 2,
  wrap_line_length: 120,
  end_with_newline: true,
  eol: '\n',
});

fs.writeFileSync(source, formatted, 'utf8');
console.log(`Formatted ${source}`);
