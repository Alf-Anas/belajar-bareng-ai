import type { Config } from 'tailwindcss'

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './containers/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                secondary: '#FACC15',
                'primary-dark': '#34c89e',
                'primary-gray': '#2c2b33',
            },
            fontFamily: {
                primary: ['VAG Rounded BT'],
                secondary: ['Segoe UI'],
            },
        },
    },
    plugins: [],
} satisfies Config
