import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            grayblack: '#000',
            gray: '#C5C6C7',
            turquoise: '#66FCF1',
            teal: '#45A29E',
            white: '#FFFFFF',
            'off-white': '#F0F0F0',
            black: '#000000',
            purple: '#BA33E9',
            'slate-900': '#0f172a',
            'slate-700': '#334155',
        },
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '28px',
            '4xl': '30px',
            '5xl': '32px',
        },
        extend: {
            screens: {
                xs: '390px',
            },
        },
    },
    plugins: [],
}
export default config
