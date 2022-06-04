Cara mudah mendapatkan data wilayah indonesia

Berikut ini adalah penjelasan bagaimana cara menggunakan package daftar-wilayah-indonesia di Front-End maupun Back-end hususnya pengguna nodejs



## Installation

```console
$ npm install daftar-wilayah-indonesia
```



## Tutorial penggunaan

untuk menggunakan package ini anda harus mengimport 4 function yang sudah di sediakan yakni function provinsi, kabupaten, kecamatan dan desa


```js

import { provinsi, kabupaten, kecamatan, desa } from 'daftar-wilayah-indonesia'

```

## PENJELASAN

Silahkan simak penjelesan dari masing - masing fungsi yang sudah kita import di atas


## Function provinsi()

untuk function provinsi() ini, anda tidak perlu mengirimkan argumen apapun karena akan otomatis menampilkan semua data provinsi yang ada di indonesia. Silahkan perhatikan contoh kode di bawah ini. Saya contohkan penggunaan di NEXTJS


```js

import { provinsi, kabupaten, kecamatan, desa } from 'daftar-wilayah-indonesia'

export default function Home() {

  // cara penggunaan
  const data = provinsi()
  console.log(data)
  // cara penggunaan

  return (
    <div>
      Hello world
    </div>
  )
}

```

ketika kalian menjalankan kode di atas, maka nanti akan menampilkan data berupa JSON di console, berikut ini adalah data yang akan dihasilkan

```js

[
  { kode: '11', nama: 'Aceh' },
  { kode: '12', nama: 'Sumatera Utara' },
  { kode: '13', nama: 'Sumatera Barat' },
  { kode: '14', nama: 'Riau' },
  { kode: '15', nama: 'Jambi' },
  { kode: '16', nama: 'Sumatera Selatan' },
  { kode: '17', nama: 'Bengkulu' },
  { kode: '18', nama: 'Lampung' },
  { kode: '19', nama: 'Kepulauan Bangka Belitung' },
  { kode: '21', nama: 'Kepulauan Riau' },
  { kode: '31', nama: 'Dki Jakarta' },
  { kode: '32', nama: 'Jawa Barat' },
  { kode: '33', nama: 'Jawa Tengah' },
  { kode: '34', nama: 'Di Yogyakarta' },
  { kode: '35', nama: 'Jawa Timur' },
  { kode: '36', nama: 'Banten' },
  { kode: '51', nama: 'Bali' },
  { kode: '52', nama: 'Nusa Tenggara Barat' },
  { kode: '53', nama: 'Nusa Tenggara Timur' },
  { kode: '61', nama: 'Kalimantan Barat' },
  { kode: '62', nama: 'Kalimantan Tengah' },
  { kode: '63', nama: 'Kalimantan Selatan' },
  { kode: '64', nama: 'Kalimantan Timur' },
  { kode: '65', nama: 'Kalimantan Utara' },
  { kode: '71', nama: 'Sulawesi Utara' },
  { kode: '72', nama: 'Sulawesi Tengah' },
  { kode: '73', nama: 'Sulawesi Selatan' },
  { kode: '74', nama: 'Sulawesi Tenggara' },
  { kode: '75', nama: 'Gorontalo' },
  { kode: '76', nama: 'Sulawesi Barat' },
  { kode: '81', nama: 'Maluku' },
  { kode: '82', nama: 'Maluku Utara' },
  { kode: '91', nama: 'Papua Barat' },
  { kode: '94', nama: 'Papua' }
]

```

perhatikan responnya berupa array yang berisi object. 

```js

  { kode: '52', nama: 'Nusa Tenggara Barat' }

```

nilai dari object di atas bisa kita gunakan untuk mencari kabupaten dari masing - masing provinsi dengan cara mengambil nilai dari key kode yang dalam contoh di atas adalah 52



## Function kabupaten()

Untuk tahap kabupaten, tentunya kita ingin melihat daftar kabupaten dari provinsi yang kita pilih, sebagai contoh saya ingin melihat daftar kabupaten yang ada di Nusa Tenggara Barat, maka anda perlu mengirimkan kode provinsi yang ingin anda lihat. Untuk mendapatkan kodenya, anda perlu melihatnya di function provinsi() sebagaimana yang telah kita lakukan di atas. 

```js

  { kode: '52', nama: 'Nusa Tenggara Barat' }

```

perhatikan keys kode yang berisi nilai string 52, nilai tersebut akan kita gunakan sebagai argumen di function kabupaten(). Silahkan perhatikan kode berikut ini

```js

import { provinsi, kabupaten, kecamatan, desa } from 'daftar-wilayah-indonesia'

export default function Home() {

  // cara penggunaan
  const data = kabupaten('52')
  console.log(data)
  // cara penggunaan

  return (
    <div>
      Hello world
    </div>
  )
}

```

maka respon yang di hasilkan sebagai berikut

```js

[
  { kode: '5201', kode_provinsi: '52', nama: 'Kabupaten Lombok Barat' },
  {
    kode: '5202',
    kode_provinsi: '52',
    nama: 'Kabupaten Lombok Tengah'
  },
  { kode: '5203', kode_provinsi: '52', nama: 'Kabupaten Lombok Timur' },
  { kode: '5204', kode_provinsi: '52', nama: 'Kabupaten Sumbawa' },
  { kode: '5205', kode_provinsi: '52', nama: 'Kabupaten Dompu' },
  { kode: '5206', kode_provinsi: '52', nama: 'Kabupaten Bima' },
  {
    kode: '5207',
    kode_provinsi: '52',
    nama: 'Kabupaten Sumbawa Barat'
  },
  { kode: '5208', kode_provinsi: '52', nama: 'Kabupaten Lombok Utara' },
  { kode: '5271', kode_provinsi: '52', nama: 'Kota Mataram' },
  { kode: '5272', kode_provinsi: '52', nama: 'Kota Bima' }
]

```

sekarang anda lihat responya berbeda dari yang sebelumnya, kali ini objeknya berisi 3 nilai yakni kode, kode_provinsi dan nama. 

```js

  {
    kode: '5202',
    kode_provinsi: '52',
    nama: 'Kabupaten Lombok Tengah'
  },

```

kita akan menggunakan nilai dari keys kode untuk mencari daftar kecamatan.

PERINGATAN : Jika kalian tidak mengirimkan argumen di function kabupaten() maka nanti respon yang anda dapatkan adalah semua data kabupaten yang ada di indonesia, begitu juga jika anda salah mengirim kode di dalam argumen


## function kecamatan()

untuk penggunaan function kecamatan(), kurang lebih sama dengan function kabupaten(), yakni membutuhkan 1 argumen untuk mencari kecamatan yang ada di suatu kabupaten. Silahkan perhatikan contoh berikut ini

```js

import { provinsi, kabupaten, kecamatan, desa } from 'daftar-wilayah-indonesia'

export default function Home() {

  // cara penggunaan
  const data = kecamatan('5202')
  console.log(data)
  // cara penggunaan

  return (
    <div>
      Hello world
    </div>
  )
}

```

argumen 5202 yang saya kirim di function kecamatan() adalah untuk mengecek daftar kecamatan yang ada di Kabupaten Lombok Tengah

```js

  {
    kode: '5202',
    kode_provinsi: '52',
    nama: 'Kabupaten Lombok Tengah'
  },

```

maka nanti respon yang akan anda dapatkan adalah sebagai berikut

```js

[
  { kode: '5202010', kode_kabupaten: '5202', nama: 'Praya Barat' },
  { kode: '5202011', kode_kabupaten: '5202', nama: 'Praya Barat Daya' },
  { kode: '5202020', kode_kabupaten: '5202', nama: 'Pujut' },
  { kode: '5202030', kode_kabupaten: '5202', nama: 'Praya Timur' },
  { kode: '5202040', kode_kabupaten: '5202', nama: 'Janapria' },
  { kode: '5202050', kode_kabupaten: '5202', nama: 'Kopang' },
  { kode: '5202060', kode_kabupaten: '5202', nama: 'Praya' },
  { kode: '5202061', kode_kabupaten: '5202', nama: 'Praya Tengah' },
  { kode: '5202070', kode_kabupaten: '5202', nama: 'Jonggat' },
  { kode: '5202080', kode_kabupaten: '5202', nama: 'Pringgarata' },
  { kode: '5202090', kode_kabupaten: '5202', nama: 'Batukliang' },
  { kode: '5202091', kode_kabupaten: '5202', nama: 'Batukliang Utara' }
]

```

PERINGATAN : Jika kalian tidak mengirimkan argumen di function kecamatan() maka nanti respon yang anda dapatkan adalah semua data kecamatan yang ada di indonesia, begitu juga jika anda salah mengirim kode di dalam argumen


## function desa()

function yang terakhir yakni desa(), penggunaanya mirip dengan function kabupaten() dan kecamatan(), yakni membutuhkan sebuah argumen berupa kode.
Silahkan perhatikan kode berikut ini


```js

import { provinsi, kabupaten, kecamatan, desa } from 'daftar-wilayah-indonesia'

export default function Home() {

  // cara penggunaan
  const data = desa('5202060')
  console.log(data)
  // cara penggunaan

  return (
    <div>
      Hello world
    </div>
  )
}

```

kode di atas artinya saya ingin mencari daftar desa yang ada di kecamatan praya

```js

  { kode: '5202060', kode_kabupaten: '5202', nama: 'Praya' }

```

maka respon yang akan dapatkan adalah sebagai berikut

```js

[
  { kode: '5202060001', kode_kecamatan: '5202060', nama: 'Panjisari' },
  { kode: '5202060004', kode_kecamatan: '5202060', nama: 'Praya' },
  { kode: '5202060005', kode_kecamatan: '5202060', nama: 'Prapen' },
  { kode: '5202060006', kode_kecamatan: '5202060', nama: 'Tiwugalih' },
  { kode: '5202060009', kode_kecamatan: '5202060', nama: 'Semayan' },
  { kode: '5202060018', kode_kecamatan: '5202060', nama: 'Bunut Baok' },
  { kode: '5202060020', kode_kecamatan: '5202060', nama: 'Gonjak' },
  { kode: '5202060021', kode_kecamatan: '5202060', nama: 'Jago' },
  { kode: '5202060022', kode_kecamatan: '5202060', nama: 'Aik Mual' },
  {
    kode: '5202060023',
    kode_kecamatan: '5202060',
    nama: 'Mertak Tombok'
  },
  {
    kode: '5202060024',
    kode_kecamatan: '5202060',
    nama: 'Montong Terep'
  },
  {
    kode: '5202060025',
    kode_kecamatan: '5202060',
    nama: 'Mekar Damai'
  }
]

```


PERINGATAN : Jika kalian tidak mengirimkan argumen di function desa() maka nanti respon yang anda dapatkan adalah semua data desa yang ada di indonesia, begitu juga jika anda salah mengirim kode di dalam argumen


Kurang lebih begitulah cara menggunakan package ini, dimana kita sudah mencoba untuk mencari provinsi, kabupaten, kecamatan dan desa yang di dalam contoh ini kita mencari provinsi Nusa Tenggara Barat, lalu kabupaten Lombok Tengah, kemudian Kecamatan Praya