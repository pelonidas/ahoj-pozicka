$('.ui.dropdown').dropdown({
    message: {
        noResults: 'Neboli nájdené žiadne výsledky.'
    }
})
// $.fn.dropdown.settings.message = function (search) {
//     console.log(search)
// }

let test = document.querySelector('.ui')
test.addEventListener('click', () => {
    test.classList.remove('upward')
})