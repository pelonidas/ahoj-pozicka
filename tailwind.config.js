module.exports = {
    content: [
        './index.ejs',
        "./**/*.{ejs, js}"
    ],
    theme: {
        fontFamily: {
            "body": "Comfortaa, sans-serif",
            "text": "Avenir Next, sans-serif"
        },

        extend: {
            colors: {
                'primary': '#FCC800',
                'secondary': '#223146',
                'dRed': '#ED4036',
                'orange': '#F9951E',
                'green': '#43BD12'
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
