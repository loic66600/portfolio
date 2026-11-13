import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// Exercise the contact handler offline: no message is sent to Web3Forms.
const source = await readFile(new URL('../js/studio.js', import.meta.url), 'utf8');
function setup(fetchImplementation, valid = true) {
  const element = () => ({ hidden: false, disabled: false, textContent: '', classList: { add() {}, toggle() {} }, setAttribute() {}, removeAttribute() {} });
  const button = element(), label = element(), loading = element(), status = element(), subject = { value: '' };
  const fields = { '[type=submit]': button, '.contact-form-status': status, '.contact-submit-label': label, '.contact-submit-loading': loading, '[name=subject]': subject };
  let submit, resets = 0;
  const form = {
    action: 'https://api.web3forms.com/submit',
    querySelector: selector => fields[selector] || null,
    reportValidity: () => valid,
    reset: () => resets++,
    addEventListener: (name, handler) => { if (name === 'submit') submit = handler; }
  };
  const document = {
    querySelector: () => null,
    querySelectorAll: selector => selector === '.js-contact-form' ? [form] : [],
    documentElement: { classList: { toggle() {} } },
    addEventListener() {}, dispatchEvent() {}
  };
  vm.runInNewContext(source, {
    document, window: {}, matchMedia: () => ({ matches: false, addEventListener() {} }),
    localStorage: { getItem: () => null }, location: { search: '?projet=automatisation' },
    URLSearchParams, AbortController, setTimeout, clearTimeout, CustomEvent: class { constructor(type, options) { this.type=type; this.detail=options.detail; } },
    FormData: class {}, fetch: fetchImplementation
  });
  return { run: () => submit({ preventDefault() {} }), button, label, loading, status, subject, resets: () => resets };
}

let calls = 0;
const invalid = setup(async () => { calls++; }, false);
await invalid.run();
assert.equal(calls, 0, 'Invalid forms must not submit');
assert.equal(invalid.subject.value, 'Automatisation & no-code', 'URL must preselect the project');

let resolveRequest;
const success = setup(() => new Promise(resolve => { resolveRequest = resolve; }));
const pending = success.run();
assert.equal(success.button.disabled, true, 'Prevent duplicate submissions while pending');
assert.equal(success.loading.hidden, false);
resolveRequest({ ok: true, json: async () => ({ success: true }) });
await pending;
assert.equal(success.resets(), 1);
assert.match(success.status.textContent, /bien été envoyé/);
assert.equal(success.button.disabled, false);
assert.equal(success.label.hidden, false);

for (const request of [async () => { throw new Error('Offline'); }, async () => ({ ok: true, json: async () => ({ success: false }) }), async () => ({ ok: false, json: async () => ({ success: true }) })]) {
  const failure = setup(request);
  await failure.run();
  assert.equal(failure.resets(), 0, 'Keep user data after network or service failure');
  assert.match(failure.status.textContent, /n’a pas abouti/);
  assert.equal(failure.button.disabled, false);
  assert.equal(failure.loading.hidden, true);
}
console.log('OK — formulaire : validation, préremplissage, attente, succès et erreurs. Aucun envoi réel.');
