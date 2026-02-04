/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Funky Pop Palette
                'funky-bg': '#fffbf0',       // Warm White
                'funky-text': '#2d3436',     // Ink Black
                'funky-yellow': '#ffe66d',   // Sunny
                'funky-pink': '#ff6b6b',     // Hot Pink
                'funky-cyan': '#4ecdc4',     // Teal
                'funky-purple': '#a55eea',   // Violet
                'funky-lime': '#d1f2a5',     // Pale Lime
                'funky-orange': '#feca57',   // Pastel Orange
            },
            fontFamily: {
                cartoon: ['Fredoka', 'sans-serif'],
                heading: ['Orbitron', 'sans-serif'],
            },
            backgroundImage: {
                'dots': "radial-gradient(#000 20%, transparent 20%)",
                'stripes': "repeating-linear-gradient(45deg, #ffe66d 0, #ffe66d 10px, #fff 10px, #fff 20px)",
            },
            boxShadow: {
                'brutal': '4px 4px 0px 0px #000000',
                'brutal-lg': '8px 8px 0px 0px #000000',
            }
        },
    },
    plugins: [],
}
