import * as z from "zod"

export const signinSchema = z.object({
    email: z.string({ required_error: "Campo E-mail obrigatório" }).email("E-mail inválido"),
    password: z
        .string({ required_error: "Campo Senha obrigatório" })
        .min(8, "Senha deve ter no mínimo 8 caracteres"),
})

export type SigninSchema = z.output<typeof signinSchema>
