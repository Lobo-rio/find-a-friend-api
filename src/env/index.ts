import 'dotenv/config'
import { z } from "zod"

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    JWT_SECRET: z.string().default('eu achoclear'),
    PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Environment variables may not be empty', _env.error.format())
    throw new Error('Environment variables may not be empty')
}

export const env = _env.data