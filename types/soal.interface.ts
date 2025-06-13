export type SoalDBType = {
    id: string
    tanggal: string
    kelas: number
    mata_pelajaran: string
    topik: string
    jumlah_soal: number
    daftar_soal: SoalType[]
}

export type SoalType = {
    soal: string
    opsi_a: string
    opsi_b: string
    opsi_c: string
    opsi_d: string
    kunci_jawaban: string
    penjelasan: string
}
