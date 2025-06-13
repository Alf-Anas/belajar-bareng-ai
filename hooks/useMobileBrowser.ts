import { useEffect, useState } from 'react'

export function useIsMobileBrowser(): boolean {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (typeof navigator !== 'undefined') {
            setIsMobile(
                /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
            )
        }
    }, [])

    return isMobile
}
