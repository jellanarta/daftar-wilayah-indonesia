# daftar-wilayah-indonesia

[![npm version](https://img.shields.io/npm/v/daftar-wilayah-indonesia.svg?style=flat-square)](https://www.npmjs.com/package/daftar-wilayah-indonesia)
[![Live Demo & Docs](https://img.shields.io/badge/Live%20Demo%20%26%20Docs-wilayahindonesia.vercel.app-0070F3?style=flat-square&logo=vercel&logoColor=white)](https://wilayahindonesia.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success?style=flat-square)](https://www.npmjs.com/package/daftar-wilayah-indonesia)

> 🌐 **Website Demo & Dokumentasi Lengkap**: **[https://wilayahindonesia.vercel.app/](https://wilayahindonesia.vercel.app/)**  
> Coba langsung *interactive cascading dropdown*, pencarian instan wilayah, *hierarchy inspector*, serta panduan kode step-by-step modular per fungsi.

Library data wilayah administratif Indonesia terlengkap, terkini, dan tercepat untuk Node.js, Next.js, React, Vue, dan backend/frontend lainnya. 

Mendukung **38 Provinsi** (lengkap dengan seluruh pemekaran Daerah Otonom Baru di Papua), **514 Kabupaten/Kota**, **7.265+ Kecamatan**, dan **83.345+ Desa/Kelurahan** sesuai standar resmi Kementerian Dalam Negeri (Kemendagri) Republik Indonesia.

---

## ✨ Fitur Unggulan

- 🇮🇩 **Data Resmi Terlengkap & Terkini**: 38 Provinsi, 514 Kabupaten/Kota, 7.265+ Kecamatan, 83.345+ Desa/Kelurahan.
- ⚡ **Super Cepat & Hemat Memori**: Menggunakan *in-memory index Map* (lookup O(1) ~0.005 ms) dan *lazy-loading* untuk desa.
- 🛡️ **Full TypeScript**: Dilengkapi *type definitions* lengkap (`Provinsi`, `Kabupaten`, `Kecamatan`, `Desa`, `DetailWilayah`).
- 🔄 **Universal Dual Module**: Mendukung **ESM** (`import`) dan **CommonJS** (`require`) secara native.
- 🎯 **Fleksibel**: Menerima kode dengan titik (standar Kemendagri `32.04`) maupun tanpa titik (`3204`).
- 🔍 **Pencarian Cerdas**: Cari wilayah berdasarkan nama (misal: "Bandung", "Praya", "Papua") di semua level.
- 🧭 **Breadcrumbs Hierarki**: Dapatkan pohon wilayah lengkap (desa ➔ kecamatan ➔ kabupaten ➔ provinsi) dari satu kode saja dengan `getDetailWilayah()`.
- 🪶 **Zero Runtime Dependencies**: Tanpa dependensi pihak ketiga, ringan dan aman.

---

## 📦 Instalasi

Pilih package manager favorit Anda:

```bash
# npm
npm install daftar-wilayah-indonesia

# yarn
yarn add daftar-wilayah-indonesia

# pnpm
pnpm add daftar-wilayah-indonesia

# bun
bun add daftar-wilayah-indonesia
```

---

## 🚀 Cara Penggunaan

### 1. Import Module

Mendukung ES Module (TypeScript, Next.js, Vite) maupun CommonJS (Node.js):

```typescript
// ES Module / TypeScript
import { provinsi, kabupaten, kecamatan, desa } from 'daftar-wilayah-indonesia';
// atau import default
import wilayah from 'daftar-wilayah-indonesia';
```

```javascript
// CommonJS (Node.js)
const { provinsi, kabupaten, kecamatan, desa } = require('daftar-wilayah-indonesia');
// atau
const wilayah = require('daftar-wilayah-indonesia');
```

---

### 2. Mengambil Seluruh Provinsi (38 Provinsi)

Fungsi `provinsi()` mengembalikan 38 provinsi di Indonesia:

```typescript
import { provinsi } from 'daftar-wilayah-indonesia';

const dataProvinsi = provinsi();
console.log(dataProvinsi);
```

**Contoh Output:**
```json
[
  { "kode": "11", "nama": "Aceh" },
  { "kode": "31", "nama": "Daerah Khusus Ibukota Jakarta" },
  { "kode": "32", "nama": "Jawa Barat" },
  ...
  { "kode": "93", "nama": "Papua Selatan" },
  { "kode": "94", "nama": "Papua Tengah" },
  { "kode": "95", "nama": "Papua Pegunungan" },
  { "kode": "96", "nama": "Papua Barat Daya" }
]
```

---

### 3. Mengambil Kabupaten / Kota

Kirimkan kode provinsi untuk mendapatkan kabupaten/kota di provinsi tersebut. Jika argumen dikosongkan, akan mengembalikan seluruh 514 kabupaten/kota di Indonesia.

```typescript
import { kabupaten } from 'daftar-wilayah-indonesia';

// Mendapatkan kabupaten/kota di Nusa Tenggara Barat (kode: 52)
const kabNTB = kabupaten('52');
console.log(kabNTB);

// Mendapatkan seluruh 514 kabupaten/kota di Indonesia
const semuaKabupaten = kabupaten();
```

**Contoh Output:**
```json
[
  {
    "kode": "5201",
    "kode_kemendagri": "52.01",
    "kode_provinsi": "52",
    "nama": "Kabupaten Lombok Barat",
    "tipe": "Kabupaten"
  },
  {
    "kode": "5271",
    "kode_kemendagri": "52.71",
    "kode_provinsi": "52",
    "nama": "Kota Mataram",
    "tipe": "Kota"
  }
]
```

---

### 4. Mengambil Kecamatan

Kirimkan kode kabupaten/kota. Menerima kode tanpa titik (`5202`) maupun dengan titik (`52.02`):

```typescript
import { kecamatan } from 'daftar-wilayah-indonesia';

// Kecamatan di Kabupaten Lombok Tengah
const kecLombokTengah = kecamatan('5202');
// atau dengan titik: kecamatan('52.02')
console.log(kecLombokTengah);
```

**Contoh Output:**
```json
[
  {
    "kode": "520201",
    "kode_kemendagri": "52.02.01",
    "kode_kabupaten": "5202",
    "kode_provinsi": "52",
    "nama": "Praya Barat"
  },
  {
    "kode": "520206",
    "kode_kemendagri": "52.02.06",
    "kode_kabupaten": "5202",
    "kode_provinsi": "52",
    "nama": "Praya"
  }
]
```

---

### 5. Mengambil Desa / Kelurahan

Kirimkan kode kecamatan. Menerima kode tanpa titik (`520206`) maupun dengan titik (`52.02.06`):

```typescript
import { desa } from 'daftar-wilayah-indonesia';

// Desa di Kecamatan Praya
const desaPraya = desa('520206');
// atau dengan titik: desa('52.02.06')
console.log(desaPraya);
```

**Contoh Output:**
```json
[
  {
    "kode": "5202061001",
    "kode_kemendagri": "52.02.06.1001",
    "kode_kecamatan": "520206",
    "kode_kabupaten": "5202",
    "kode_provinsi": "52",
    "nama": "Praya"
  },
  {
    "kode": "5202062002",
    "kode_kemendagri": "52.02.06.2002",
    "kode_kecamatan": "520206",
    "kode_kabupaten": "5202",
    "kode_provinsi": "52",
    "nama": "Panjisari"
  }
]
```

---

## 🌟 Fitur Baru (v5.0)

### 1. Dapatkan Detail Wilayah & Breadcrumb (`getDetailWilayah`)

Ingin tahu hierarki lengkap dari suatu kode wilayah (misal kode desa)? Gunakan `getDetailWilayah(kode)`:

```typescript
import { getDetailWilayah } from 'daftar-wilayah-indonesia';

const detail = getDetailWilayah('3204052001'); // atau '32.04.05.2001'

console.log(detail?.tingkat);          // "desa"
console.log(detail?.nama);             // "Cileunyi Kulon"
console.log(detail?.kecamatan?.nama);  // "Cileunyi"
console.log(detail?.kabupaten?.nama);  // "Kabupaten Bandung"
console.log(detail?.provinsi?.nama);   // "Jawa Barat"
```

---

### 2. Ambil Satuan Data by Kode (`get*`)

```typescript
import {
  getProvinsi,
  getKabupaten,
  getKecamatan,
  getDesa
} from 'daftar-wilayah-indonesia';

const prov = getProvinsi('32');                    // Jawa Barat
const kab  = getKabupaten('3204');                 // Kabupaten Bandung (atau '32.04')
const kec  = getKecamatan('320405');               // Cileunyi (atau '32.04.05')
const des  = getDesa('3204052001');                // Cileunyi Kulon (atau '32.04.05.2001')
```

---

### 3. Pencarian Wilayah (`cari*`)

Cari nama wilayah secara case-insensitive:

```typescript
import {
  cariProvinsi,
  cariKabupaten,
  cariKecamatan,
  cariDesa,
  cariWilayah
} from 'daftar-wilayah-indonesia';

// Cari Provinsi
const provPapua = cariProvinsi('papua');
// Hasil: 6 provinsi (Papua, Papua Barat, Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya)

// Cari Kabupaten (bisa dibatasi di provinsi tertentu)
const kabBandung = cariKabupaten('bandung'); 
// Hasil: Kabupaten Bandung, Kabupaten Bandung Barat, Kota Bandung
const kabBogorJabar = cariKabupaten('bogor', '32');

// Cari Kecamatan
const kecPraya = cariKecamatan('praya');

// Cari Desa (default limit: 100)
const desaCileunyi = cariDesa('cileunyi');

// Cari di semua level (Global Search)
const hasil = cariWilayah('jogja', { limit: 10 });
```

---

## 💻 Contoh Integrasi React / Next.js (Cascading Dropdown)

Berikut adalah contoh praktis membuat 4 dropdown bertingkat (Provinsi ➔ Kabupaten ➔ Kecamatan ➔ Desa) di Next.js atau React:

```tsx
'use client';

import { useState } from 'react';
import { provinsi, kabupaten, kecamatan, desa } from 'daftar-wilayah-indonesia';

export default function FormAlamat() {
  const [kodeProv, setKodeProv] = useState('');
  const [kodeKab, setKodeKab] = useState('');
  const [kodeKec, setKodeKec] = useState('');
  const [kodeDesa, setKodeDesa] = useState('');

  const listProvinsi = provinsi();
  const listKabupaten = kodeProv ? kabupaten(kodeProv) : [];
  const listKecamatan = kodeKab ? kecamatan(kodeKab) : [];
  const listDesa = kodeKec ? desa(kodeKec) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
      {/* 1. Provinsi */}
      <select
        value={kodeProv}
        onChange={(e) => {
          setKodeProv(e.target.value);
          setKodeKab('');
          setKodeKec('');
          setKodeDesa('');
        }}
      >
        <option value="">Pilih Provinsi</option>
        {listProvinsi.map((p) => (
          <option key={p.kode} value={p.kode}>{p.nama}</option>
        ))}
      </select>

      {/* 2. Kabupaten / Kota */}
      <select
        value={kodeKab}
        disabled={!kodeProv}
        onChange={(e) => {
          setKodeKab(e.target.value);
          setKodeKec('');
          setKodeDesa('');
        }}
      >
        <option value="">Pilih Kabupaten / Kota</option>
        {listKabupaten.map((k) => (
          <option key={k.kode} value={k.kode}>{k.nama}</option>
        ))}
      </select>

      {/* 3. Kecamatan */}
      <select
        value={kodeKec}
        disabled={!kodeKab}
        onChange={(e) => {
          setKodeKec(e.target.value);
          setKodeDesa('');
        }}
      >
        <option value="">Pilih Kecamatan</option>
        {listKecamatan.map((kc) => (
          <option key={kc.kode} value={kc.kode}>{kc.nama}</option>
        ))}
      </select>

      {/* 4. Desa / Kelurahan */}
      <select
        value={kodeDesa}
        disabled={!kodeKec}
        onChange={(e) => setKodeDesa(e.target.value)}
      >
        <option value="">Pilih Desa / Kelurahan</option>
        {listDesa.map((d) => (
          <option key={d.kode} value={d.kode}>{d.nama}</option>
        ))}
      </select>
    </div>
  );
}
```

---

## 📖 API Reference

### Tipe Data (TypeScript)

```typescript
export interface Provinsi {
  kode: string;            // Contoh: "11"
  nama: string;            // Contoh: "Aceh"
}

export interface Kabupaten {
  kode: string;            // Contoh: "1101"
  kode_kemendagri: string; // Contoh: "11.01"
  kode_provinsi: string;   // Contoh: "11"
  nama: string;            // Contoh: "Kabupaten Aceh Selatan"
  tipe: 'Kabupaten' | 'Kota';
}

export interface Kecamatan {
  kode: string;            // Contoh: "110101"
  kode_kemendagri: string; // Contoh: "11.01.01"
  kode_kabupaten: string;  // Contoh: "1101"
  kode_provinsi: string;   // Contoh: "11"
  nama: string;            // Contoh: "Bakongan"
}

export interface Desa {
  kode: string;            // Contoh: "1101012001"
  kode_kemendagri: string; // Contoh: "11.01.01.2001"
  kode_kecamatan: string;  // Contoh: "110101"
  kode_kabupaten: string;  // Contoh: "1101"
  kode_provinsi: string;   // Contoh: "11"
  nama: string;            // Contoh: "Keude Bakongan"
}
```

### Ringkasan Fungsi

| Fungsi | Parameter | Return | Keterangan |
| :--- | :--- | :--- | :--- |
| `provinsi()` | - | `Provinsi[]` | Seluruh 38 provinsi di Indonesia |
| `kabupaten(kodeProv?)` | `string?` | `Kabupaten[]` | Daftar kabupaten per provinsi (atau seluruh 514 kabupaten jika tanpa argumen) |
| `kecamatan(kodeKab?)` | `string?` | `Kecamatan[]` | Daftar kecamatan per kabupaten (atau seluruh kecamatan jika tanpa argumen) |
| `desa(kodeKec?)` | `string?` | `Desa[]` | Daftar desa per kecamatan (atau seluruh desa jika tanpa argumen) |
| `getProvinsi(kode)` | `string` | `Provinsi \| undefined` | Ambil 1 provinsi by kode |
| `getKabupaten(kode)` | `string` | `Kabupaten \| undefined` | Ambil 1 kabupaten by kode |
| `getKecamatan(kode)` | `string` | `Kecamatan \| undefined` | Ambil 1 kecamatan by kode |
| `getDesa(kode)` | `string` | `Desa \| undefined` | Ambil 1 desa by kode |
| `getDetailWilayah(kode)` | `string` | `DetailWilayah \| null` | Pohon hierarki lengkap dari suatu kode |
| `cariProvinsi(keyword)` | `string` | `Provinsi[]` | Cari provinsi by nama |
| `cariKabupaten(keyword, kodeProv?)` | `string, string?` | `Kabupaten[]` | Cari kabupaten by nama |
| `cariKecamatan(keyword, kodeKab?)` | `string, string?` | `Kecamatan[]` | Cari kecamatan by nama |
| `cariDesa(keyword, kodeKec?, limit?)` | `string, string?, number?` | `Desa[]` | Cari desa by nama |
| `cariWilayah(keyword, options?)` | `string, CariWilayahOptions?` | `HasilCariWilayah[]` | Global search di semua tingkat |

---

## 🔄 Pembaruan dari Versi Sebelumnya (Changelog v5.0.0)

- **Update 38 Provinsi**: Ditambahkan 4 provinsi baru di Papua (Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya) dan pembaharuan kode Kemendagri terbaru.
- **Migrasi Full TypeScript**: Dilengkapi deklarasi tipe lengkap (`.d.ts`), autocomplete IDE maksimal.
- **Dual Support ESM & CJS**: Berjalan mulus di `import` maupun `require`.
- **Perbaikan Bug Kode Invalid**: Pada versi sebelumnya, jika kode tidak ditemukan akan mengembalikan seluruh data. Pada v5.0, mengembalikan array kosong `[]` sesuai ekspektasi.
- **Format Titik & Non-Titik**: Parameter menerima `'32.04'` maupun `'3204'` secara otomatis.
- **Optimasi Performa**: Waktu pencarian dan pemuatan berkurang drastis dengan struktur *indexed Map* dan *lazy loading*.
- **Fitur Baru**: Ditambahkan `getDetailWilayah()`, fungsi `get*` satuan, dan rangkaian fungsi `cari*`.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE). Silakan gunakan secara bebas untuk proyek pribadi, open-source, maupun komersial.

Dibuat dengan ❤️ oleh [Jellan Arta](https://github.com/jellanarta).
