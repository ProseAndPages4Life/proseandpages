import { z } from 'zod';

export const userAdminNoLoginSchema = z.object({

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
    Contraseña: z.string({
        required_error: "Se requiere una constraseña!"
    }).min(8, { message: "Contraseña: Deben ser minimo 8 caracteres!" }).
        max(25, { message: "Contraseña: Deben ser menos de 25 caracteres!" }),
    */
    Tipo: z.string({
        required_error: "Se requiere un tipo!"
    }),

}).superRefine(({ Tipo, Nacim }, checkUser) => {

    console.log("Mostrando Tipo:" + Tipo);
    console.log("Mostrando Nacim:" + Nacim);
    const contieneCliente = (ch) => /^Cliente$/.test(ch);
    const contieneAdmin = (ch) => /^Administrador$/.test(ch);
    const contieneInven = (ch) => /^Inventario$/.test(ch);
    let countOfCliente = 0,
        countOfAdmin = 0,
        countOfInven = 0;

    let ch = Tipo;
    //Encuad
    if (contieneCliente(ch)) {
        console.log("Contando cliente:");
        countOfCliente++;
        console.log(countOfCliente);
    }
    else if (contieneAdmin(ch)) {
        console.log("Contando admin:");
        countOfAdmin++;
        console.log(countOfAdmin);
    }
    else if (contieneInven(ch)) {
        console.log("Contando inven:");
        countOfInven++;
        console.log(countOfInven);
    }
    //}
    if (
        countOfCliente == 1 ||
        countOfAdmin == 1 ||
        countOfInven == 1
    ) {
        console.log("Tipo con parametros correctos!");
    }
    else {
        console.log("No contiene tipo permitida");
        checkUser.addIssue({
            code: 420,
            message: "Debe ser: 'Cliente', 'Administrador', 'Inventario'",
            countOfCliente,
            countOfAdmin,
            countOfInven
        });
    }
    console.log("Mostrando Nacim:" + Nacim);

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
        console.log("Fecha correcta!");
    }
    else {
        checkPassComplexity.addIssue({
            code: 420,
            message: "No es una fecha correcta!"
        });
    }
});

export const userAdminSchema = z.object({

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

    Tipo: z.string({
        required_error: "Se requiere un tipo!"
    }),

}).superRefine(({ Contraseña, Tipo, Nacim }, checkUser) => {
    console.log("Mostrando Contraseña:" + Contraseña);
    console.log("Mostrando Tipo:" + Tipo);
    const containsUppercase = (ch) => /[A-Z]/.test(ch);
    const containsLowercase = (ch) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
        countOfLowerCase = 0,
        countOfNumbers = 0,
        countOfSpecialChar = 0;


    const contieneCliente = (ch) => /^Cliente$/.test(ch);
    const contieneAdmin = (ch) => /^Administrador$/.test(ch);
    const contieneInven = (ch) => /^Inventario$/.test(ch);
    let countOfCliente = 0,
        countOfAdmin = 0,
        countOfInven = 0;


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
        checkUser.addIssue({
            code: 420,
            message: "Contraseña no cumple los parámetros requeridos! 2 mayusculas, 2 caracteres especiales, 2 numeros",
            Parametros: "2 mayusculas, 2 caracteres especiales, 2 numeros",
            countOfNumbers,
            countOfUpperCase,
            countOfLowerCase,
            countOfSpecialChar
        });
    }
    console.log("Contraseña con parametros correctos!");

    let ch = Tipo;
    //Encuad
    if (contieneCliente(ch)) {
        console.log("Contando cliente:");
        countOfCliente++;
        console.log(countOfCliente);
    }
    else if (contieneAdmin(ch)) {
        console.log("Contando admin:");
        countOfAdmin++;
        console.log(countOfAdmin);
    }
    else if (contieneInven(ch)) {
        console.log("Contando inven:");
        countOfInven++;
        console.log(countOfInven);
    }
    //}
    if (
        countOfCliente == 1 ||
        countOfAdmin == 1 ||
        countOfInven == 1
    ) {
        console.log("Encudernacion con parametros correctos!");
    }
    else {
        console.log("No contiene encuad permitida");
        checkUser.addIssue({
            code: 420,
            message: "Debe ser: 'Cliente', 'Administrador', 'Inventario'",
            countOfCliente,
            countOfAdmin,
            countOfInven
        });
    }

    console.log("Mostrando Nacim:" + Nacim);

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
        console.log("Fecha correcta!");
    }
    else {
        checkPassComplexity.addIssue({
            code: 420,
            message: "No es una fecha correcta!"
        });
    }
});