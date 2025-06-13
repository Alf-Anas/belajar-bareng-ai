export type JawabanDBType = {
    id: string
    soal_id: string
    waktu_mulai: string
    waktu_selesai: string
    durasi: number // dalam detik (opsional, bisa dihitung dari waktu_selesai - waktu_mulai)
    jawaban_pengguna: JawabanPenggunaType[]
    skor: number
}

export type JawabanPenggunaType = {
    nomor: number // nomor soal dari 1 sampai jumlah_soal
    jawaban: string // "A" | "B" | "C" | "D" | "" untuk belum menjawab
    benar: boolean
}

export function generateDefaultJawaban(
    id: string,
    soal_id: string,
    jumlah_soal: number
): JawabanDBType {
    const now = new Date().toISOString()

    const jawaban_pengguna: JawabanPenggunaType[] = Array.from(
        { length: jumlah_soal },
        (_, index) => ({
            nomor: index + 1,
            jawaban: '',
            benar: false,
        })
    )

    return {
        id,
        soal_id,
        waktu_mulai: now,
        waktu_selesai: '', // belum selesai
        durasi: 0, // akan dihitung saat selesai
        jawaban_pengguna,
        skor: 0, // default 0
    }
}
