//sliders
const money_range = document.getElementById("money_range");
const year_range = document.getElementById("year_range");

//text fields
const money_input = document.getElementById("money_input");
const year_input = document.getElementById("year_input");

//outputs
const mes_sum = document.getElementById("mes_sum");
const urok_sadzba = document.getElementById("urok_sadzba");
const celkove_naklady = document.getElementById("celkove_naklady");
const celkova_suma = document.getElementById("celkova_suma");

//limit element's value
const limit = function (value, isMoney) {

    //element.value = 10 000
    //element.min = 5 000
    //element.max = 50 000

    if (isMoney) {
        return Math.min(Math.max(value, money_range.min), money_range.max);
    }

    return Math.min(Math.max(value, year_range.min), year_range.max);
}

//calculate interest
const calculateInterest = function (total, years, ratePercent) {
    const interestRate = ((ratePercent / 100) + 1);
    return total * Math.pow(interestRate, years);
};

//observable values
let money_val = limit(money_range.value, true);
let year_val = limit(year_range.value, false);

//display default values
display();

//displays calculation
function display() {
    let ratePercent = 20.27;
    let roundToPlaces = 2;
    let calculatedInterest = calculateInterest(money_val, year_val, ratePercent);

    //https://sk.wikipedia.org/wiki/Zlo%C5%BEen%C3%A9_%C3%BAro%C4%8Denie
    mes_sum.innerHTML = (calculatedInterest / (year_val * 12)).toFixed(roundToPlaces) + "€";
    urok_sadzba.innerHTML = ratePercent + "%";
    celkove_naklady.innerHTML = (calculatedInterest - money_val).toFixed(roundToPlaces) + "€";
    celkova_suma.innerHTML = calculatedInterest.toFixed(roundToPlaces) + "€";
}

// Update the current slider value (each time you drag the slider handle)
money_range.oninput = function () {
    money_val = limit(this.value, true);
    display();
    money_input.value = money_val;
}

// Update the current slider value (each time you drag the slider handle)
year_range.oninput = function () {
    year_val = limit(this.value, false);
    display();
    year_input.value = year_val;
}

money_input.oninput = function () {
    //secure input isn't null
    if (this.value) {
        money_val = limit(this.value, true);
        display();
        money_range.value = money_val;
    }
}

year_input.oninput = function () {
    //secure input isn't null
    if (this.value) {
        year_val = limit(this.value, false);
        display();
        year_range.value = year_val;
    }
}

money_input.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        money_input.value = money_range.value;
    }
});

year_input.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        year_input.value = year_range.value;
    }
});

money_input.addEventListener("focusout", function () {
    money_input.value = money_range.value;
});

year_input.addEventListener("focusout", function () {
    year_input.value = year_range.value;
});


