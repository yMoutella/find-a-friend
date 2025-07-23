import PrismaOrgRepository from '@/repositories/prisma-repositories/org-repository'
import FindNearbyOrgUseCase from '../org/find-nearby-org-useCase'

export default function makeFindNearbyOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const findOrgUseCase = new FindNearbyOrgUseCase(orgRepository)
  return findOrgUseCase
}
