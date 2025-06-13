import { JawabanDBType } from '@/types/jawaban.interface'
import { SoalDBType } from '@/types/soal.interface'
import Dexie, { type EntityTable } from 'dexie'

const db = new Dexie('BelajarBarengAI.DB') as Dexie & {
    soal: EntityTable<SoalDBType, 'id'>
    jawaban: EntityTable<JawabanDBType, 'id'>
}

// Schema declaration
db.version(1).stores({
    soal: 'id, tanggal, kelas, mata_pelajaran, topik, jumlah_soal',
    jawaban: 'id, soal_id, waktu_mulai, waktu_selesai, durasi, skor',
})

export { db }
