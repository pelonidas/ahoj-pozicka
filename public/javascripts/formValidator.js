







if (form2v2) {

}


const validateInput = (input) => {
    const inputValue = input.value.trim();
    if (!inputValue) {
        setErrorFor(input)
        return false
    } else {
        setSuccessFor(input)
        return true
    }
}
const setErrorFor = (input, msg = "Pole je nevyplnene") => {
    const parent = input.parentElement
    const icon = parent.querySelector('i')
    icon.classList.remove('fa-check')
    icon.classList.add('fa-xmark')
    icon.classList.remove('text-transparent')
    icon.classList.remove('text-green-400')
    icon.classList.add("text-dRed")

    const div = parent.parentElement
    div.classList.remove('mb-6')
    div.classList.add('mb-3')

    const small = div.querySelector('small')
    small.innerText = msg
    input.className = "input-danger"
}

const setSuccessFor = (input) => {
    const parent = input.parentElement
    const icon = parent.querySelector('i')
    icon.classList.remove('fa-xmark')
    icon.classList.add('fa-check')
    icon.classList.remove('text-transparent')
    icon.classList.remove('text-dRed')
    icon.classList.add("text-green-400")

    const div = parent.parentElement
    div.classList.remove('mb-6')
    div.classList.add('mb-3')

    const small = div.querySelector('small')
    small.innerText = " "
    input.className = "input-default"
}

