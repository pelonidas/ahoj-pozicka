const urcitaContents = document.querySelectorAll('.radio-content')


for (const urcitaContent of urcitaContents) {
    const radioButtons = document.querySelectorAll('.radio');
    for (const button of radioButtons) {
        button.addEventListener('change', () => {
            if (button.value === 'urcitu') {
                urcitaContent.classList.toggle('hidden')
            } else {
                urcitaContent.classList.add('hidden')
            }
        })
    }
}