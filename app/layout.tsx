import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme, { COLOR } from './theme';
import { METADATA } from './metadata';
import { Toaster } from 'react-hot-toast';
import LocalizationContext from '@/contexts/LocalizationContext';

export const metadata: Metadata = {
    applicationName: METADATA.TITLE,
    title: METADATA.TITLE,
    description: METADATA.SHORT_DESCRIPTION,
    icons: '/favicon.ico',
    manifest: METADATA.MANIFEST,
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: METADATA.TITLE,
    },
};

export const viewport: Viewport = {
    themeColor: COLOR.PRIMARY,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='id'>
            <head>
                <meta name='dicoding:email' content='alfadila.anas@gmail.com' />
            </head>
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <LocalizationContext>{children}</LocalizationContext>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
