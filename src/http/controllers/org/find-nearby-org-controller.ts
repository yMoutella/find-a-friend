import makeFindNearbyOrgUseCase from '@/usecases/factories/make-find-nearby-org-useCase'
import makeOpenOrgUseCase from '@/usecases/factories/make-open-org-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export default async function findNearbyOrgsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const findOrgSchema = z.object({
    latitude: z
      .number()
      .min(-90)
      .max(90, 'Latitude must be between -90 and 90'),
    longitude: z
      .number()
      .min(-180)
      .max(180, 'Longitude must be between -180 and 180'),
  })

  const { latitude, longitude } = findOrgSchema.parse(request.body)

  const useCase = makeFindNearbyOrgUseCase()
  const org = await useCase.execute({ latitude, longitude })

  return reply.status(200).send(org)
}
