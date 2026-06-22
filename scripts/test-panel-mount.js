import { Window } from 'happy-dom';

function makeStorage() {
  return {
    get: (_k, cb) => {
      const result = {};
      if (typeof cb === 'function') cb(result);
      return Promise.resolve(result);
    },
    set: () => Promise.resolve(),
    onChanged: { addListener: () => {}, removeListener: () => {} },
  };
}

const window = new Window({ url: 'chrome-extension://test/panel/index.html' });
const document = window.document;
document.body.innerHTML = '<div id="app"></div>';

globalThis.window = window;
globalThis.document = document;
globalThis.MutationObserver = window.MutationObserver;
globalThis.HTMLElement = window.HTMLElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.Text = window.Text;
globalThis.SVGElement = window.SVGElement;
globalThis.MathMLElement = window.MathMLElement;
globalThis.DocumentFragment = window.DocumentFragment;
globalThis.Event = window.Event;
globalThis.CustomEvent = window.CustomEvent;
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.getComputedStyle = window.getComputedStyle.bind(window);
globalThis.self = window;
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.chrome = {
  storage: { sync: makeStorage(), local: makeStorage() },
  runtime: {
    connect: () => ({ onDisconnect: { addListener: () => {} } }),
    sendMessage: (_m, cb) => cb && cb({ active: false }),
    onMessage: { addListener: () => {}, removeListener: () => {} },
    lastError: null,
  },
  tabs: { query: (_q, cb) => cb([]), update: () => {}, create: () => {} },
  windows: { update: () => {} },
};

console.log('loading app.js...');
const start = Date.now();
await import('../panel/app.js');
console.log('import done in', Date.now() - start, 'ms');
await new Promise((r) => setTimeout(r, 1000));
const app = document.getElementById('app');
console.log('text sample', JSON.stringify((app?.textContent ?? '').slice(0, 200)));
if (!(app?.textContent ?? '').trim()) {
  console.error('RESULT: EMPTY PANEL', app?.innerHTML?.slice(0, 200));
  process.exitCode = 1;
} else {
  console.log('RESULT: OK');
}
