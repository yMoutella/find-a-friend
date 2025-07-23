import PrismaOrgRepository from '@/repositories/prisma-repositories/org-repository'
import LoginAsOrgUseCase from '../org/login-as-org-useCase'

export default function makeLoginAsOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const findOrgUseCase = new LoginAsOrgUseCase(orgRepository)
  return findOrgUseCase
}
