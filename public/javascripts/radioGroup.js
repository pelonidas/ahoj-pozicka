const radioContent = document.querySelector('.radio-content')

const specificRadio = document.querySelector('#specific-radio')


const unspecificRadio = document.querySelector('#unspecific-radio')

// const radioButtons = document.querySelectorAll('.radio');

let isRadio1Clicked = false;
let isRadio2Clicked = false

if (specificRadio) {
    const unspecificIcon = unspecificRadio.querySelector('img')
    const specificIcon = specificRadio.querySelector('img')
    specificRadio.addEventListener('click', () => {
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

        if (isRadio2Clicked) {
            unspecificIcon.classList.remove('hidden')
            specificIcon.classList.add('hidden')

            radioContent.classList.add('hidden')
        } else {
            unspecificIcon.classList.add('hidden')
        }
    })
}

    // for (const button of radioButtons) {
    //     button.addEventListener('change', () => {
    //         if (button.value === 'urcitu') {
    //             urcitaContent.classList.toggle('hidden')
    //         } else {
    //             urcitaContent.classList.add('hidden')
    //         }
    //     })
    // }