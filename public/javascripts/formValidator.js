const form1 = document.querySelector('#form1')
let allLetters = /^[A-Za-z]+$/;

let name = document.querySelector('#f-name');
let surname = document.querySelector('#l-name')
let rodneCislo = document.querySelector('#rodne-cislo')
let obciansky = document.querySelector('#obciansky')
let phoneNum = document.querySelector('#phone-num')
let email = document.querySelector('#email')
let checkbox = document.querySelector('#podmienky')

let hehe = checkbox.nextElementSibling
form1.addEventListener('submit', (e) => {

    let nameValidation = validateInput(name, true)
    let surnameValidation = validateInput(surname, true)
    let cisloValidation = validateInput(rodneCislo)
    let obcianskyValidation = validateInput(obciansky)
    let phoneNumValidation = validateInput(phoneNum)
    let emailValidation = validateInput(email)


    if (!nameValidation || !surnameValidation || !cisloValidation || !obcianskyValidation || !phoneNumValidation || !emailValidation || !validateCheckbox()){
        e.preventDefault()
    }
})

const validateCheckbox = () => {
    if (!checkbox.checked) {
        checkbox.nextElementSibling.className = "text-dRed"
        console.log(checkbox.checked)
        return false
    } else {
        return true
    }
}

const validateInput = (input, isString = false) => {
    if (isString) {
        if (!input.value.trim().match(allLetters)){
            setErrorFor(input, "Wrong data type")
            return false
        } else {
            setSuccessFor(input)
        }
    }
    if (!input.value.trim()) {
        setErrorFor(input)
        return false
    }
    else {
        setSuccessFor(input)
        return true
    }
}
let setErrorFor = (input, msg = "Pole je nevyplnene") => {
    input.className = 'input-danger'
    input.nextElementSibling.innerText = msg;
    input.previousElementSibling.className = "text-dRed"
    input.placeholder = ""
}
//
let setSuccessFor = (input) => {
    input.className = 'input-success'
    input.nextElementSibling.innerText = ""
    input.previousElementSibling.className = "text-secondary"

}
//
// Restricts input for the given textbox to the given inputFilter.
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