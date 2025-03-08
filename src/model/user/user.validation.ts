import { z } from "zod";


const createUserSchemaValidation = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        role: z.enum(["admin", "user"]).default("user"),
        isBlocked: z.boolean().default(false),
    })
})

export const usersValidation = {
    createUserSchemaValidation
}