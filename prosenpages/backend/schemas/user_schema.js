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
    }).date({
        message: "No es fecha!"
    }),
/*
    Email: z.string({
        required_error: "Se requiere un email!"
    }).email({
        message: "Email inválido"
    }),
*/
});