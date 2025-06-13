import { useState, useEffect } from 'react'

type BeforeInstallPromptEvent = Event & {
    prompt: () => void
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const usePWAInstall = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null)
    const [isInstalled, setIsInstalled] = useState<boolean>(false)

    useEffect(() => {
        // Check if PWA is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true)
        }

        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault()
            setDeferredPrompt(event as BeforeInstallPromptEvent)
        }

        window.addEventListener(
            'beforeinstallprompt',
            handleBeforeInstallPrompt
        )

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                handleBeforeInstallPrompt
            )
        }
    }, [])

    const promptInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA installed successfully')
                } else {
                    console.log('PWA installation dismissed')
                }
                setDeferredPrompt(null)
            })
        }
    }

    return { isInstalled, promptInstall, canInstall: !!deferredPrompt }
}

export default usePWAInstall
