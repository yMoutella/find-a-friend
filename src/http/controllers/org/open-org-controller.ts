import makeFindOrgUseCase from '@/usecases/factories/make-open-org-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export default async function openOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const openOrgSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = openOrgSchema.parse(request.params)

  if (!id) {
    return reply.status(400).send({ error: 'Invalid organization ID' })
  }

  const useCase = makeFindOrgUseCase()
  const org = await useCase.execute({ id })

  if (!org) {
    return reply.status(404).send({ error: 'Organization not found' })
  }

  return reply.status(200).send(org)
}
