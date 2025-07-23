import makeRegisterOrgUseCase from '@/usecases/factories/make-register-org-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export default async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrgSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    author_name: z.string().min(1, 'Author name is required'),
    email: z.string().email('Invalid email format'),
    whatsapp: z.string('Invalid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    cep: z.string(),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'State must be exactly 2 characters'),
    neighborhood: z.string().min(1, 'Neighborhood is required'),
    street: z.string().min(1, 'Street is required'),

    latitude: z
      .number()
      .min(-90)
      .max(90, 'Latitude must be between -90 and 90'),
    longitude: z
      .number()
      .min(-180)
      .max(180, 'Longitude must be between -180 and 180'),
  })

  const data = createOrgSchema.parse(request.body)

  const useCase = makeRegisterOrgUseCase()
  const org = await useCase.execute(data)

  return reply.status(201).send(org)
}
