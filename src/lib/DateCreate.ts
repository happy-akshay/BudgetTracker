import { Currencies } from "./Currencies"


export function DateCreate(date:Date){
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        )
    )
}

export function GetFromatterForCurrency(currency:string){

    const locale=Currencies.find((c)=>c.value===currency)?.locale
    return new Intl.NumberFormat(locale,{
        style:"currency",
        currency
    })
}