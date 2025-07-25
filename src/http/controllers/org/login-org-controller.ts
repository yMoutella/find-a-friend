import makeLoginAsOrgUseCase from '@/usecases/factories/make-login-as-org-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export default async function loginOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const loginOrgSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = loginOrgSchema.parse(request.body)

  const useCase = makeLoginAsOrgUseCase()
  const { org } = await useCase.execute({
    email,
    password,
  })

  if (!org) {
    return reply.status(401).send({ error: 'Invalid credentials' })
  }

  const token = await reply.jwtSign(
    {
      sub: org.id,
      email: org.email,
      role: 'ADMIN',
    },
    {}
  )

  const refreshToken = await reply.jwtSign(
    {
      sub: org.id,
      email: org.email,
      role: 'ADMIN',
    },
    {
      expiresIn: '7d',
    }
  )

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
    .send({
      token: token,
    })
}
