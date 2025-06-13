export const TopikPelajaran = [
    {
        id: 'matematika',
        title: 'Matematika',
        subkategori: [
            {
                label: 'Berhitung Dasar',
                deskripsi:
                    'Penjumlahan, pengurangan, perkalian, pembagian (untuk semua kelas)',
            },
            {
                label: 'Operasi Bilangan',
                deskripsi: 'Bilangan bulat, pecahan sederhana, desimal dasar',
            },
            {
                label: 'Geometri Sederhana',
                deskripsi:
                    'Mengenal bangun datar (persegi, segitiga, lingkaran), bangun ruang (kubus, balok)',
            },
            {
                label: 'Pengukuran',
                deskripsi: 'Satuan panjang, berat, waktu (jam)',
            },
            {
                label: 'Pecahan Masalah',
                deskripsi:
                    'Soal cerita sederhana yang melibatkan perhitungan sehari-hari',
            },
        ],
    },
    {
        id: 'bahasa-indonesia',
        title: 'Bahasa Indonesia',
        subkategori: [
            {
                label: 'Kosakata dan Makna Kata',
                deskripsi: 'Mengenal arti kata, lawan kata, persamaan kata',
            },
            {
                label: 'Pemahaman Teks',
                deskripsi:
                    'Membaca paragraf atau cerita pendek dan menjawab pertanyaan',
            },
            {
                label: 'Struktur Kalimat',
                deskripsi: 'Menyusun kalimat, melengkapi kalimat rumpang',
            },
            {
                label: 'Tata Bahasa dan Ejaan',
                deskripsi: 'Penggunaan tanda baca, huruf kapital, imbuhan',
            },
            {
                label: 'Menulis Kreatif Sederhana',
                deskripsi: 'Melengkapi dongeng, membuat deskripsi benda',
            },
        ],
    },
    {
        id: 'ipas',
        title: 'IPAS',
        subkategori: [
            {
                label: 'Makhluk Hidup',
                deskripsi:
                    'Tumbuhan, hewan (klasifikasi sederhana, habitat, ciri-ciri)',
            },
            {
                label: 'Tubuh Manusia',
                deskripsi: 'Panca indera, organ dasar, menjaga kesehatan',
            },
            {
                label: 'Lingkungan & Ekosistem',
                deskripsi: 'Cuaca, iklim, siklus air, pelestarian lingkungan',
            },
            {
                label: 'Benda dan Energi',
                deskripsi:
                    'Sifat benda (padat, cair, gas), sumber energi sederhana',
            },
            {
                label: 'Identitasku',
                deskripsi: 'Keluarga, teman, peran di rumah dan sekolah',
            },
            {
                label: 'Lingkungan Sekitarku',
                deskripsi:
                    'Mengenal desa/kota, peta sederhana, pekerjaan di sekitar',
            },
            {
                label: 'Sejarah Lokal & Nasional Sederhana',
                deskripsi: 'Tokoh pahlawan, peristiwa penting',
            },
            {
                label: 'Keragaman Budaya Indonesia',
                deskripsi:
                    'Pakaian adat, rumah adat, makanan khas, lagu daerah',
            },
            {
                label: 'Nilai Pancasila & Kewarganegaraan',
                deskripsi: 'Gotong royong, jujur, hak dan kewajiban anak',
            },
        ],
    },
    {
        id: 'bahasa-inggris',
        title: 'Bahasa Inggris',
        subkategori: [
            {
                label: 'Kosakata Dasar',
                deskripsi: 'Angka, warna, nama benda, hewan, anggota keluarga',
            },
            {
                label: 'Frasa Sehari-hari',
                deskripsi: 'Salam, perkenalan diri, menanyakan kabar',
            },
            {
                label: 'Kata Kerja Sederhana',
                deskripsi: 'Aktivitas sehari-hari',
            },
            {
                label: 'Mendengarkan',
                deskripsi: 'Memahami instruksi atau pertanyaan sederhana',
            },
        ],
    },
    {
        id: 'karakter-pancasila',
        title: 'Karakter & Pancasila',
        subkategori: [
            {
                label: 'Beriman & Bertakwa',
                deskripsi: 'Menghargai perbedaan, bersyukur',
            },
            {
                label: 'Gotong Royong & Mandiri',
                deskripsi: 'Kerja sama, bertanggung jawab pada diri sendiri',
            },
            {
                label: 'Bernalar Kritis & Kreatif',
                deskripsi: 'Memecahkan masalah sederhana, berpikir inovatif',
            },
            {
                label: 'Berkebinekaan Global',
                deskripsi: 'Mengenal dan menghargai budaya lain',
            },
        ],
    },
    {
        id: 'literasi-digital',
        title: 'Literasi Digital',
        subkategori: [
            {
                label: 'Mengenal Internet & Gadget',
                deskripsi: 'Fungsi dasar, manfaat',
            },
            {
                label: 'Keamanan Data Sederhana',
                deskripsi: 'Pentingnya tidak berbagi info pribadi',
            },
            {
                label: 'Etika Berinternet',
                deskripsi: 'Berbicara sopan, tidak percaya berita bohong',
            },
            {
                label: 'Bahaya Judi Online (Pencegahan Dini)',
                deskripsi:
                    'Mengajarkan tentang bahaya aktivitas yang tidak baik di internet',
            },
        ],
    },
]

export function getLabelTopic(id: string) {
    const eTopic = TopikPelajaran.find((item) => item.id === id)
    return eTopic?.title
}

export function getTopic(id: string) {
    const eTopic = TopikPelajaran.find((item) => item.id === id)
    return eTopic
}
