import z from 'zod'

const _envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']),
  DATABASE_URL: z.string(),
  PORT: z.string().min(4).max(4),
  JWT_SECRET: z.string().min(10).max(100),
})

const _env = _envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
