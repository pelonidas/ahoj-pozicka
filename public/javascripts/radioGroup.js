const radioContent = document.querySelector('.radio-content')

const specificRadio = document.querySelector('#specific-radio')


const unspecificRadio = document.querySelector('#unspecific-radio')

// const radioButtons = document.querySelectorAll('.radio');

let isRadio1Clicked = false;
let isRadio2Clicked = false
const period = document.querySelector('#period')

if (specificRadio) {
    const unspecificIcon = unspecificRadio.querySelector('img')
    const specificIcon = specificRadio.querySelector('img')
    specificRadio.addEventListener('click', () => {
        period.value = 'určitú'
        isRadio2Clicked = false
        isRadio1Clicked = true
        if (isRadio1Clicked) {
            specificIcon.classList.remove('hidden')
            unspecificIcon.classList.add('hidden')

            radioContent.classList.remove('hidden')
        } else {
            specificIcon.classList.add('hidden')
        }
    })
    unspecificRadio.addEventListener('click', () => {
        isRadio2Clicked = true
        isRadio1Clicked = false
        period.value = 'neurčitú'
        if (isRadio2Clicked) {
            unspecificIcon.classList.remove('hidden')
            specificIcon.classList.add('hidden')

            radioContent.classList.add('hidden')
        } else {
            unspecificIcon.classList.add('hidden')
        }
    })
}
