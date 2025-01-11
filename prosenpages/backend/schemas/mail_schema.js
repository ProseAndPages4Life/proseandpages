import { z } from 'zod';

export const mailSchema = z.object({

    Email: z.string({
        required_error: "Se requiere un email!"
    }).email({
        message: "Email inválido"
    })

})