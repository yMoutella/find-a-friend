import { FastifyReply, FastifyRequest } from 'fastify'

export default async function verifyJwt(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send('Unauthorized')
  }
}
