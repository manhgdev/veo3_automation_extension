const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').js;

const root = path.join(__dirname, '..');

function beautifyFile(inputPath, outputPath, replacements = []) {
  let code = fs.readFileSync(inputPath, 'utf8');

  for (const [from, to] of replacements) {
    code = code.split(from).join(to);
  }

  const formatted = beautify(code, {
    indent_size: 2,
    wrap_line_length: 120,
    end_with_newline: true,
    eol: '\n',
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, formatted, 'utf8');
  const lines = formatted.split('\n').length;
  console.log(`Wrote ${outputPath} (${(formatted.length / 1024).toFixed(0)} KB, ${lines} lines)`);
}

function applyPanelPatches(code) {
  const replacements = [
    [
      'function gu(){const t=Ds(()=>Math.min(bu.value/10*100,100)),e=Ds(()=>bu.value>=10);return{usedToday:bu,percentage:t,isExceeded:e,limit:10}}',
      'function gu(){const t=Ds(()=>0),e=Ds(()=>!1);return{usedToday:bu,percentage:t,isExceeded:e,limit:999999}}',
    ],
    [
      'function hu(){const{isPro:t}=Ld();return{isPricingEnabled:Ds(()=>fu.value||t.value)}}',
      'function hu(){return{isPricingEnabled:Ds(()=>!1)}}',
    ],
    [
      'isLimitReached:Ds(()=>{if(!s.value)return!1;if(e.value)return!1;const n=10-a.value;return t?n-t.value<0:n<=0})',
      'isLimitReached:Ds(()=>!1)',
    ],
    ['Cd=Zo(!1),Sd=Zo(!1)', 'Cd=Zo(!0),Sd=Zo(!0)'],
    [/Tr\\u01b0\\u1eddng Nguy\\u1ec5n/g, 'manhgdev'],
    [/Truong Nguyen/g, 'manhgdev'],
    ['const o="3.1.6"', 'const VERSION="1.0.0"'],
    ['const o="1.0.0"', 'const VERSION="1.0.0"'],
    ['"v" + In(ni(o))', '"v" + In(ni(VERSION))'],
  ];

  let result = code;
  for (const [from, to] of replacements) {
    if (from instanceof RegExp) {
      result = result.replace(from, to);
    } else if (result.includes(from)) {
      result = result.split(from).join(to);
    }
  }
  return result;
}

// Panel only
let panelSource = fs.readFileSync(path.join(root, 'assets', 'index.html-B3dstwmb.js'), 'utf8');
panelSource = applyPanelPatches(panelSource);
const panelTmp = path.join(root, 'scripts', '_panel-tmp.js');
fs.writeFileSync(panelTmp, panelSource);

beautifyFile(panelTmp, path.join(root, 'panel', 'app.js'), [
  [
    'import{g as t,i as e}from"./remoteConfig-CbIdrXch.js"',
    'import { getRemoteConfig as t, isVersionSupported as e } from "../shared/remote-config.js"',
  ],
]);

fs.unlinkSync(panelTmp);
console.log('Panel regenerated.');
