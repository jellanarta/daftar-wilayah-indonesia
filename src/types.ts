/**
 * Definisi tipe data untuk daftar wilayah Indonesia
 */

export type TingkatWilayah = 'provinsi' | 'kabupaten' | 'kecamatan' | 'desa';

export interface Provinsi {
  /** Kode wilayah provinsi (2 digit), contoh: "11", "32" */
  kode: string;
  /** Nama provinsi, contoh: "Aceh", "Jawa Barat" */
  nama: string;
}

export interface Kabupaten {
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

export interface Kecamatan {
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

export interface Desa {
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

export interface DetailWilayah {
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

export interface HasilCariWilayah {
  tingkat: TingkatWilayah;
  kode: string;
  kode_kemendagri: string;
  nama: string;
  detail: Provinsi | Kabupaten | Kecamatan | Desa;
}

export interface CariWilayahOptions {
  /** Filter tingkat wilayah tertentu */
  tingkat?: TingkatWilayah | TingkatWilayah[];
  /** Batas jumlah hasil pencarian (default: 50, gunakan 0 untuk tanpa batas) */
  limit?: number;
}

