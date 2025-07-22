import OrgRepository from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import InvalidCredentialsError from '../errors/invalid-credentials-error'

interface LoginAsOrgUseCaseRequest {
  id: string
  password: string
}

interface LoginAsOrgUseCaseResponse {
  org: Org
}

export default class LoginAsOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(
    data: LoginAsOrgUseCaseRequest
  ): Promise<LoginAsOrgUseCaseResponse> {
    const { id, password } = data

    const org = await this.orgRepository.findById(id)

    if (!org) {
      throw new Error('Organization not found')
    }

    const isPasswordValid = await compare(password, org.password)

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
