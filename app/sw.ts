import { CACHE_NAME } from '@/utils/constant'
import { defaultCache, PAGES_CACHE_NAME } from '@serwist/next/worker'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { ExpirationPlugin, Serwist, StaleWhileRevalidate } from 'serwist'

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
    }
}

declare const self: ServiceWorkerGlobalScope

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: [
        {
            matcher: ({ url: { pathname } }) => {
                if (pathname.startsWith('/unduh-soal')) {
                    return true
                }
                return false
            },
            handler: new StaleWhileRevalidate({
                cacheName: CACHE_NAME.DOWNLOAD,
                matchOptions: { ignoreSearch: true },
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                    }),
                ],
            }),
        },
        {
            matcher: ({ url: { pathname } }) => {
                if (pathname.startsWith('/kerjakan-soal')) {
                    return true
                }
                return false
            },
            handler: new StaleWhileRevalidate({
                cacheName: CACHE_NAME.TASK,
                matchOptions: {
                    ignoreSearch: true,
                },
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                    }),
                ],
            }),
        },
        {
            matcher: ({ request, url: { pathname }, sameOrigin }) =>
                request.headers.get('Content-Type')?.includes('text/html') &&
                sameOrigin &&
                !pathname.startsWith('/api/'),
            handler: new StaleWhileRevalidate({
                cacheName: PAGES_CACHE_NAME.html,
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    }),
                ],
            }),
        },
        ...defaultCache,
    ],
    fallbacks: {
        entries: [
            {
                url: '/~offline',
                matcher({ request }) {
                    return request.destination === 'document'
                },
            },
        ],
    },
})

serwist.addEventListeners()
