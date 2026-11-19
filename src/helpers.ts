import { Provinsi, Kabupaten, Kecamatan, Desa } from './types';
import { daftarProvinsi } from './data/provinsi.data';
import { daftarKabupaten } from './data/kabupaten.data';
import { daftarKecamatan } from './data/kecamatan.data';
import { rawDesaData } from './data/desa.data';

/**
 * Normalisasi kode wilayah dengan menghapus tanda titik dan whitespace.
 * Contoh: "11.01.01" -> "110101"
 */
export function normalizeCode(code?: string | null): string {
  if (!code) return '';
  return String(code).replace(/[\s.]+/g, '').trim();
}

/**
 * Format kode tanpa titik menjadi format kode Kemendagri dengan titik.
 */
export function formatKemendagri(code: string): string {
  const clean = normalizeCode(code);
  if (clean.length === 2) {
    return clean;
  }
  if (clean.length === 4) {
    return `${clean.slice(0, 2)}.${clean.slice(2, 4)}`;
  }
  if (clean.length === 6) {
    return `${clean.slice(0, 2)}.${clean.slice(2, 4)}.${clean.slice(4, 6)}`;
  }
  if (clean.length === 10) {
    return `${clean.slice(0, 2)}.${clean.slice(2, 4)}.${clean.slice(4, 6)}.${clean.slice(6, 10)}`;
  }
  return clean;
}

// Maps untuk Provinsi
export const provinsiMap = new Map<string, Provinsi>();
daftarProvinsi.forEach((p) => {
  provinsiMap.set(p.kode, p);
});

// Maps untuk Kabupaten
export const kabupatenMap = new Map<string, Kabupaten>();
export const kabupatenByProvinsiMap = new Map<string, Kabupaten[]>();

daftarKabupaten.forEach((k) => {
  kabupatenMap.set(k.kode, k);
  if (!kabupatenByProvinsiMap.has(k.kode_provinsi)) {
    kabupatenByProvinsiMap.set(k.kode_provinsi, []);
  }
  kabupatenByProvinsiMap.get(k.kode_provinsi)!.push(k);
});

// Maps untuk Kecamatan
export const kecamatanMap = new Map<string, Kecamatan>();
export const kecamatanByKabupatenMap = new Map<string, Kecamatan[]>();

daftarKecamatan.forEach((k) => {
  kecamatanMap.set(k.kode, k);
  if (!kecamatanByKabupatenMap.has(k.kode_kabupaten)) {
    kecamatanByKabupatenMap.set(k.kode_kabupaten, []);
  }
  kecamatanByKabupatenMap.get(k.kode_kabupaten)!.push(k);
});

// Lazy state untuk Desa
let desaListCache: Desa[] | null = null;
let desaByKecamatanMap: Map<string, Desa[]> | null = null;
let desaByCodeMap: Map<string, Desa> | null = null;

function initDesa(): void {
  if (desaListCache && desaByKecamatanMap && desaByCodeMap) return;

  const list: Desa[] = [];
  const byKec = new Map<string, Desa[]>();
  const byCode = new Map<string, Desa>();

  const lines = rawDesaData.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const commaIndex = line.indexOf(',');
    if (commaIndex === -1) continue;

    const kode = line.slice(0, commaIndex);
    const nama = line.slice(commaIndex + 1);
    const kode_kecamatan = kode.slice(0, 6);
    const kode_kabupaten = kode.slice(0, 4);
    const kode_provinsi = kode.slice(0, 2);
    const kode_kemendagri = `${kode_provinsi}.${kode.slice(2, 4)}.${kode.slice(4, 6)}.${kode.slice(6)}`;

    const item: Desa = {
      kode,
      kode_kemendagri,
      kode_kecamatan,
      kode_kabupaten,
      kode_provinsi,
      nama,
    };

    list.push(item);
    byCode.set(kode, item);

    if (!byKec.has(kode_kecamatan)) {
      byKec.set(kode_kecamatan, []);
    }
    byKec.get(kode_kecamatan)!.push(item);
  }

  desaListCache = list;
  desaByKecamatanMap = byKec;
  desaByCodeMap = byCode;
}

export function getAllDesa(): Desa[] {
  initDesa();
  return desaListCache!;
}

export function getDesaByKecamatan(kodeKecamatan: string): Desa[] {
  initDesa();
  const clean = normalizeCode(kodeKecamatan);
  return desaByKecamatanMap!.get(clean) || [];
}

export function getDesaByCode(kodeDesa: string): Desa | undefined {
  initDesa();
  const clean = normalizeCode(kodeDesa);
  return desaByCodeMap!.get(clean);
}

