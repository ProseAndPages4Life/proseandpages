import { z } from 'zod';

export const userSchema = z.object({

    Nombre: z.string({
        required_error: "Se requiere un nombre!"
    }).min(1, { message: "Nombre: Deben ser minimo 1 caracteres!" }).
        max(25, { message: "Nombre: Deben ser menos de 25 caracteres!" }),

    Apellido: z.string({
        required_error: "Se requiere un apellido!"
    }).min(1, { message: "Apellido: Deben ser minimo 1 caracteres!" }).
        max(25, { message: "Apellido: Deben ser menos de 25 caracteres!" }),

        Nacim: z.string({
            required_error: "Se requiere una fecha!"
        }),
/*
    Email: z.string({
        required_error: "Se requiere un email!"
    }).email({
        message: "Email inválido"
    }),
*/
}).superRefine(({ Nacim }, checkPassComplexity) => {
    console.log("Mostrando Nacim:"+Nacim)
   
    const contieneDiaMesAnio = (ch) => /(3[01]|[12][0-9]|0[1-9])(\/|-)(1[0-2]|0[1-9])(\/|-)(19|20)\d{2}/.test(ch);
    const contieneAnioMesDia = (ch) => /(19|20)\d{2}(\/|-)(1[0-2]|0[1-9])(\/|-)(3[01]|[12][0-9]|0[1-9])/.test(ch);
    const contieneMesDiaAnio = (ch) => /(1[0-2]|0[1-9])(\/|-)(3[01]|[12][0-9]|0[1-9])(\/|-)(19|20)\d{2}/.test(ch);

    let countOfDiaMesAnio = 0,
        countOfAnioMesDia = 0,
        countOfMesDiaAnio = 0;

    const date = Nacim;


    if (contieneDiaMesAnio(date)) {
        console.log("Contando DiaMesAnio:");
        countOfDiaMesAnio++;
        console.log(countOfDiaMesAnio);
    }
    else if (contieneAnioMesDia(date)) {
        console.log("Contando AnioMesDia:");
        countOfAnioMesDia++;
        console.log(countOfAnioMesDia);
    }
    else if (contieneMesDiaAnio(date)) {
        console.log("Contando MesDiaAnio:");
        countOfMesDiaAnio++;
        console.log(countOfMesDiaAnio);
    }
    if (
        countOfDiaMesAnio == 1 ||
        countOfAnioMesDia == 1 ||
        countOfMesDiaAnio == 1
    ) {
        console.log("Fecha correcta!")
    }
    else{
        checkPassComplexity.addIssue({
            code: 420,
            message: "No es una fecha correcta!"
        });
    }
});