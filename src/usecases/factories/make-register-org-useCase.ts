import PrismaOrgRepository from '@/repositories/prisma-repositories/org-repository'
import RegisterOrgUseCase from '../org/register-org-usecase'

export default function makeRegisterOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(orgRepository)
  return registerOrgUseCase
}
