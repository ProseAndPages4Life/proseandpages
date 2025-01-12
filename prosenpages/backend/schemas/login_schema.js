import { z } from 'zod';

export const loginSchema = z.object({
    Email: z.string({
        required_error: "Se requiere un email!"
    }).email({
        message: "Email inválido"
    }),

    Contraseña: z.string({
        required_error: "Se requiere una constraseña!"
    }).
        //min(1, { message: "Deben ser minimo 1 caracter!" }).
        max(25, { message: "Contraseña: Deben ser menos de 25 caracteres!" }),
})