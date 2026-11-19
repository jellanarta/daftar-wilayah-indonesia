/**
 * Definisi tipe data untuk daftar wilayah Indonesia
 */
type TingkatWilayah = 'provinsi' | 'kabupaten' | 'kecamatan' | 'desa';
interface Provinsi {
    /** Kode wilayah provinsi (2 digit), contoh: "11", "32" */
    kode: string;
    /** Nama provinsi, contoh: "Aceh", "Jawa Barat" */
    nama: string;
}
interface Kabupaten {
    /** Kode wilayah kabupaten/kota tanpa titik (4 digit), contoh: "1101", "3204" */
    kode: string;
    /** Kode wilayah resmi Kemendagri dengan titik, contoh: "11.01", "32.04" */
    kode_kemendagri: string;
    /** Kode provinsi induk (2 digit), contoh: "11", "32" */
    kode_provinsi: string;
    /** Nama kabupaten/kota, contoh: "Kabupaten Aceh Selatan", "Kota Bandung" */
    nama: string;
    /** Tipe daerah administratif: Kabupaten atau Kota */
    tipe: 'Kabupaten' | 'Kota';
}
interface Kecamatan {
    /** Kode wilayah kecamatan tanpa titik (6 digit), contoh: "110101" */
    kode: string;
    /** Kode wilayah resmi Kemendagri dengan titik, contoh: "11.01.01" */
    kode_kemendagri: string;
    /** Kode kabupaten/kota induk tanpa titik (4 digit), contoh: "1101" */
    kode_kabupaten: string;
    /** Kode provinsi induk (2 digit), contoh: "11" */
    kode_provinsi: string;
    /** Nama kecamatan, contoh: "Bakongan" */
    nama: string;
}
interface Desa {
    /** Kode wilayah desa/kelurahan tanpa titik (10 digit), contoh: "1101012001" */
    kode: string;
    /** Kode wilayah resmi Kemendagri dengan titik, contoh: "11.01.01.2001" */
    kode_kemendagri: string;
    /** Kode kecamatan induk tanpa titik (6 digit), contoh: "110101" */
    kode_kecamatan: string;
    /** Kode kabupaten/kota induk tanpa titik (4 digit), contoh: "1101" */
    kode_kabupaten: string;
    /** Kode provinsi induk (2 digit), contoh: "11" */
    kode_provinsi: string;
    /** Nama desa/kelurahan, contoh: "Keude Bakongan" */
    nama: string;
}
interface DetailWilayah {
    /** Tingkat wilayah yang dicari */
    tingkat: TingkatWilayah;
    /** Kode wilayah tanpa titik */
    kode: string;
    /** Kode wilayah resmi Kemendagri dengan titik */
    kode_kemendagri: string;
    /** Nama wilayah */
    nama: string;
    /** Informasi provinsi terkait */
    provinsi?: Provinsi;
    /** Informasi kabupaten/kota terkait (jika tingkat >= kabupaten) */
    kabupaten?: Kabupaten;
    /** Informasi kecamatan terkait (jika tingkat >= kecamatan) */
    kecamatan?: Kecamatan;
    /** Informasi desa/kelurahan terkait (jika tingkat == desa) */
    desa?: Desa;
}
interface HasilCariWilayah {
    tingkat: TingkatWilayah;
    kode: string;
    kode_kemendagri: string;
    nama: string;
    detail: Provinsi | Kabupaten | Kecamatan | Desa;
}
interface CariWilayahOptions {
    /** Filter tingkat wilayah tertentu */
    tingkat?: TingkatWilayah | TingkatWilayah[];
    /** Batas jumlah hasil pencarian (default: 50, gunakan 0 untuk tanpa batas) */
    limit?: number;
}

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
declare function provinsi(): Provinsi[];
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
declare function kabupaten(kode_provinsi?: string): Kabupaten[];
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
declare function kecamatan(kode_kabupaten?: string): Kecamatan[];
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
declare function desa(kode_kecamatan?: string): Desa[];
/**
 * Mengambil satu data provinsi berdasarkan kode provinsi.
 *
 * @param kode - Kode provinsi (contoh: "32")
 */
declare function getProvinsi(kode: string): Provinsi | undefined;
/**
 * Mengambil satu data kabupaten/kota berdasarkan kode kabupaten/kota.
 *
 * @param kode - Kode kabupaten/kota (contoh: "3204" atau "32.04")
 */
declare function getKabupaten(kode: string): Kabupaten | undefined;
/**
 * Mengambil satu data kecamatan berdasarkan kode kecamatan.
 *
 * @param kode - Kode kecamatan (contoh: "320405" atau "32.04.05")
 */
declare function getKecamatan(kode: string): Kecamatan | undefined;
/**
 * Mengambil satu data desa/kelurahan berdasarkan kode desa/kelurahan.
 *
 * @param kode - Kode desa/kelurahan (contoh: "3204052001" atau "32.04.05.2001")
 */
declare function getDesa(kode: string): Desa | undefined;
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
declare function getDetailWilayah(kode: string): DetailWilayah | null;
/**
 * Mencari nama provinsi (case-insensitive).
 *
 * @param keyword - Kata kunci nama provinsi (contoh: "jawa", "papua")
 */
declare function cariProvinsi(keyword: string): Provinsi[];
/**
 * Mencari nama kabupaten/kota (case-insensitive).
 *
 * @param keyword - Kata kunci nama kabupaten/kota (contoh: "bandung")
 * @param kode_provinsi - Opsional: Batasi pencarian di provinsi tertentu
 */
declare function cariKabupaten(keyword: string, kode_provinsi?: string): Kabupaten[];
/**
 * Mencari nama kecamatan (case-insensitive).
 *
 * @param keyword - Kata kunci nama kecamatan (contoh: "praya")
 * @param kode_kabupaten - Opsional: Batasi pencarian di kabupaten tertentu
 */
declare function cariKecamatan(keyword: string, kode_kabupaten?: string): Kecamatan[];
/**
 * Mencari nama desa/kelurahan (case-insensitive).
 *
 * @param keyword - Kata kunci nama desa/kelurahan (contoh: "sari")
 * @param kode_kecamatan - Opsional: Batasi pencarian di kecamatan tertentu
 * @param limit - Opsional: Batas jumlah hasil pencarian (default: 100, 0 untuk tanpa batas)
 */
declare function cariDesa(keyword: string, kode_kecamatan?: string, limit?: number): Desa[];
/**
 * Mencari wilayah secara menyeluruh berdasarkan nama (provinsi, kabupaten, kecamatan, desa).
 *
 * @param keyword - Kata kunci nama wilayah
 * @param options - Opsi pencarian (filter tingkat wilayah, limit hasil)
 */
declare function cariWilayah(keyword: string, options?: CariWilayahOptions): HasilCariWilayah[];
declare const wilayah: {
    provinsi: typeof provinsi;
    kabupaten: typeof kabupaten;
    kecamatan: typeof kecamatan;
    desa: typeof desa;
    getProvinsi: typeof getProvinsi;
    getKabupaten: typeof getKabupaten;
    getKecamatan: typeof getKecamatan;
    getDesa: typeof getDesa;
    getDetailWilayah: typeof getDetailWilayah;
    cariWilayah: typeof cariWilayah;
    cariProvinsi: typeof cariProvinsi;
    cariKabupaten: typeof cariKabupaten;
    cariKecamatan: typeof cariKecamatan;
    cariDesa: typeof cariDesa;
};

export { cariDesa, cariKabupaten, cariKecamatan, cariProvinsi, cariWilayah, wilayah as default, desa, getDesa, getDetailWilayah, getKabupaten, getKecamatan, getProvinsi, kabupaten, kecamatan, provinsi };
export type { CariWilayahOptions, Desa, DetailWilayah, HasilCariWilayah, Kabupaten, Kecamatan, Provinsi, TingkatWilayah };
