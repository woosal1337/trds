import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const kaynak = fileURLToPath(new URL('..', import.meta.url));

test('kimlik yapısı eski çıktıları siler ve lisansı pakete ekler', async () => {
  const gecici = await mkdtemp(join(tmpdir(), 'trds-kimlik-test-'));
  try {
    const paket = join(gecici, 'packages', 'identity');
    await mkdir(join(paket, 'dist', 'simgeler'), { recursive: true });
    await cp(join(kaynak, 'src'), join(paket, 'src'), { recursive: true });
    await cp(join(kaynak, 'build.mjs'), join(paket, 'build.mjs'));
    const lisans = await readFile(new URL('../../../LICENSE-IDENTITY.md', import.meta.url), 'utf8');
    await writeFile(join(gecici, 'LICENSE-IDENTITY.md'), lisans);
    await writeFile(join(paket, 'dist', 'simgeler', 'eski.svg'), '<svg/>');
    await writeFile(join(paket, 'dist', 'eski.woff2'), 'eski');
    execFileSync(process.execPath, [join(paket, 'build.mjs')], { stdio: 'pipe' });
    const simgeler = (await readdir(join(paket, 'src', 'simgeler'))).filter(ad => ad.endsWith('.svg')).sort();
    assert.deepEqual((await readdir(join(paket, 'dist', 'simgeler'))).sort(), simgeler);
    assert.ok(!(await readdir(join(paket, 'dist'))).includes('eski.woff2'));
    assert.equal(await readFile(join(paket, 'dist', 'LICENSE-IDENTITY.md'), 'utf8'), lisans);
  } finally {
    await rm(gecici, { recursive: true, force: true });
  }
});
