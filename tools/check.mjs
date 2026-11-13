import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'contact.html', 'ensavoirplus.html'];
const errors = [];
const documents = new Map();
for (const page of pages) {
  const html = await readFile(path.join(root, page), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${page}: identifiants dupliqués`);
  if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${page}: un seul h1 est attendu`);
  if ((html.match(/<option\b/g) || []).length !== (html.match(/<\/option>/g) || []).length) errors.push(`${page}: options de formulaire mal fermées`);
  documents.set(page, { html, ids });
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(script[1]); } catch { errors.push(`${page}: JSON-LD invalide`); }
  }
}
for (const [page, { html }] of documents) {
  for (const match of html.matchAll(/(?:href|src)="([^"?]+)(?:\?[^"#]*)?"/g)) {
    const value = match[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const [file, id] = value.split('#');
    const target = file || page;
    try { await access(path.join(root, target)); } catch { errors.push(`${page}: fichier absent ${target}`); }
    if (id && documents.has(target) && !documents.get(target).ids.includes(id)) errors.push(`${page}: ancre absente ${value}`);
  }
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(tag[0])) errors.push(`${page}: image sans alternative`);
  }
  for (const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!/rel="[^"]*noopener/.test(tag[0])) errors.push(`${page}: lien externe sans noopener`);
  }
}
const css = await readFile(path.join(root, 'css/studio.css'), 'utf8');
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
  try { await access(path.resolve(root, 'css', match[1])); } catch { errors.push(`CSS: fichier absent ${match[1]}`); }
}
for (const script of ['js/studio.js', 'js/automation.js']) {
  try { new vm.Script(await readFile(path.join(root, script), 'utf8')); } catch (error) { errors.push(`${script}: ${error.message}`); }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('OK — 3 pages, ancres, fichiers, images, liens externes, JSON-LD, polices et syntaxe JavaScript.');
