let numeral = window.numeral

let money_slide = document.getElementById("money_range"),
    year_slide = document.getElementById("year_range");

let money_field = document.getElementById("money_input"),
    year_field = document.getElementById("year_input");

let interest = document.querySelector('#interest');

let mes_sum = document.getElementById("mes_sum");

const exampleSum = document.querySelector('#exampleSum');
const examplePercentage = document.querySelector('#examplePercentage')
const exampleMonthly = document.querySelector('#exampleMonthly');
const exampleLength = document.querySelector('#exampleLength');
const exampleFinal = document.querySelector('#exampleFinal');

const exampleSum2 = document.querySelector('#exampleSum2');
const examplePercentage2 = document.querySelector('#examplePercentage2')
const exampleMonthly2 = document.querySelector('#exampleMonthly2')
const exampleLength2 = document.querySelector('#exampleLength2')
const exampleFinal2 = document.querySelector('#exampleFinal2');
//refinancovanie vars
let moneySlideRef = document.querySelector('#money_range_ref'),
    yearSlideRef = document.querySelector('#year_range_ref'),
    moneyFieldRef = document.querySelector('#money_input_ref'),
    yearFieldRef = document.querySelector('#year_input_ref')

let mesSumRef = document.getElementById("mes_sum_ref");
let sum;
let monthly;
let cost;
let years;
let years2;


numeral.register('format', 'euro', {
    regexps: {
        format: /(€)/,
        unformat: /(€)/
    },
    format: function (value, format, roundingFunction) {
        var space = numeral._.includes(format, ' €') ? ' ' : '',
            output;


        // check for space before %
        format = format.replace(/\s?\€/, '');

        output = numeral._.numberToFormat(value, format, roundingFunction);

        if (numeral._.includes(output, ')')) {
            output = output.split('');

            output.splice(-1, 0, space + '€');

            output = output.join('');
        } else {
            output = output + space + '€';
        }

        return output;
    },
    unformat: function (string) {
        return numeral._.stringToNumber(string) * 0.01;
    }
});

numeral.register('format', 'years', {
    regexps: {
        format: /(r)/,
        unformat: /(r)/
    },
    format: function (value, format, roundingFunction) {
        var space = numeral._.includes(format, ' r') ? ' ' : '',
            output;
        // check for space before %
        format = format.replace(/\s?\r/, '');

        output = numeral._.numberToFormat(value, format, roundingFunction);

        if (numeral._.includes(output, ')')) {
            output = output.split('');

            output.splice(-1, 0, space + 'rokov');

            output = output.join('');
        } else {
            output = output + space + 'rokov';
        }

        return output;
    },
    unformat: function (string) {
        return numeral._.stringToNumber(string) * 0.01;
    }
});

// use your custom format
numeral().format('0%');

let data = "";


//declaring functions
function handleMaxMinInputs(input, min, max) {
    if (input) {
        input.addEventListener('input', () => {
            setInputFilter(input, function (value) {
                return /^-?\d*$/.test(value);
            })
        })
        input.addEventListener('change', () => {
            let value = parseInt(input.value);

            if (value < min) input.value = min;
            if (value > max) input.value = max;

        })
    }
}

if (year_field) handleMaxMinInputs(year_field, 1, 8)

if (money_field) handleMaxMinInputs(money_field, 400, 15_000)

if (yearFieldRef) handleMaxMinInputs(yearFieldRef, 1, 8)

if (moneyFieldRef) handleMaxMinInputs(moneyFieldRef, 400, 20_000)

const calcMonthlyCost = function (moneyVal, yearVal, moneySlider, yearSlider) {
        let money = Number(moneyVal);
        let years = Number(yearVal);

        // let moneyMax = Number(money_slide.max);
        // let moneyMin = Number(money_slide.min);
        // let yearMax = Number(year_slide.max);
        // let yearMin = Number(year_slide.min);

        let moneyMax = Number(moneySlider.max)
        let moneyMin = Number(moneySlider.min)

        let yearMax = Number(yearSlider.max)
        let yearMin = Number(yearSlider.min)

        if (isNaN(money) || isNaN(years)) {
            return "";
        }

        if (money > moneyMax || money < moneyMin) {
            return "";
        }

        if (years > yearMax || years < yearMin) {
            return "";
        }

        let monthlyCost;

        if (years === 1) {
            monthlyCost = money * ((0.3632 / 12) / (1 - Math.pow((1 / (1 + (0.3632 / 12))), years * 12)));
            monthly = '36,32'
        }
        if (years >= 2 && years <= 5) {
            monthlyCost = money * ((0.1794 / 12) / (1 - Math.pow((1 / (1 + (0.1794 / 12))), years * 12)));
            monthly = '17,94'
        }
        if (years > 5 && years <= 8) {
            monthlyCost = money * ((0.1656 / 12) / (1 - Math.pow((1 / (1 + (0.1656 / 12))), years * 12)));
            monthly = '16,56'
        }
        monthlyCost = monthlyCost.toFixed(2);

        data = `${monthlyCost}`;
        interest.value = data;
        cost = monthlyCost;
        return monthlyCost + " €";

}

function doCalc(moneySlider, yearsSlider, sumLabel) {
    let moneyVal = moneySlider.value;
    let yearVal = yearsSlider.value;

    sumLabel.innerHTML = calcMonthlyCost(moneyVal, yearVal, moneySlider, yearsSlider);
}

function handleMoneyTextField(textInput, moneySlider, yearSlider, sumLabel) {
    textInput.addEventListener('input', (e) => {
        let moneyValue = e.target.value;

        if (moneyValue) {
            if (!isNaN(moneyValue)) {
                moneyValue = Number(moneyValue);
                moneyValue = Math.ceil(moneyValue / 100) * 100;
                moneySlider.value = moneyValue;
                moneySlider.style.setProperty('--value', String(moneyValue));
                doCalc(moneySlider, yearSlider, sumLabel);
            }
        }
    })
}

function handleTextInputFocusOut(textField, slider, format) {
    textField.addEventListener('focusout', (e) => {
        if (!textField.value) {
            textField.value = slider.value;
        }
        textField.value = numeral(e.target.value).format(format)
    })
}

function handleTextInputFocusIn(textField) {
    textField.addEventListener('focusin', () => {
        textField.value = '';
    })
}

// if (money_field) money_field.addEventListener('focusout', (e) => {
//     if (!money_field.value) {
//         money_field.value = money_slide.value
//     }
//     money_field.value = numeral(e.target.value).format('00,000 €')
// })

const moneyFormat = '00,000 €'
const yearFormat = '0 r'

if (money_field) handleTextInputFocusOut(money_field, money_slide, moneyFormat)

if (year_field) handleTextInputFocusOut(year_field, year_slide, yearFormat)

if (moneyFieldRef) handleTextInputFocusOut(moneyFieldRef, moneySlideRef, moneyFormat)

if (yearFieldRef) handleTextInputFocusOut(yearFieldRef, yearSlideRef, yearFormat)

if (money_field) handleTextInputFocusIn(money_field)

if (year_field) handleTextInputFocusIn(year_field)

if (yearFieldRef) handleTextInputFocusIn(yearFieldRef)

if (money_field) handleMoneyTextField(money_field, money_slide, year_slide, mes_sum)

if (moneyFieldRef) handleMoneyTextField(moneyFieldRef, moneySlideRef, yearSlideRef, mesSumRef)

if (moneyFieldRef) handleTextInputFocusIn(moneyFieldRef)

if (year_field) year_field.addEventListener('input', (e) => {
    let val = e.target.value;
    if (val) {
        if (!isNaN(val)) {
            val = Number(val);
            val = Math.ceil(val);
            year_slide.value = val;
            year_slide.style.setProperty('--value', String(val));
            doCalc(money_slide, year_slide, mes_sum);
        }
    }
});

if (money_slide) money_slide.addEventListener('input', (e) => {
    sum = money_field.value
    money_field.value = numeral(e.target.value).format('00,000 €')
    doCalc(money_slide, year_slide, mes_sum);
});

if (year_slide) year_slide.addEventListener('input', (e) => {
    year_field.value = numeral(e.target.value).format('(0 r)');
    years = e.target.value
    doCalc(money_slide, year_slide, mes_sum);
});

if (yearFieldRef) yearFieldRef.addEventListener('input', (e) => {
    let val = e.target.value

    if (val) {
        if (!isNaN(val)) {
            val = Number(val);
            val = Math.ceil(val);
            yearSlideRef.value = val;
            yearSlideRef.style.setProperty('--value', String(val));
            doCalc(moneySlideRef, yearSlideRef, mesSumRef);
        }
    }
})

if (moneySlideRef) moneySlideRef.addEventListener('input', (e) => {
    moneyFieldRef.value = numeral(e.target.value).format('00,000 €')

    doCalc(moneySlideRef, yearSlideRef, mesSumRef)
})

if (yearSlideRef) yearSlideRef.addEventListener('input', (e) => {
    yearFieldRef.value = numeral(e.target.value).format('(0 r)');
    years2 = e.target.value
    doCalc(moneySlideRef, yearSlideRef, mesSumRef)
})

if (money_slide) {
    function handlePriklad() {
        let final;
        let newSum;
        let newMonthly;
        money_slide.addEventListener('change', () => {
            exampleSum.innerHTML = money_field.value
            exampleMonthly.innerHTML = cost;
        })
        year_slide.addEventListener('change', () => {
            examplePercentage.innerHTML = monthly
            exampleMonthly.innerHTML = cost;
            exampleLength.innerHTML = (years * 12).toString()
            newSum = money_field.value.replace(/[^0-9.]/g, '')
            newMonthly = monthly.replace(',', '.')
            // exampleFinal.innerHTML = final
            final = ((years * 12) * cost).toFixed(2);
            exampleFinal.innerHTML = final

        })
    }
    handlePriklad()
}
if (moneyFieldRef) {
    function handlePriklad2() {
        let final;
        let newSum;
        let newMonthly;
        moneySlideRef.addEventListener('change', () => {
            console.log(cost)
            exampleSum2.innerHTML = moneyFieldRef.value;
            exampleMonthly2.innerHTML = cost
        })
        yearSlideRef.addEventListener('change', () => {
            console.log(years2)
            examplePercentage2.innerHTML = monthly
            exampleMonthly2.innerHTML = cost
            exampleLength2.innerHTML = (years2 * 12).toString()
            newSum = moneyFieldRef.value.replace(/[^0-9.]/g, '')
            newMonthly = monthly.replace(',', '.')
            final = ((years2 * 12) * cost).toFixed(2);
            exampleFinal2.innerHTML = final
        })
    }
    handlePriklad2()
}





