import {
  Provinsi,
  Kabupaten,
  Kecamatan,
  Desa,
  DetailWilayah,
  HasilCariWilayah,
  CariWilayahOptions,
  TingkatWilayah,
} from './types';
import { daftarProvinsi } from './data/provinsi.data';
import { daftarKabupaten } from './data/kabupaten.data';
import { daftarKecamatan } from './data/kecamatan.data';
import {
  normalizeCode,
  provinsiMap,
  kabupatenMap,
  kabupatenByProvinsiMap,
  kecamatanMap,
  kecamatanByKabupatenMap,
  getAllDesa,
  getDesaByKecamatan,
  getDesaByCode,
} from './helpers';

export * from './types';

/**
 * Mengambil seluruh data provinsi yang ada di Indonesia (38 Provinsi).
 *
 * @returns Array seluruh provinsi
 *
 * @example
 * ```ts
 * const list = provinsi();
 * console.log(list); // [{ kode: '11', nama: 'Aceh' }, ...]
 * ```
 */
export function provinsi(): Provinsi[] {
  return [...daftarProvinsi];
}

/**
 * Mengambil daftar kabupaten/kota.
 * Jika `kode_provinsi` diberikan, mengembalikan kabupaten/kota dalam provinsi tersebut.
 * Jika tanpa argumen, mengembalikan seluruh kabupaten/kota di Indonesia (514 Kabupaten/Kota).
 *
 * @param kode_provinsi - Kode provinsi (contoh: "11" atau "32")
 * @returns Array kabupaten/kota
 *
 * @example
 * ```ts
 * const list = kabupaten('32'); // Kabupaten & Kota di Jawa Barat
 * const semua = kabupaten();    // Seluruh Kabupaten & Kota di Indonesia
 * ```
 */
export function kabupaten(kode_provinsi?: string): Kabupaten[] {
  const clean = normalizeCode(kode_provinsi);
  if (!clean) {
    return [...daftarKabupaten];
  }
  return kabupatenByProvinsiMap.get(clean) || [];
}

/**
 * Mengambil daftar kecamatan.
 * Jika `kode_kabupaten` diberikan, mengembalikan kecamatan dalam kabupaten/kota tersebut.
 * Jika tanpa argumen, mengembalikan seluruh kecamatan di Indonesia (7.265+ Kecamatan).
 *
 * @param kode_kabupaten - Kode kabupaten/kota (contoh: "3204" atau "32.04")
 * @returns Array kecamatan
 *
 * @example
 * ```ts
 * const list = kecamatan('3204');   // Kecamatan di Kabupaten Bandung
 * const list2 = kecamatan('32.04'); // Mendukung format dengan titik
 * const semua = kecamatan();        // Seluruh Kecamatan di Indonesia
 * ```
 */
export function kecamatan(kode_kabupaten?: string): Kecamatan[] {
  const clean = normalizeCode(kode_kabupaten);
  if (!clean) {
    return [...daftarKecamatan];
  }
  return kecamatanByKabupatenMap.get(clean) || [];
}

/**
 * Mengambil daftar desa/kelurahan.
 * Jika `kode_kecamatan` diberikan, mengembalikan desa/kelurahan dalam kecamatan tersebut.
 * Jika tanpa argumen, mengembalikan seluruh desa/kelurahan di Indonesia (83.345+ Desa).
 *
 * @param kode_kecamatan - Kode kecamatan (contoh: "320405" atau "32.04.05")
 * @returns Array desa/kelurahan
 *
 * @example
 * ```ts
 * const list = desa('320405');   // Desa di kecamatan terkait
 * const list2 = desa('32.04.05'); // Format titik juga didukung
 * ```
 */
export function desa(kode_kecamatan?: string): Desa[] {
  const clean = normalizeCode(kode_kecamatan);
  if (!clean) {
    return getAllDesa();
  }
  return getDesaByKecamatan(clean);
}

/**
 * Mengambil satu data provinsi berdasarkan kode provinsi.
 *
 * @param kode - Kode provinsi (contoh: "32")
 */
export function getProvinsi(kode: string): Provinsi | undefined {
  const clean = normalizeCode(kode);
  return provinsiMap.get(clean);
}

/**
 * Mengambil satu data kabupaten/kota berdasarkan kode kabupaten/kota.
 *
 * @param kode - Kode kabupaten/kota (contoh: "3204" atau "32.04")
 */
export function getKabupaten(kode: string): Kabupaten | undefined {
  const clean = normalizeCode(kode);
  return kabupatenMap.get(clean);
}

/**
 * Mengambil satu data kecamatan berdasarkan kode kecamatan.
 *
 * @param kode - Kode kecamatan (contoh: "320405" atau "32.04.05")
 */
export function getKecamatan(kode: string): Kecamatan | undefined {
  const clean = normalizeCode(kode);
  return kecamatanMap.get(clean);
}

/**
 * Mengambil satu data desa/kelurahan berdasarkan kode desa/kelurahan.
 *
 * @param kode - Kode desa/kelurahan (contoh: "3204052001" atau "32.04.05.2001")
 */
export function getDesa(kode: string): Desa | undefined {
  const clean = normalizeCode(kode);
  return getDesaByCode(clean);
}

/**
 * Mengambil informasi hierarki lengkap suatu wilayah (breadcrumb) dari kode wilayah.
 * Otomatis mendeteksi tingkat (provinsi, kabupaten, kecamatan, desa).
 *
 * @param kode - Kode wilayah (dengan titik maupun tanpa titik)
 * @returns DetailWilayah lengkap beserta induk-induknya, atau null jika kode tidak ditemukan
 *
 * @example
 * ```ts
 * const detail = getDetailWilayah('3204052001');
 * console.log(detail?.provinsi?.nama); // "Jawa Barat"
 * console.log(detail?.kabupaten?.nama); // "Kabupaten Bandung"
 * console.log(detail?.kecamatan?.nama);
 * console.log(detail?.desa?.nama);
 * ```
 */
export function getDetailWilayah(kode: string): DetailWilayah | null {
  const clean = normalizeCode(kode);
  if (!clean) return null;

  if (clean.length === 2) {
    const p = getProvinsi(clean);
    if (!p) return null;
    return {
      tingkat: 'provinsi',
      kode: p.kode,
      kode_kemendagri: p.kode,
      nama: p.nama,
      provinsi: p,
    };
  }

  if (clean.length === 4) {
    const k = getKabupaten(clean);
    if (!k) return null;
    const p = getProvinsi(k.kode_provinsi);
    return {
      tingkat: 'kabupaten',
      kode: k.kode,
      kode_kemendagri: k.kode_kemendagri,
      nama: k.nama,
      provinsi: p,
      kabupaten: k,
    };
  }

  if (clean.length === 6) {
    const kc = getKecamatan(clean);
    if (!kc) return null;
    const k = getKabupaten(kc.kode_kabupaten);
    const p = getProvinsi(kc.kode_provinsi);
    return {
      tingkat: 'kecamatan',
      kode: kc.kode,
      kode_kemendagri: kc.kode_kemendagri,
      nama: kc.nama,
      provinsi: p,
      kabupaten: k,
      kecamatan: kc,
    };
  }

  if (clean.length === 10) {
    const d = getDesa(clean);
    if (!d) return null;
    const kc = getKecamatan(d.kode_kecamatan);
    const k = getKabupaten(d.kode_kabupaten);
    const p = getProvinsi(d.kode_provinsi);
    return {
      tingkat: 'desa',
      kode: d.kode,
      kode_kemendagri: d.kode_kemendagri,
      nama: d.nama,
      provinsi: p,
      kabupaten: k,
      kecamatan: kc,
      desa: d,
    };
  }

  return null;
}

/**
 * Mencari nama provinsi (case-insensitive).
 *
 * @param keyword - Kata kunci nama provinsi (contoh: "jawa", "papua")
 */
export function cariProvinsi(keyword: string): Provinsi[] {
  const query = keyword.toLowerCase().trim();
  if (!query) return [];
  return daftarProvinsi.filter((p) => p.nama.toLowerCase().includes(query));
}

/**
 * Mencari nama kabupaten/kota (case-insensitive).
 *
 * @param keyword - Kata kunci nama kabupaten/kota (contoh: "bandung")
 * @param kode_provinsi - Opsional: Batasi pencarian di provinsi tertentu
 */
export function cariKabupaten(keyword: string, kode_provinsi?: string): Kabupaten[] {
  const query = keyword.toLowerCase().trim();
  if (!query) return [];
  const list = kode_provinsi ? kabupaten(kode_provinsi) : daftarKabupaten;
  return list.filter((k) => k.nama.toLowerCase().includes(query));
}

/**
 * Mencari nama kecamatan (case-insensitive).
 *
 * @param keyword - Kata kunci nama kecamatan (contoh: "praya")
 * @param kode_kabupaten - Opsional: Batasi pencarian di kabupaten tertentu
 */
export function cariKecamatan(keyword: string, kode_kabupaten?: string): Kecamatan[] {
  const query = keyword.toLowerCase().trim();
  if (!query) return [];
  const list = kode_kabupaten ? kecamatan(kode_kabupaten) : daftarKecamatan;
  return list.filter((k) => k.nama.toLowerCase().includes(query));
}

/**
 * Mencari nama desa/kelurahan (case-insensitive).
 *
 * @param keyword - Kata kunci nama desa/kelurahan (contoh: "sari")
 * @param kode_kecamatan - Opsional: Batasi pencarian di kecamatan tertentu
 * @param limit - Opsional: Batas jumlah hasil pencarian (default: 100, 0 untuk tanpa batas)
 */
export function cariDesa(keyword: string, kode_kecamatan?: string, limit = 100): Desa[] {
  const query = keyword.toLowerCase().trim();
  if (!query) return [];
  const list = kode_kecamatan ? desa(kode_kecamatan) : getAllDesa();

  const results: Desa[] = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].nama.toLowerCase().includes(query)) {
      results.push(list[i]);
      if (limit > 0 && results.length >= limit) break;
    }
  }
  return results;
}

/**
 * Mencari wilayah secara menyeluruh berdasarkan nama (provinsi, kabupaten, kecamatan, desa).
 *
 * @param keyword - Kata kunci nama wilayah
 * @param options - Opsi pencarian (filter tingkat wilayah, limit hasil)
 */
export function cariWilayah(keyword: string, options?: CariWilayahOptions): HasilCariWilayah[] {
  const query = keyword.toLowerCase().trim();
  if (!query) return [];

  const limit = options?.limit ?? 50;
  const tingkatFilter = options?.tingkat
    ? Array.isArray(options.tingkat)
      ? options.tingkat
      : [options.tingkat]
    : (['provinsi', 'kabupaten', 'kecamatan', 'desa'] as TingkatWilayah[]);

  const results: HasilCariWilayah[] = [];

  const shouldSearch = (t: TingkatWilayah) => tingkatFilter.includes(t);

  // Provinsi
  if (shouldSearch('provinsi')) {
    for (const p of daftarProvinsi) {
      if (p.nama.toLowerCase().includes(query)) {
        results.push({
          tingkat: 'provinsi',
          kode: p.kode,
          kode_kemendagri: p.kode,
          nama: p.nama,
          detail: p,
        });
        if (limit > 0 && results.length >= limit) return results;
      }
    }
  }

  // Kabupaten
  if (shouldSearch('kabupaten')) {
    for (const k of daftarKabupaten) {
      if (k.nama.toLowerCase().includes(query)) {
        results.push({
          tingkat: 'kabupaten',
          kode: k.kode,
          kode_kemendagri: k.kode_kemendagri,
          nama: k.nama,
          detail: k,
        });
        if (limit > 0 && results.length >= limit) return results;
      }
    }
  }

  // Kecamatan
  if (shouldSearch('kecamatan')) {
    for (const kc of daftarKecamatan) {
      if (kc.nama.toLowerCase().includes(query)) {
        results.push({
          tingkat: 'kecamatan',
          kode: kc.kode,
          kode_kemendagri: kc.kode_kemendagri,
          nama: kc.nama,
          detail: kc,
        });
        if (limit > 0 && results.length >= limit) return results;
      }
    }
  }

  // Desa
  if (shouldSearch('desa')) {
    const desaList = getAllDesa();
    for (let i = 0; i < desaList.length; i++) {
      const d = desaList[i];
      if (d.nama.toLowerCase().includes(query)) {
        results.push({
          tingkat: 'desa',
          kode: d.kode,
          kode_kemendagri: d.kode_kemendagri,
          nama: d.nama,
          detail: d,
        });
        if (limit > 0 && results.length >= limit) return results;
      }
    }
  }

  return results;
}

const wilayah = {
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
};

export default wilayah;

