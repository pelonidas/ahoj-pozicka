const form1 = document.querySelector('#form1')
let allLetters = /^[A-Za-z]+$/;

let name = document.querySelector('#f-name');
let surname = document.querySelector('#l-name')
let rodneCislo = document.querySelector('#rodne-cislo')
let obciansky = document.querySelector('#obciansky')
let phoneNum = document.querySelector('#phone-num')
let email = document.querySelector('#email')
let checkbox = document.querySelector('#podmienky')

form1.addEventListener('submit', (e) => {

    let nameValidation = validateInput(name, true)
    let surnameValidation = validateInput(surname, true)
    let cisloValidation = validateInput(rodneCislo)
    let obcianskyValidation = validateInput(obciansky)
    let phoneNumValidation = validateInput(phoneNum)
    let emailValidation = validateInput(email)
    let checkboxValidation = validateCheckbox()


    if (!surnameValidation || !nameValidation || !cisloValidation || !obcianskyValidation || !phoneNumValidation || !emailValidation || !checkboxValidation) {
        e.preventDefault()
    }

})

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