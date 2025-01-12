import { z } from 'zod';

export const passSchema = z.object({
Contraseña: z.string({
        required_error: "Se requiere una constraseña!"
    }).
        min(8, { message: "Contraseña: Deben ser minimo 8 caracter!" }).
        max(25, { message: "Contraseña: Deben ser menos de 25 caracteres!" }),
}).superRefine(({ Contraseña }, checkPassComplexity) => {
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
    console.log("Contraseña con parametros correctos!")
});