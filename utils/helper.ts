import dayjs from 'dayjs'

export function formatDateTime(inDate: string | undefined) {
    if (!inDate) return ''
    return dayjs(inDate).format('HH:mm DD-MM-YYYY')
}

export function generateRandomCode(length: number = 4): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz' // All lowercase letters
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
    }

    return result
}

export function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m} menit ${s} detik`
}
