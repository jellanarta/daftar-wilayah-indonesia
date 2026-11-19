const test = require('node:test');
const assert = require('node:assert/strict');
const {
  provinsi,
  kabupaten,
  kecamatan,
  desa,
  getProvinsi,
  getKabupaten,
  getKecamatan,
  getDesa,
  getDetailWilayah,
  cariWilayah,
  cariProvinsi,
  cariKabupaten,
  cariKecamatan,
  cariDesa,
} = require('../dist/index.js');
const wilayah = require('../dist/index.js').default;

test('daftar-wilayah-indonesia: default export vs named export', () => {
  assert.equal(typeof wilayah.provinsi, 'function');
  assert.equal(typeof wilayah.kabupaten, 'function');
  assert.equal(typeof wilayah.kecamatan, 'function');
  assert.equal(typeof wilayah.desa, 'function');
});

test('provinsi(): harus mengembalikan 38 provinsi di Indonesia', () => {
  const list = provinsi();
  assert.equal(list.length, 38);

  // Pastikan 4 provinsi DOB Papua ada
  const papuaSelatan = list.find((p) => p.nama === 'Papua Selatan');
  const papuaTengah = list.find((p) => p.nama === 'Papua Tengah');
  const papuaPegunungan = list.find((p) => p.nama === 'Papua Pegunungan');
  const papuaBaratDaya = list.find((p) => p.nama === 'Papua Barat Daya');

  assert.ok(papuaSelatan);
  assert.equal(papuaSelatan.kode, '93');
  assert.ok(papuaTengah);
  assert.equal(papuaTengah.kode, '94');
  assert.ok(papuaPegunungan);
  assert.equal(papuaPegunungan.kode, '95');
  assert.ok(papuaBaratDaya);
  assert.equal(papuaBaratDaya.kode, '96');
});

test('kabupaten(): filter by kode provinsi dan tanpa filter', () => {
  const semua = kabupaten();
  assert.equal(semua.length, 514);

  // Filter provinsi Jawa Barat (32)
  const jabar = kabupaten('32');
  assert.equal(jabar.length, 27);
  jabar.forEach((k) => assert.equal(k.kode_provinsi, '32'));

  // Kode tidak valid harus return array kosong
  const invalid = kabupaten('9999');
  assert.deepEqual(invalid, []);
});

test('kecamatan(): filter by kode kabupaten (dengan titik dan tanpa titik)', () => {
  const semua = kecamatan();
  assert.equal(semua.length, 7265);

  // Kabupaten Bandung (3204 atau 32.04)
  const kec1 = kecamatan('3204');
  const kec2 = kecamatan('32.04');
  assert.equal(kec1.length, 31);
  assert.equal(kec2.length, 31);
  assert.deepEqual(kec1, kec2);

  const invalid = kecamatan('999999');
  assert.deepEqual(invalid, []);
});

test('desa(): filter by kode kecamatan (dengan titik dan tanpa titik)', () => {
  // Kecamatan Cileunyi (320405)
  const desa1 = desa('320405');
  const desa2 = desa('32.04.05');
  assert.equal(desa1.length, 6);
  assert.equal(desa2.length, 6);
  assert.deepEqual(desa1, desa2);

  const invalid = desa('9999999999');
  assert.deepEqual(invalid, []);
});

test('getProvinsi, getKabupaten, getKecamatan, getDesa', () => {
  const p = getProvinsi('32');
  assert.equal(p?.nama, 'Jawa Barat');

  const k1 = getKabupaten('3204');
  const k2 = getKabupaten('32.04');
  assert.equal(k1?.nama, 'Kabupaten Bandung');
  assert.equal(k2?.nama, 'Kabupaten Bandung');

  const kc1 = getKecamatan('320405');
  const kc2 = getKecamatan('32.04.05');
  assert.equal(kc1?.nama, 'Cileunyi');
  assert.equal(kc2?.nama, 'Cileunyi');

  const d1 = getDesa('3204052001');
  const d2 = getDesa('32.04.05.2001');
  assert.equal(d1?.nama, 'Cileunyi Kulon');
  assert.equal(d2?.nama, 'Cileunyi Kulon');
});

test('getDetailWilayah(): breadcrumbs hierarki wilayah', () => {
  const detailDesa = getDetailWilayah('3204052001');
  assert.ok(detailDesa);
  assert.equal(detailDesa.tingkat, 'desa');
  assert.equal(detailDesa.nama, 'Cileunyi Kulon');
  assert.equal(detailDesa.kecamatan?.nama, 'Cileunyi');
  assert.equal(detailDesa.kabupaten?.nama, 'Kabupaten Bandung');
  assert.equal(detailDesa.provinsi?.nama, 'Jawa Barat');

  const detailKec = getDetailWilayah('32.04.05');
  assert.ok(detailKec);
  assert.equal(detailKec.tingkat, 'kecamatan');
  assert.equal(detailKec.kabupaten?.nama, 'Kabupaten Bandung');
  assert.equal(detailKec.provinsi?.nama, 'Jawa Barat');

  const notFound = getDetailWilayah('00000');
  assert.equal(notFound, null);
});

test('cariProvinsi, cariKabupaten, cariKecamatan, cariDesa', () => {
  const provs = cariProvinsi('barat');
  assert.ok(provs.length >= 4);

  const kabs = cariKabupaten('bandung');
  assert.equal(kabs.length, 3); // Kab. Bandung, Kab. Bandung Barat, Kota Bandung

  // Cari kabupaten dalam provinsi tertentu
  const kabsJabar = cariKabupaten('bogor', '32');
  assert.equal(kabsJabar.length, 2); // Kab. Bogor, Kota Bogor

  const kecs = cariKecamatan('praya');
  assert.ok(kecs.length >= 3);

  const desas = cariDesa('cileunyi', undefined, 10);
  assert.ok(desas.length > 0);
  assert.ok(desas.length <= 10);
});

test('cariWilayah(): global search lintas tingkat', () => {
  const results = cariWilayah('jogja', { limit: 10 });
  assert.ok(Array.isArray(results));

  const resultsBandung = cariWilayah('Bandung', { limit: 5 });
  assert.equal(resultsBandung.length, 5);
  assert.ok(resultsBandung.some((r) => r.tingkat === 'kabupaten'));
});

