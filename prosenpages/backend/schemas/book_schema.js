import { z } from 'zod';

/*
const Formato = ["Físico", "Digital"];
const Categoria = ['Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'];
const Encudernacion = ["Tapa blanda", "Tapa Dura", "No Aplica"];
*/
export const bookSchema = z.object({


    Titulo: z.string({
        required_error: "Se requiere un titulo!"
    }).
        min(5, { message: "Titulo: Deben ser minimo 5 caracteres!" }).
        max(50, { message: "Titulo: Deben ser menos de 25 caracteres!" }),

    Autor: z.string({
        required_error: "Se requiere un autor!"
    }).
        min(5, { message: "Autor: Deben ser minimo 5 caracteres!" }).
        max(50, { message: "Autor: Deben ser menos de 25 caracteres!" }),

    Formato: z.string({
        required_error: "Se requiere un formato!"
    }).
        min(5, { message: "Formato: Deben ser minimo 5 caracteres!" }).
        max(7, { message: "Formato: Deben ser menos de 7 caracteres!" })/*.
    includes("Físico",{code: "",
        message: "Debe ser Físico o Digital"}).
    includes("Digital",{code: "",
        message: "Debe ser Físico o Digital"})*/,


    Editorial: z.string({
        required_error: "Se requiere una editorial!"
    }).
        min(5, { message: "Editorial: Deben ser minimo 5 caracteres!" }).
        max(15, { message: "Editorial: Deben ser menos de 15 caracteres!" }),

    Año: z.string({
        required_error: "Se requiere un año!"
    }).length(4, { message: "año: Deben ser de 4 caracteres!" }),

    Idioma: z.string({
        required_error: "Se requiere un idioma!"
    }).
        min(3, { message: "idioma: Deben ser minimo 3 caracteres!" }).
        max(12, { message: "idioma: Deben ser menos de 12 caracteres!" }),

    NumPag: z.string({
        required_error: "Se requiere num de paginas!"
    }).
        min(2, {
            message: "num de paginas: Deben ser minimo 2 caracteres!"
        }).
        max(5, { message: "num de paginas: Deben ser menos de 5 caracteres!" }),

    Encudernacion: z.string({
        required_error: "Se requiere una encuadernacion!"
    }).
        min(3, { message: "encuadernacion: Deben ser minimo 3 caracteres!" }).
        max(12, { message: "encuadernacion: Deben ser menos de 12 caracteres!" })/*.
        refine((recib) => !Encudernacion.includes(recib), {
            message: "Debe ser: 'Tapa blanda', 'Tapa Dura', 'No Aplica'",
        })*/,

    /*.
includes("Tapa blanda",{code: "",
    message: "'Tapa blanda', 'Tapa Dura', 'No Aplica'"}).
includes("Tapa Dura",{code: "",
    message: "'Tapa blanda', 'Tapa Dura', 'No Aplica'"}).
includes("No Aplica",{code: "",
    message: "'Tapa blanda', 'Tapa Dura', 'No Aplica'"})*/

    ISBN: z.string({
        required_error: "Se requiere un isbn!"
    }).
        min(13, { message: "isbn: Deben ser minimo 13 caracteres!" }).
        max(13, { message: "isbn: Deben ser menos de 13 caracteres!" }),

    Categoria: z.string({
        required_error: "Se requiere una categoria!"
    }).max(13, { message: "categoria: Deben ser menos de 13 caracteres!" })/*.
    includes("Fantasía",{code: "",
        message: "'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'"}).
    includes("Ciencia Ficción",{code: "",
        message: "'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'"}).
    includes("Romance",{code: "",
        message: "'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'"}).
    includes("Suspenso",{code: "",
        message: "'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'"}).
    includes("Poesía",{code: "",
        message: "'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'"}).
    includes("Infantiles",{code: "",
        message: "'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'"})*/,

    Precio: z.string({
        required_error: "Se requiere un precio!"
    }).
        min(2, { message: "precio: Deben ser minimo 2 caracteres!" }).
        max(5, { message: "precio: Deben ser menos de 5 caracteres!" }),

    Stock: z.string({
        required_error: "Se requiere un stock!"
    }).
        min(1, { message: "stock: Deben ser minimo 1 caracteres!" }).
        max(6, { message: "stock: Deben ser menos de 6 caracteres!" })

}).
/*superRefine(({ Encudernacion }, checaEncudernacion) => {
    console.log("Mostrando Encudernacion:" + Encudernacion);
    //const Encudernacion = ["Tapa blanda", "Tapa Dura", "No Aplica"];
    const contieneBlanda = (ch) => /^Tapa blanda$/.test(ch);
    const contieneDura = (ch) => /^Tapa dura$/.test(ch);
    const contieneNoAplica = (ch) => /^No aplica$/.test(ch);
    let countOfBlanda = 0,
        countOfDura = 0,
        countOfNoAplica = 0;
    
    let ch = Encudernacion;
    if (contieneBlanda(ch)) {
        console.log("Contando blanda:");
        countOfBlanda++;
        console.log(countOfBlanda);
    }
    else if (contieneDura(ch)) {
        console.log("Contando dura:");
        countOfDura++;
        console.log(countOfDura);
    }
    else if (contieneNoAplica(ch)) {
        console.log("Contando no aplica:");
        countOfNoAplica++;
        console.log(countOfNoAplica);
    }
    //}
    if (
        countOfBlanda == 1 ||
        countOfDura == 1 ||
        countOfNoAplica == 1
    ) {
        console.log("Encudernacion con parametros correctos!");

    }
    else {
        checaEncudernacion.addIssue({
            code: 420,
            message: "Debe ser: 'Tapa blanda', 'Tapa dura', 'No aplica'",
            Parametros: "2 mayusculas, 2 caracteres especiales, 2 numeros",
            countOfBlanda,
            countOfDura,
            countOfNoAplica
        });
    }
}). */
/*
superRefine(({ Categoria }, checaCategoria) => {
    console.log("Mostrando Categoria:" + Categoria);
    //const Categoria = ["Tapa blanda", "Tapa Dura", "No Aplica"];
    const contieneFant = (ch) => /^Fantasía$/.test(ch);
    const contieneCienF = (ch) => /^Ciencia Ficción$/.test(ch);
    const contieneRom = (ch) => /^Romance$/.test(ch);
    const contieneSusp = (ch) => /^Suspenso$/.test(ch);
    const contienePoes = (ch) => /^Poesía$/.test(ch);
    const contieneInfa = (ch) => /^Infantiles$/.test(ch);
    let countOfFant = 0,
        countOfCienF = 0,
        countOfRom = 0,
        countOfSusp = 0,
        countOfPoes = 0,
        countOfInfa = 0;
    
    //includes("Fantasía",{code: "", message: "'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'"}).
    let ch = Categoria;
    if (contieneFant(ch)) {
        console.log("Contando Fant:");
        countOfFant++;
        console.log(countOfFant);
    }
    else if (contieneCienF(ch)) {
        console.log("Contando CienF:");
        countOfCienF++;
        console.log(countOfCienF);
    }
    else if (contieneRom(ch)) {
        console.log("Contando Rom:");
        countOfRom++;
        console.log(countOfRom);
    }

    else if (contieneSusp(ch)) {
        console.log("Contando Susp:");
        countOfSusp++;
        console.log(countOfSusp);
    }
    else if (contienePoes(ch)) {
        console.log("Contando Poes:");
        countOfPoes++;
        console.log(countOfPoes);
    }
    else if (contieneInfa(ch)) {
        console.log("Contando Infa:");
        countOfInfa++;
        console.log(countOfInfa);
    }
    //}
    if (
        countOfFant == 1 ||
        countOfCienF == 1 ||
        countOfRom == 1 ||
        countOfSusp == 1 ||
        countOfPoes == 1 ||
        countOfInfa == 1
    ) {
        console.log("Categoria con parametros correctos!");

    }
    else {
        checaCategoria.addIssue({
            code: 420,
            message: "Debe ser'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'",
            countOfFant,
            countOfCienF,
            countOfRom,
            countOfSusp,
            countOfPoes,
            countOfInfa
        });
    }
})
*/
superRefine(({Formato, Encudernacion, Categoria }, checaBookForm) => {
    console.log("Mostrando Formato"+ Formato)
    console.log("Mostrando Encudernacion:" + Encudernacion);
    console.log("Mostrando Categoria:" + Categoria);
    
    const contieneDigital = (c) => /^Digital$/.test(c);
    const contieneFisico = (c) => /^Físico$/.test(c);
    let countOfDigital = 0,
        countOfFisico = 0;

    const contieneBlanda = (ch) => /^Tapa blanda$/.test(ch);
    const contieneDura = (ch) => /^Tapa dura$/.test(ch);
    const contieneNoAplica = (ch) => /^No aplica$/.test(ch);
    let countOfBlanda = 0,
        countOfDura = 0,
        countOfNoAplica = 0;

    const contieneFant = (ch1) => /^Fantasía$/.test(ch1);
    const contieneCienF = (ch1) => /^Ciencia Ficción$/.test(ch1);
    const contieneRom = (ch1) => /^Romance$/.test(ch1);
    const contieneSusp = (ch1) => /^Suspenso$/.test(ch1);
    const contienePoes = (ch1) => /^Poesía$/.test(ch1);
    const contieneInfa = (ch1) => /^Infantiles$/.test(ch1);
    let countOfFant = 0,
        countOfCienF = 0,
        countOfRom = 0,
        countOfSusp = 0,
        countOfPoes = 0,
        countOfInfa = 0;

    let c= Formato;
    let ch = Encudernacion;
    let ch1 = Categoria;

    //Formato
    if (contieneDigital(c)) {
        console.log("Contando digital:");
        countOfDigital++;
        console.log(countOfDigital);
    }
    else if (contieneFisico(c)) {
        console.log("Contando fisico:");
        countOfFisico++;
        console.log(countOfFisico);
    }
    if (
        countOfDigital == 1 ||
        countOfFisico == 1
    ) {
        console.log("Formato con parametros correctos!");
    }
    else {
        console.log("No contiene fomato permitido")
        checaBookForm.addIssue({
            code: 420,
            message: "Debe ser: 'Digital', 'Fisico'",
            countOfBlanda,
            countOfDura,
            countOfNoAplica
        });
    }

    //Encuad
    if (contieneBlanda(ch)) {
        console.log("Contando blanda:");
        countOfBlanda++;
        console.log(countOfBlanda);
    }
    else if (contieneDura(ch)) {
        console.log("Contando dura:");
        countOfDura++;
        console.log(countOfDura);
    }
    else if (contieneNoAplica(ch)) {
        console.log("Contando no aplica:");
        countOfNoAplica++;
        console.log(countOfNoAplica);
    }
    //}
    if (
        countOfBlanda == 1 ||
        countOfDura == 1 ||
        countOfNoAplica == 1
    ) {
        console.log("Encudernacion con parametros correctos!");
    }
    else {
        console.log("No contiene encuad permitida")
        checaBookForm.addIssue({
            code: 420,
            message: "Debe ser: 'Tapa blanda', 'Tapa dura', 'No aplica'",
            Parametros: "2 mayusculas, 2 caracteres especiales, 2 numeros",
            countOfBlanda,
            countOfDura,
            countOfNoAplica
        });
    }

    //Categor
    if (contieneFant(ch1)) {
        console.log("Contando Fant:");
        countOfFant++;
        console.log(countOfFant);
    }
    else if (contieneCienF(ch1)) {
        console.log("Contando CienF:");
        countOfCienF++;
        console.log(countOfCienF);
    }
    else if (contieneRom(ch1)) {
        console.log("Contando Rom:");
        countOfRom++;
        console.log(countOfRom);
    }

    else if (contieneSusp(ch1)) {
        console.log("Contando Susp:");
        countOfSusp++;
        console.log(countOfSusp);
    }
    else if (contienePoes(ch1)) {
        console.log("Contando Poes:");
        countOfPoes++;
        console.log(countOfPoes);
    }
    else if (contieneInfa(ch1)) {
        console.log("Contando Infa:");
        countOfInfa++;
        console.log(countOfInfa);
    }
    
    if (
        countOfFant == 1 ||
        countOfCienF == 1 ||
        countOfRom == 1 ||
        countOfSusp == 1 ||
        countOfPoes == 1 ||
        countOfInfa == 1
    ) {
        console.log("Categoria con parametros correctos!");
    }
    else {
        console.log("No contiene incluye categoria permitida!")
        checaBookForm.addIssue({
            code: 420,
            message: "Debe ser'Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'",
            countOfFant,
            countOfCienF,
            countOfRom,
            countOfSusp,
            countOfPoes,
            countOfInfa
        });
    }
})

;