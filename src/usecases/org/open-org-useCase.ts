import OrgRepository from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import ResourceNotFoundError from '../errors/resource-not-found-error'

interface OpenOrgUseCaseRequest {
  id: string
}

interface OpenOrgUseCaseResponse {
  org: Org
}

export default class OpenOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    id,
  }: OpenOrgUseCaseRequest): Promise<OpenOrgUseCaseResponse> {
    const org = await this.orgRepository.findById(id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org: {
        ...org,
        password: '',
      },
    }
  }
}
