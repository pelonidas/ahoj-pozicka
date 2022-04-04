// if the input is supposed to be validated, add class 'validate' to text input field (!!!only works on text inputs rn)
// Use validateCheckbox() to validate checkbox (needs to be reworked so it can be more reusable)
// Use setInputFilter() to disable number typing - example at the end of the code


const checkboxes = document.querySelectorAll('.checkbox-check')
const checkboxContainers = document.querySelectorAll('.checkbox-container')
let isChecked = false;

//inputs
const inputs = document.querySelectorAll('.validate');
const numOnly = document.querySelectorAll('.num-only')
//forms
const forms = document.querySelectorAll('form')

let allLetters = /^[A-Za-z]+$/;


for (const form of forms) {
    form.addEventListener('submit', (e) => {
        for (const input of inputs) {
            let validatedInput = validateInput(input)
            if (!validatedInput ){
                e.preventDefault()
            }
        }

        for (const checkboxContainer of checkboxContainers) {
            if (!isChecked) {
                e.preventDefault()
            }
            validateCheckbox(checkboxContainer)
        }
    })
}
for (const checkboxContainer of checkboxContainers) {
    const checkbox = checkboxContainer.querySelector('.checkbox-check');
    checkboxContainer.addEventListener('click', () => {
        isChecked = !isChecked;
        checkbox.classList.toggle('invisible')
    })

    checkboxContainer.addEventListener('mouseenter', () => {
        console.log('hey')
        checkboxContainer.classList.remove('border-secondary')
        checkboxContainer.classList.add('border-primary')
    })
}

const validateCheckbox = (checkbox) => {
   console.log(checkbox.nextElementSibling)
    let sibling = checkbox.nextElementSibling;
    if (!isChecked) {
        checkbox.classList.remove('border-secondary')
        checkbox.classList.add('border-dRed')
        sibling.classList.add('text-dRed')
    } else {
        checkbox.classList.remove('border-dRed')
        checkbox.classList.add('border-secondary')
        sibling.classList.remove('text-dRed')
        sibling.classList.add('text-secondary')
    }
}

const validateInput = (input) => {
    const inputValue = input.value.trim();

    //TODO refactor this shit
    if (!inputValue) {
        input.className = ''
        input.classList.add('border-2', 'border-dRed', 'hover:border-primary', 'w-full', 'rounded-lg', 'focus:border-primary', 'focus:ring-0', 'focus:drop-shadow-md');
        const parentInput = input.parentElement;
        const icon = parentInput.querySelector('i');

        icon.classList.remove('fa-check', 'text-transparent')
        icon.classList.add('fa-xmark', 'text-dRed')

        const div = parentInput.parentElement
        div.classList.remove('mb-6')
        div.classList.add('mb-3')

        const small = div.querySelector('small')
        small.innerText = "Pole je povinné."
        return false
    } else {
        setSuccessFor(input)
        return true
    }
}

// const setErrorFor = (input, msg = "Pole je povinné.") => {
//
// }

const setSuccessFor = (input) => {
    input.className = ""
    input.classList.add('border-2', 'border-secondary', 'hover:border-primary', 'w-full', 'rounded-lg', 'focus:border-primary', 'focus:ring-0', 'focus:drop-shadow-md')
    const parent = input.parentElement
    const icon = parent.querySelector('i')
    icon.classList.remove('fa-xmark', 'text-transparent', 'text-dRed')
    icon.classList.add( 'fa-check', 'text-green-400')


    const div = parent.parentElement
    div.classList.remove('mb-6')
    div.classList.add('mb-3')

    const small = div.querySelector('small')
    small.innerText = " "

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

for (const numOnlyElement of numOnly) {
    setInputFilter(numOnlyElement, function (value) {
        return /^-?\d*$/.test(value);
    });
}
