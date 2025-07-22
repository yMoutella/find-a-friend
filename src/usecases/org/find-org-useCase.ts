import OrgRepository from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import ResourceNotFoundError from '../errors/resource-not-found-error'

interface FindOrgUseCaseRequest {
  id: string
}

interface FindOrgUseCaseResponse {
  org: Org
}

export default class FindOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    id,
  }: FindOrgUseCaseRequest): Promise<FindOrgUseCaseResponse> {
    const org = await this.orgRepository.findById(id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org,
    }
  }
}
