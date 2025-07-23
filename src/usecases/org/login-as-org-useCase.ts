import OrgRepository from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import InvalidCredentialsError from '../errors/invalid-credentials-error'
import ResourceNotFoundError from '../errors/resource-not-found-error'

interface LoginAsOrgUseCaseRequest {
  email: string
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
    const { email, password } = data

    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const isPasswordValid = await compare(password, org.password)

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
