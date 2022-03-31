// if the input is supposed to be validated, add class 'validate' to text input field (!!!only works on text inputs rn)
// Use validateCheckbox() to validate checkbox (needs to be reworked so it can be more reusable)
// Use setInputFilter() to disable number typing - example at the end of the code

//inputs
let checkbox = document.querySelector('#podmienky')
const inputs = document.querySelectorAll('.validate');
//forms
const forms = document.querySelectorAll('form')

let allLetters = /^[A-Za-z]+$/;


for (const form of forms) {
    form.addEventListener('submit', (e) => {
        for (const input of inputs) {
            let validatedInput = validateInput(input)
            if (!validatedInput){
                e.preventDefault()
            }
        }

        let checkboxValidation = validateCheckbox()
        if (!checkboxValidation){
            e.preventDefault()
        }
    })
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

const validateCheckbox = () => {
    if (!checkbox.checked) {
        checkbox.nextElementSibling.className = "text-dRed"
        checkbox.classList.add('mr-3')
        checkbox.classList.remove('border-secondary')
        checkbox.classList.add('border-dRed')
        return false
    } else {
        checkbox.nextElementSibling.className = "text-secondary"
        return true
    }
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(phoneNum, function (value) {
    return /^-?\d*$/.test(value);
});