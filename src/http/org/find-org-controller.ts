import makeFindOrgUseCase from '@/usecases/factories/make-find-org-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export default async function findOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const findOrgSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = findOrgSchema.parse(request.params)

  if (!id) {
    return reply.status(400).send({ error: 'Invalid organization ID' })
  }

  const useCase = makeFindOrgUseCase()
  const org = await useCase.execute({id})

  if (!org) {
    return reply.status(404).send({ error: 'Organization not found' })
  }

  return reply.status(200).send({ org })
}
