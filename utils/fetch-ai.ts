import { RulesSettingType } from '@/types/rules-setting.interface'
import { SoalType } from '@/types/soal.interface'

type FetchAIType = RulesSettingType

export async function fetchAI(rawData: FetchAIType) {
    const response = await fetch('/api/buat-soal', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(rawData),
    })

    if (response.status === 200) {
        const resData = await response.json()
        return {
            ok: true,
            message: 'success',
            results: resData?.data as { daftar_soal: SoalType[] },
        }
    } else {
        return { ok: false, message: JSON.stringify(response.json()) }
    }
}
