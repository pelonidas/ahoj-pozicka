<div className="translate-y-[560px] md:translate-y-0 bottom-nav bottom-nav-fixed bottom-nav-container md:h-[45rem]">
    <div className="md:hidden buttonContainer">
        <div className="bg-transparent">
            <img src="/images/icons/mobile-up.svg" alt=""
                 className="w-full max-w-[59px] mx-auto cursor-pointer translate-y-[70%] bottom-nav-button">
        </div>
        <div className="flex flex-col h-[54px] rounded-t-[10px] bg-secondary">
            <div className="m-auto z-40">
                <span className="font-light leading-[17px] text-[1.125rem]">Tebou vyplnené údaje</span>
            </div>
        </div>
    </div>
    <div className="h-[560px] md:h-full bg-secondary">
        <div
            className=" w-full max-w-[80%] md:max-w-full mx-auto border-t md:border-0 border-white/20 flex flex-col justify-center ">
            <h2 className="form-heading1 ">Máš záujem o</h2>
            <div className="w-full md:max-w-[420px] md:mb-[2rem]">
                <span className="lg:text-[1.7rem] lg:block leading-[36px]">pôžičku na <span
                    className="text-primary"><
                    %= formData.calcData.money %> €</span></span>
                <span className="lg:text-[1.7rem] lg:block leading-[36px]">s dobou splácania <span
                    className="text-primary"><
                    %= formData.calcData.years %> roky</span></span>
                <span className="lg:text-[1.7rem] lg:block leading-[36px]">a mesačnou splátkou <span
                    className="text-primary"><
                    %= formData.calcData.interest %> €</span></span>
            </div>
            <h3 className="md:text-[2.5rem] mb-4">Osobné údaje</h3>
            <div className="md:text-[1.25rem] ">
                <div className="mb-2 flex items-center">
                    <i className="fa-solid fa-minus md:mr-3"></i>
                    <div>
                        Volám sa <span
                        className="text-primary"> <
                        %= formData.contact.fName %> <%= formData.contact.lName %></span>
                    </div>
                </div>
                <div className="mb-2 flex items-center">
                    <i className="fa-solid fa-minus md:mr-3"></i>
                    <div>
                        Moje rodné číslo je <span
                        className="text-primary"><
                        %= formData.contact.bNumber %></span>
                    </div>
                </div>
                <div className="mb-2 flex w-full md:max-w-[330px]">
                    <i className="fa-solid fa-minus md:pt-1 md:mr-3"></i>
                    <div className="md:leading-[31px]">
                        Číslo môjho občianskeho preukazu je <span
                        className="text-primary"><
                        %= formData.contact.id %></span>
                    </div>
                </div>
                <div className="flex md:leading-[31px] w-full md:max-w-[495px] md:mb-[2rem]">
                    <i className="fa-solid fa-minus md:mr-3 md:pt-1"></i>
                    <div>
                        Možno ma kontaktovať na čísle <span
                        className="text-primary"><
                        %= formData.contact.phoneNum %></span>, alebo emailom
                        <span
                            className="text-primary"><
                            %= formData.contact.email %> </span>
                    </div>
                </div>
                <h3 className="md:text-[2.5rem] mb-4 md:leading-[44px]">Finančné údaje</h3>
                <div className="flex md:mb-2">
                    <i className="fa-solid fa-minus md:mr-3 md:pt-1"></i>
                    <div className="md:text-[1.25rem] md:leading-[31px] w-full md:max-w-[315px]">
                        Som zamestnaný v <span
                        className="text-primary"><
                        %= formData.companyData.companyName %></span>
                        IČO: <span className="text-primary"><
                        %= formData.companyData.ico %></span>
                    </div>
                </div>
                <div className="flex md:mb-2">
                    <i className="fa-solid fa-minus md:mr-3 md:pt-1"></i>
                    <div className="md:text-[1.25rem] md:leading-[31px] w-full md:max-w-[340px]">
                        Zamestnaný som na <span
                        className="text-primary">dobu <%= formData.companyData.period %></span>
                        od <span className="text-primary"><
                        %= formData.companyData.from %></span>
                        do <span className="text-primary"><
                        %= formData.companyData.till %></span>
                    </div>
                </div>
                <div className="flex md:mb-2">
                    <i className="fa-solid fa-minus md:mr-3 md:pt-1"></i>
                    <div className="md:text-[1.25rem] md:leading-[31px] w-full md:max-w-[480px]">
                        Môj čistý mesačný príjem za 1.mesiac je <span
                        className="text-primary"><
                        %= formData.companyData.firstMonth %>€</span>,
                        za 2.mesiac je <span
                        className="text-primary"><
                        %= formData.companyData.secondMonth %>€</span>, za
                        3.mesiac je <span className="text-primary"><
                        %= formData.companyData.thirdMonth %>€</span>.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>