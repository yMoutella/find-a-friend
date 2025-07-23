import PrismaOrgRepository from '@/repositories/prisma-repositories/org-repository'
import OpenOrgUseCase from '../org/open-org-useCase'

export default function makeOpenOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const findOrgUseCase = new OpenOrgUseCase(orgRepository)
  return findOrgUseCase
}
