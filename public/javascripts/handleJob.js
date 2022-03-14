module.exports.checkData = (formData) => {
    if (formData.job === "employee"){
        formData.job = "Zamestnanec"
    }
    if (formData.job === "state-employee"){
        formData.job = "Štátny zamestnanec"
    }
    if (formData.job === "foreign-employee"){
        formData.job = "Zamestnanec v zahraničí"
    }
    if (formData.job === "self-employed"){
        formData.job = "Živnostník / S.R.O."
    }
    if (formData.job === "without-ico"){
        formData.job = "Živnostník bez IČO"
    }
    if (formData.job === "tender-self"){
        formData.job = "Opatrovateľ/ka - živnostník - v členskej krajine EÚ"
    }
    if (formData.job === "tender"){
        formData.job = "Opatrovateľka"
    }
    if (formData.job === "senior"){
        formData.job = "Starobný dôchodca"
    }
    if (formData.job === "retired-senior"){
        formData.job = "Výsluhový dôchodca"
    }
    if (formData.job === "invalid-senior"){
        formData.job = "Invalidný dôchodca"
    }
}

