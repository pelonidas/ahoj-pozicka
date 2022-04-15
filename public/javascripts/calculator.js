//data
const AutoNumeric = window.autonumeric;
const numeral = window.numeral

numeral.register('format', 'euro', {
    regexps: {
        format: /(€)/,
        unformat: /(€)/
    },
    format: function(value, format, roundingFunction) {
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
    unformat: function(string) {
        return numeral._.stringToNumber(string) * 0.01;
    }
});

var data = "";
//sliders
let money_slide = document.getElementById("money_range"),
    year_slide = document.getElementById("year_range");

//text fields
let money_field = document.getElementById("money_input"),
    year_field = document.getElementById("year_input");

//hidden
var interest = document.querySelector('#interest');

//outputs
var mes_sum = document.getElementById("mes_sum");

let test;

const calcMonthlyCost = function (moneyVal, yearVal) {
    let money = Number(moneyVal);
    let years = Number(yearVal);

    let moneyMax = Number(money_slide.max);
    let moneyMin = Number(money_slide.min);
    let yearMax = Number(year_slide.max);
    let yearMin = Number(year_slide.min);

    if (isNaN(money) || isNaN(years)) {
        return "";
    }

    if (money > moneyMax || money < moneyMin) {
        return "";
    }

    if (years > yearMax || years < yearMin) {
        return "";
    }

    let monthlyCost = money * ((0.1656 / 12) / (1 - Math.pow((1 / (1 + (0.1656 / 12))), years * 12)));
    monthlyCost = monthlyCost.toFixed(2);

    data = `${monthlyCost}`;
    interest.value = data;

    return monthlyCost + " €";
}



function moneySlideHandler(e) {
    money_field.value = numeral(e.target.value).format('00,000.00 €')

    doCalc();
}

function yearSlideHandler(e) {
    year_field.value = e.target.value;

    doCalc();
}
let testt;
function moneyInputHandler(e) {
    let val = e.target.value;
    testt = val
    if (val) {
        if (!isNaN(val)) {
            val = Number(val);
            val = Math.ceil(val/100)*100;
            money_slide.value = val;
            money_slide.style.setProperty('--value', String(val));
            doCalc();
        }
    }
}

function yearInputHandler(e) {
    let val = e.target.value;

    if (val) {
        if (!isNaN(val)) {
            val = Number(val);
            val = Math.ceil(val);
            year_slide.value = val;
            year_slide.style.setProperty('--value', String(val));
            doCalc();
        }
    }
}

function doCalc(){
    let moneyVal = money_slide.value;
    let yearVal = year_slide.value;
    // test = new AutoNumeric(money_field)

    mes_sum.innerHTML = calcMonthlyCost(moneyVal, yearVal);
}

money_field.addEventListener('focusout', (e) => {
    money_field.value = numeral(e.target.value).format('00,000.00 €')
})

money_field.addEventListener('input', moneyInputHandler);
year_field.addEventListener('input', yearInputHandler);

money_slide.addEventListener('input', moneySlideHandler);
year_slide.addEventListener('input', yearSlideHandler);