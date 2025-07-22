import OrgRepository from '@/repositories/org-repository'
import { Org } from '@prisma/client'

interface FindNearbyOrgUseCaseRequest {
  latitude: number
  longitude: number
}

interface FindNearbyOrgUseCaseResponse {
  orgs: Org[]
}

export default class FindNearbyOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(
    data: FindNearbyOrgUseCaseRequest
  ): Promise<FindNearbyOrgUseCaseResponse> {
    const { latitude, longitude } = data

    const orgs = await this.orgRepository.findNearbyOrgs({
      latitude,
      longitude,
    })

    return {
      orgs,
    }
  }
}
