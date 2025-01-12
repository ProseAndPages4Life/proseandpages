import { z } from 'zod';

export const regisSchema = z.object({

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

    Email: z.string({
        required_error: "Se requiere un email!"
    }).email({
        message: "Email inválido"
    }),

    Contraseña: z.string({
        required_error: "Se requiere una constraseña!"
    }).min(8, { message: "Contraseña: Deben ser minimo 8 caracteres!" }).
        max(25, { message: "Contraseña: Deben ser menos de 25 caracteres!" }),



}).superRefine(({ Contraseña, Nacim }, checkPassComplexity) => {
    console.log("Mostrando Contraseña:" + Contraseña);
    const containsUppercase = (ch) => /[A-Z]/.test(ch);
    const containsLowercase = (ch) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

    let countOfUpperCase = 0,
        countOfLowerCase = 0,
        countOfNumbers = 0,
        countOfSpecialChar = 0;
    for (let i = 0; i < Contraseña.length; i++) {
        let ch = Contraseña.charAt(i);
        if (!isNaN(+ch)) {
            console.log("Contando números:" + countOfNumbers);
            countOfNumbers++;
        }
        else if (containsUppercase(ch)) {
            console.log("Contando mayusculas" + countOfUpperCase);
            countOfUpperCase++;
        }
        else if (containsLowercase(ch)) {
            console.log("Contando minusculas" + countOfLowerCase);
            countOfLowerCase++;
        }
        else if (containsSpecialChar(ch)) {
            console.log("Contando caracteres" + countOfSpecialChar);
            countOfSpecialChar++;
        }
    }
    if (
        countOfLowerCase < 1 ||
        countOfUpperCase < 2 ||
        countOfSpecialChar < 2 ||
        countOfNumbers < 2
    ) {
        checkPassComplexity.addIssue({
            code: 420,
            message: "Contraseña no cumple los parámetros requeridos! 2 mayusculas, 2 caracteres especiales, 2 numeros",
            Parametros: "2 mayusculas, 2 caracteres especiales, 2 numeros",
            countOfNumbers,
            countOfUpperCase,
            countOfLowerCase,
            countOfSpecialChar
        });
    }


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
            message: "No es una fecha correcta!",
            Parametros: "2 mayusculas, 2 caracteres especiales, 2 numeros",
            countOfNumbers,
            countOfUpperCase,
            countOfLowerCase,
            countOfSpecialChar
        });
    }
});