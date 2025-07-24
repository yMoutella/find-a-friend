import fastify from 'fastify'
import orgRoutes from './http/controllers/org/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: true, // More secure option
  },
  sign: {
    expiresIn: '7d',
  },
})

app.register(orgRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({ error: 'Validation Error', issues: error.issues })
  }
  reply.status(500).send({ error: 'Internal Server Error' })
})
