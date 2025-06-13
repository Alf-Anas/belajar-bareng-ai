import { NextResponse } from 'next/server'
import { AzureOpenAI } from 'openai'
import {
    RulesSettingType,
    SemuaTopikPelajaran,
} from '@/types/rules-setting.interface'

const AZURE_API_KEY = process.env.AZURE_API_KEY || ''
const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT || ''
const AZURE_API_VERSION = process.env.AZURE_API_VERSION || ''
const AZURE_DEPLOYMENT = process.env.AZURE_DEPLOYMENT || ''

type AIDataType = RulesSettingType

async function runAzure({
    kelas,
    mata_pelajaran,
    topik,
    jumlah_soal,
}: AIDataType) {
    const client = new AzureOpenAI({
        deployment: AZURE_DEPLOYMENT,
        apiVersion: AZURE_API_VERSION,
        apiKey: AZURE_API_KEY,
        endpoint: AZURE_ENDPOINT,
    })

    const eTopik =
        topik === SemuaTopikPelajaran ? '' : `khususnya topik ${topik},`

    const events = await client.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    'Kamu adalah Aplikasi Belajar Bareng AI. Tugasmu adalah membuat soal pilihan ganda yang cocok untuk anak SD berdasarkan permintaan pengguna.',
            },
            {
                role: 'user',
                content: `
                Tolong buatkan ${jumlah_soal} soal pilihan ganda untuk mata pelajaran ${mata_pelajaran}, ${eTopik} untuk siswa SD kelas ${kelas}.

                Setiap soal harus memiliki:
                - Pertanyaan yang mudah dipahami anak-anak
                - 4 pilihan jawaban (A, B, C, D) yang berbeda dan masuk akal
                - Kunci jawaban yang benar dan diacak posisinya
                - Penjelasan singkat dan sederhana mengapa jawaban itu benar, gunakan contoh dari kehidupan sehari-hari

                Tampilkan hasil dalam format JSON seperti ini:
                {
                    "daftar_soal": [
                        {
                        "soal": "...",
                        "opsi_a": "...",
                        "opsi_b": "...",
                        "opsi_c": "...",
                        "opsi_d": "...",
                        "kunci_jawaban": "A/B/C/D",
                        "penjelasan": "..."
                        }
                    ]
                }
                `,
            },
        ],
        model: AZURE_DEPLOYMENT,
        max_tokens: 4096,
        temperature: 0.9,
        top_p: 1.0,
        response_format: {
            type: 'json_object',
        },
    })

    console.log(events)

    return events
}

export async function POST(request: Request) {
    const { kelas, mata_pelajaran, topik, jumlah_soal } = await request.json()

    if (!kelas || !mata_pelajaran || !topik || !jumlah_soal) {
        return NextResponse.json(
            {
                error: true,
                message:
                    'Kelas, Mata Pelajaran, Topik, dan Jumlah Soal wajib diisi!',
            },
            { status: 422 }
        )
    }

    try {
        const res = await runAzure({
            kelas,
            mata_pelajaran,
            topik,
            jumlah_soal,
        })
        const resContent = res.choices[0].message.content
        if (resContent) {
            return NextResponse.json(
                {
                    success: true,
                    data: JSON.parse(resContent),
                },
                { status: 200 }
            )
        } else {
            throw new Error('No Responses!')
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}
