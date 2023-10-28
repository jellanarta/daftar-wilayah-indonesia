const provinsidata = require('./provinsi')
const kabupatendata = require('./kabupaten')
const kecamatandata = require('./kecamatan')
const desadata = require('./desa')
const m = (o = '') => {
    const b = o.split(' ')
    const t = []
    b.forEach(d => {
        let k = ''
        const j = d.split('')
        k += `${j[0] + j.slice(1).join('').toLowerCase()}`
        t.push(k)
    })
    return t.join(' ')
}
const inti = (d = '', k = '', ko = true) => {
    if (ko) { return me(d.split('-'), true, k) } else { return me(d.split('-'), false) }
}
const me = (dt = [], ke = false, ked = '') => {
    const ha = []
    dt.forEach(daa => {
        const du = daa.split(',')
        ke ? ha.push({ kode: du[0], [`${ked}`]: du[1], nama: m(du[2]) }) : ha.push({ kode: du[0], nama: m(du[1]) })
    })
    return ha
}

const ut = (ko = '', dt = [], te = '', kon = true) => {
    if (kon) {
        const hs = inti(dt, te)
        if (ko.length) {
            const ss = hs.filter(dt => dt[te] === ko)
            if (ss.length) {
                return ss
            } else {
                return hs
            }
        } else {
            return hs
        }
    } else {
        return inti(provinsidata, '', false)
    }
}
const provinsi = () => { return ut('', [], '', false) }
const kabupaten = (kode = '') => { return (ut(kode, kabupatendata, 'kode_provinsi')) }
const kecamatan = (kode = '') => { return (ut(kode, kecamatandata, 'kode_kabupaten')) }
const desa = (kode = '') => { return (ut(kode, desadata, 'kode_kecamatan')) }
console.log(desa('5202070'));
module.exports = { provinsi, kabupaten, kecamatan, desa }