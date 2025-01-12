

import { z } from 'zod';

export const cardSchema = z.object({
    Nombre: z.string({
        required_error: "Se requiere un nombre!"
    }).
        min(8, { message: "Nombre: Deben ser minimo 8 caracter!" }).
        max(60, { message: "Nombre: Deben ser menos de 25 caracteres!" }),

    Tarjeta: z.string({
        required_error: "Se requiere una tarjeta!"
    }).
        min(13, { message: "Tarjeta: Deben ser minimo 13 caracter!" }).
        max(16, { message: "Tarjeta: Deben ser menos de 16 caracteres!" }),

    Vencimiento: z.string({
        required_error: "Se requiere una fecha de vencimiento!"
    }).
        length(5, { message: "Vencimiento: Deben ser 5 caracteres! Formato MM-YY" }),

    CVV: z.string({
        required_error: "Se requiere un cvv!"
    }).
        length(3, { message: "CVV: Deben ser 3 numeros!" })

}).
    superRefine(({ Tarjeta, Vencimiento }, checaTarjeta) => {
        console.log("Mostrando Tarjeta: " + Tarjeta);
        console.log("Mostrando Vencimiento: " + Vencimiento);

        //Fecha
        let fec = Vencimiento;
        const contieneFecha = (fec) => /^(0[1-9]|[1][0-2])-(2[5-9]|[3][0-9]|40)$/.test(fec);
        const contiene40omas = (fec) => /^(4[0-9])$/.test(fec);
        if (contieneFecha(fec)) {
            if (contiene40omas(fec)) {
                console.log("Es 40 o mas! Hora de cambiar el regex.");//Si regresas a cambiar esto ya estas viejito xd 08/enero/2025
            }
            console.log("Se ingreso un Vencimiento correcta!");
        }
        else {
            console.log("Ingresa una Vencimiento correcto o en el rango correcto! MM-YY");
            checaTarjeta.addIssue({
                code: 420,
                message: "Debe ser: MM-YY o mayor a 2024"
            });
        }
        //tARJETAS
        const contieneAmex = (cd) => /^3[47][0-9]{13}$/.test(cd);
        const contieneMastercard = (cd) => /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(cd);
        const contieneVisaCard = (cd) => /^4[0-9]{12}(?:[0-9]{3})?$/.test(cd);
        const contieneVisaMasterCard = (cd) => /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(cd);
        let AmexCard = 0;
        let Mastercard = 0;
        let VisaCard = 0;
        let VisaMasterCard = 0;
        let cd = Tarjeta;
        if (contieneAmex(cd)) {
            console.log("Contando AmexCard:");
            AmexCard++;
            console.log(AmexCard);
        }
        else if (contieneMastercard(cd)) {
            console.log("Contando Mastercard:");
            Mastercard++;
            console.log(Mastercard);
        }
        else if (contieneVisaCard(cd)) {
            console.log("Contando VisaCard:");
            VisaCard++;
            console.log(VisaCard);
        }
        else if (contieneVisaMasterCard(cd)) {
            console.log("Contando VisaMasterCard:");
            VisaMasterCard++;
            console.log(VisaMasterCard);
        }

        if (
            AmexCard == 1 ||
            Mastercard == 1 ||
            VisaCard == 1 ||
            VisaMasterCard == 1
        ) {
            console.log("Se ingreso una tarjeta correcta!");
        }
        else {
            console.log("Ingresa una tarjeta correcta! AmexCard, Mastercard, VisaCard, VisaMasterCard");
            checaTarjeta.addIssue({
                code: 420,
                message: "Debe ser: AmexCard, Mastercard, VisaCard, VisaMasterCard",
                AmexCard,
                Mastercard,
                VisaCard,
                VisaMasterCard
            });
        }
    });

/*

const contieneVence = (ch) => /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|[1][0-2])$/.test(ch)

const contieneAmex = (cd) => /^3[47][0-9]{13}$/.test(cd)
const contieneBCGlobal = (cd) => /^(6541|6556)[0-9]{12}$/.test(cd)
const contieneCarteBlancheCard = (cd) => /^389[0-9]{11}$/.test(cd)
const contieneDinersClubCard = (cd) => /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cd)
const contieneDiscoverCard = (cd) => /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/.test(cd)
const contieneInstaPaymentCard = (cd) => /^63[7-9][0-9]{13}$/.test(cd)
const contieneJCBCard = (cd) => /^(?:2131|1800|35\d{3})\d{11}$/.test(cd)
const contieneKoreanLocalCard = (cd) => /^9[0-9]{15}$/.test(cd)
const contieneLaserCard = (cd) => /^(6304|6706|6709|6771)[0-9]{12,15}$/.test(cd)
const contieneMaestroCard = (cd) => /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/.test(cd)
const contieneMastercard = (cd) => /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(cd)
const contieneSoloCard = (cd) => /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/.test(cd)
const contieneSwitchCard = (cd) => /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/.test(cd)
const contieneUnionPayCard = (cd) => /^(62[0-9]{14,17})$/.test(cd)
const contieneVisaCard = (cd) => /^4[0-9]{12}(?:[0-9]{3})?$/.test(cd)
const contieneVisaMasterCard = (cd) => /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(cd)

 
let BCGlobal = 0;
let CarteBlancheCard = 0;
let DinersClubCard = 0;
let DiscoverCard = 0;
let InstaPaymentCard = 0;
let JCBCard = 0;
let KoreanLocalCard = 0;
let LaserCard = 0;
let MaestroCard = 0;
let SoloCard = 0;
let SwitchCard = 0;
let UnionPayCard = 0;
let AmexCard = 0;
let Mastercard = 0;
let VisaCard = 0;
let VisaMasterCard = 0;

    const contieneAmex = (cd) => /^3[47][0-9]{13}$/.test(cd)
    const contieneMastercard = (cd) => /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(cd)
    const contieneVisaCard = (cd) => /^4[0-9]{12}(?:[0-9]{3})?$/.test(cd)
    const contieneVisaMasterCard = (cd) => /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(cd)
    
let AmexCard = 0;
let Mastercard = 0;
let VisaCard = 0;
let VisaMasterCard = 0;



if (contieneAmex(cd)) {
        console.log("Contando AmexCard:");
        AmexCard++;
        console.log(AmexCard);
    }
    else if (contieneMastercard(cd)) {
        console.log("Contando Mastercard:");
        Mastercard++;
        console.log(Mastercard);
    }
    else if (contieneVisaCard(cd)) {
        console.log("Contando VisaCard:");
        VisaCard++;
        console.log(VisaCard);
    }
    
    else if (contieneVisaMasterCard(cd)) {
        console.log("Contando VisaMasterCard:");
        VisaMasterCard++;
        console.log(VisaMasterCard);
    }
    
    if (
        AmexCard == 1 ||
        Mastercard == 1 ||
        VisaCard == 1 ||
        VisaMasterCard == 1
    ) {
        console.log("Ingresa una tarjeta correcta! AmexCard, Mastercard, VisaCard, VisaMasterCard");
    }
    else {
        console.log("Ingresa una tarjeta correcta! AmexCard, Mastercard, VisaCard, VisaMasterCard");
        checaTarjeta.addIssue({
            code: 420,
            message: "Debe ser: AmexCard, Mastercard, VisaCard, VisaMasterCard",
            AmexCard,
Mastercard,
VisaCard,
VisaMasterCard
        });
    }
*/
