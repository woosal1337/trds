import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAKETLER = ['tokens', 'validators', 'tanim', 'identity', 'core', 'react', 'vue', 'themes/vatandas', 'themes/kurumsal', 'themes/saglik'];
const denetle = process.argv.includes('--denetle');
const kokPaket = JSON.parse(await readFile(join(KOK, 'package.json'), 'utf8'));
const gecici = await mkdtemp(join(tmpdir(), 'kiris-yayin-'));
const npm = (komut) => execFileSync('npm', komut, { cwd: KOK, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
const hedefler = (deger) => typeof deger === 'string' ? [deger] : Object.values(deger ?? {}).flatMap(hedefler);

try {
  assert.equal(PAKETLER.length, 10);
  if (!denetle && process.env.GITHUB_ACTIONS) {
    assert.equal(process.env.GITHUB_REF, `refs/tags/v${kokPaket.version}`, 'Yayın için paket sürümüyle eşleşen etiketi seçin.');
  }
  const paketler = [];
  for (const dizin of PAKETLER) {
    const paket = JSON.parse(await readFile(join(KOK, 'packages', dizin, 'package.json'), 'utf8'));
    assert.equal(paket.version, kokPaket.version, `${paket.name}: sürümler eşleşmiyor.`);
    for (const bolum of ['dependencies', 'devDependencies', 'peerDependencies']) {
      for (const [ad, surum] of Object.entries(paket[bolum] ?? {})) {
        if (ad.startsWith('@kiris-ds/')) assert.equal(surum, kokPaket.version, `${paket.name}: ${ad} sürümü eşleşmiyor.`);
      }
    }
    const [arsiv] = JSON.parse(npm(['pack', `--workspace=${paket.name}`, '--json', '--ignore-scripts', `--pack-destination=${gecici}`]));
    const dosyalar = new Set(arsiv.files.map((dosya) => dosya.path));
    for (const hedef of [...hedefler(paket.exports), paket.main, paket.style].filter(Boolean)) {
      const yol = hedef.replace(/^\.\//, '');
      const kalip = new RegExp(`^${yol.split('*').map((parca) => parca.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.+')}\u0024`);
      assert.ok([...dosyalar].some((dosya) => kalip.test(dosya)), `${paket.name}: ${hedef} arşivde yok.`);
    }
    const lisans = paket.license.startsWith('SEE LICENSE IN ') ? paket.license.slice(15) : 'LICENSE';
    assert.ok(dosyalar.has(lisans), `${paket.name}: lisans arşivde yok.`);
    assert.ok(dosyalar.has('README.md'), `${paket.name}: README arşivde yok.`);
    if (paket.name === '@kiris-ds/identity') {
      assert.ok(dosyalar.has('src/simgeler/LICENSE-TABLER.txt'));
      assert.ok(dosyalar.has('src/yazi/LICENSE-FONTS.txt'), 'Kimlik arşivinde yazı tipi lisansı yok.');
      assert.ok(![...dosyalar].some((dosya) => /(?:edk\.|instagram3\.svg)/i.test(dosya)), 'Kimlik arşivinde eski simge dosyası var.');
    }
    paketler.push({ ...arsiv, name: paket.name });
    console.log(`${paket.name}@${paket.version}: ${dosyalar.size} dosya, lisans ve dışa aktarımlar tam.`);
  }
  if (!denetle) {
    for (const paket of paketler) {
      const sorgu = spawnSync('npm', ['view', `${paket.name}@${kokPaket.version}`, 'dist.integrity', '--json'], { cwd: KOK, encoding: 'utf8' });
      if (sorgu.error) throw sorgu.error;
      if (sorgu.status === 0) {
        assert.equal(JSON.parse(sorgu.stdout), paket.integrity, `${paket.name}: yayımlanan arşiv farklı. Yeni bir sürüm kullanın.`);
        console.log(`${paket.name}: aynı arşiv zaten yayımlanmış.`);
        continue;
      }
      const hata = JSON.parse(sorgu.stdout || '{}').error;
      assert.equal(hata?.code, 'E404', `${paket.name}: kayıt sorgusu başarısız. ${sorgu.stderr}`);
      execFileSync('npm', ['publish', join(gecici, paket.filename), '--access=public', '--ignore-scripts'], { cwd: KOK, stdio: 'inherit' });
    }
  }
} finally {
  await rm(gecici, { recursive: true, force: true });
}
