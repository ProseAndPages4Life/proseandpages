import { z } from 'zod';
/*
Id INT AUTO_INCREMENT PRIMARY KEY,
    Usuario_id TINYINT,-- Un usuario puede tener varias direcciones --id 2
    Calle VARCHAR(20) NOT NULL,
    Numero TINYINT NOT NULL,
    Colonia VARCHAR(30) NOT NULL,
    Estado VARCHAR(30) NOT NULL,
    CP INT NOT NULL,
    Refer VARCHAR(200)

    Calle, Numero, Colonia, Estado, CP, Refer
*/
export const addrSchema = z.object({


    Calle: z.string({
        required_error: "Se requiere un Calle!"
    }).
        min(3, { message: "Calle: Deben ser minimo 3 caracteres!" }).
        max(20, { message: "Calle: Deben ser menos de 20 caracteres!" }),

    Numero: z.string({
        required_error: "Se requiere un Numero!"
    }).
        //min(1, { message: "Numero: Deben ser minimo 1 caracteres!" }).
        max(10, { message: "Numero: Deben ser menos de 15 caracteres!" }),

    Colonia: z.string({
        required_error: "Se requiere un Colonia!"
    }).
        min(3, { message: "Colonia: Deben ser minimo 3 caracteres!" }).
        max(10, { message: "Colonia: Deben ser menos de 10 caracteres!" }),

    Estado: z.string({
        required_error: "Se requiere una Estado!"
    }).
        min(3, { message: "Estado: Deben ser minimo 3 caracteres!" }).
        max(15, { message: "Estado: Deben ser menos de 15 caracteres!" }),

    CP: z.string({
        required_error: "Se requiere un CP!"
    }).length(5, { message: "CP: Deben ser de 4 caracteres!" }),

    Refer: z.string({
        required_error: "Se requiere un Refer!"
    }).
        min(3, { message: "Refer: Deben ser minimo 3 caracteres!" }).
        max(100, { message: "Refer: Deben ser menos de 100 caracteres!" })

})
/*
.
    superRefine(({ Colonia, Encudernacion, Categoria }, checaAddrForm) => {
        console.log("Mostrando Colonia" + Colonia);
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

        let c = Colonia;
        let ch = Encudernacion;
        let ch1 = Categoria;

        //Colonia
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
            console.log("Colonia con parametros correctos!");
        }
        else {
            console.log("No contiene fomato permitido");
            checaAddrForm.addIssue({
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
            console.log("No contiene encuad permitida");
            checaAddrForm.addIssue({
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
            console.log("No contiene incluye categoria permitida!");
            checaAddrForm.addIssue({
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
    ;