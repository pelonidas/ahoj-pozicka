module.exports.checkData = (formData) => {
    if (formData.contact.job === "employee"){
        formData.contact.job = "Zamestnanec"
    }
    if (formData.contact.job === "state-employee"){
        formData.contact.job = "Štátny zamestnanec"
    }
    if (formData.contact.job === "foreign-employee"){
        formData.contact.job = "Zamestnanec v zahraničí"
    }
    if (formData.contact.job === "self-employed"){
        formData.contact.job = "Živnostník / S.R.O."
    }
    if (formData.contact.job === "without-ico"){
        formData.contact.job = "Živnostník bez IČO"
    }
    if (formData.contact.job === "tender-self"){
        formData.contact.job = "Opatrovateľ/ka - živnostník - v členskej krajine EÚ"
    }
    if (formData.contact.job === "tender"){
        formData.contact.job = "Opatrovateľka"
    }
    if (formData.contact.job === "senior"){
        formData.contact.job = "Starobný dôchodca"
    }
    if (formData.contact.job === "retired-senior"){
        formData.contact.job = "Výsluhový dôchodca"
    }
    if (formData.contact.job === "invalid-senior"){
        formData.contact.job = "Invalidný dôchodca"
    }
}

