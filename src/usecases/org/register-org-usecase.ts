import { hash } from 'node:crypto'
import OrgRepository from '../../repositories/org-repository'
import { Org } from '@prisma/client'
import { hashSync } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string

  cep: string
  state: string
  city: string
  neighborhood: string
  street: string

  latitude: number
  longitude: number
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export default class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(
    data: RegisterOrgUseCaseRequest
  ): Promise<RegisterOrgUseCaseResponse> {
    const hashPassword = hashSync(data.password, 6)
    const org = await this.orgRepository.create({
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      whatsapp: data.whatsapp,
      password: hashPassword,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: data.latitude,
      longitude: data.longitude,
    })

    if (!org) {
      throw new Error('Organization could not be created')
    }

    return { org }
  }
}
