#!/usr/bin/env node
// Belge sitesi için küçük bir durağan sunucu. Bağımlılık yok.
//
//   node apps/docs/serve.mjs [port]
//
// Site tamamen durağandır. Bu sunucu yalnız yerel önizleme içindir.
// Üretimde siteyi herhangi bir durağan barındırma hizmetine koyun.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = join(dirname(fileURLToPath(import.meta.url)), 'site');
const PORT = Number(process.argv[2] || process.env.PORT || 4173);

const TURLER = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const sunucu = createServer(async (istek, cevap) => {
  try {
    const yol = decodeURIComponent(new URL(istek.url, 'http://localhost').pathname);
    // Üst klasöre çıkmayı engelle.
    let hedef = join(KOK, normalize(yol).replace(/^(\.\.[/\\])+/, ''));

    const bilgi = await stat(hedef).catch(() => null);
    if (bilgi?.isDirectory()) hedef = join(hedef, 'index.html');

    const govde = await readFile(hedef);
    cevap.writeHead(200, {
      'content-type': TURLER[extname(hedef)] ?? 'application/octet-stream',
      'cache-control': 'no-store'
    });
    cevap.end(govde);
  } catch {
    cevap.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    cevap.end('<h1>404</h1><p>Sayfa bulunamadı.</p>');
  }
});

sunucu.listen(PORT, () => {
  console.log(`TRDS belgeleri: http://localhost:${PORT}`);
});
