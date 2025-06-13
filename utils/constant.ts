export const ROUTE = {
    HOME: {
        URL: '/',
    },
    DOWNLOAD: {
        URL: '/unduh-soal',
        TITLE: 'Unduh Soal',
    },
    TASK: {
        URL: '/kerjakan-soal',
        TITLE: 'Kerjakan Soal',
        VIEW: {
            setURL: (soal_id: string) => `/kerjakan-soal?soal_id=${soal_id}`,
        },
        START: {
            setURL: (soal_id: string, jawaban_id: string) =>
                `/kerjakan-soal?soal_id=${soal_id}&jawaban_id=${jawaban_id}`,
        },
    },
}

export const DEFAULT_COOKIE_BEHAVIOUR = { maxAge: 60 * 60 * 24 * 7 } // Seven days

export const CACHE_NAME = {
    PAGES: 'pages',
    TASK: 'kerjakan-soal',
    DOWNLOAD: 'unduh-soal',
}
