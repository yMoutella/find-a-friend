import PrismaOrgRepository from '@/repositories/prisma-repositories/org-repository'
import FindOrgUseCase from '../org/find-org-useCase'

export default function makeFindOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const findOrgUseCase = new FindOrgUseCase(orgRepository)
  return findOrgUseCase
}
