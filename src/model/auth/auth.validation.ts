import { z } from "zod";


const loginUserSchemaValidation = z.object({
    body : z.object({
        email : z.string().email("Invalid email formate"),
        password: z.string().min(6, "Password must be at least 6 characters")
    })
})

export const authValidation = {
    loginUserSchemaValidation
}